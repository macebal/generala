import json
import random
from game.context_managers import redis_game_state
import redis
from urllib.parse import parse_qs
from channels.generic.websocket import AsyncWebsocketConsumer

r = redis.Redis(host="redis", port=6379, decode_responses=True)


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"game_{self.room_name}"
        self.redis_key = f"game-room:{self.room_name}"

        query_params = parse_qs(self.scope["query_string"].decode())
        player_id = query_params.get("player_id", [None])[0]

        if player_id is None:
            # Do not accept connections that don't contain player id
            self.close()

        self.player_id = player_id

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        await self.handle_player_joined()

    async def disconnect(self, close_code):
        # Leave room group
        await self.handle_player_left()
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        event = json.loads(text_data)

        handlers = {
            "chat.message": self.handle_chat_message,
            "dice.roll": self.handle_dice_roll,
            "player.play.score": self.handle_player_play_score,
            "game.status.change": self.handle_game_status_change,
        }

        try:
            handler = handlers[event.get("type")]
        except Exception as e:
            print(f"invalid type {event.get('type')}: {e}")
            return

        await handler(event)

    async def handle_chat_message(self, event):
        if (
            not event.get("content", {}).get("message")
            or len(event["content"]["message"]) == 0
        ):
            return
        await self.channel_layer.group_send(self.room_group_name, event)

    async def handle_dice_roll(self, event):
        print(f"Dice rolled by {self.player_id}")
        async with redis_game_state(r, self.redis_key_game_state) as state:
            if self.player_id != state.current_player_id:
                raise ValueError(f"It is not player {self.player_id}'s turn.")

            keepers = event.get("content", {}).get("keepers", [])
            state.roll_dies(keeper_indices=keepers)

            event = {"type": "game.status", "content": state.model_dump_json()}

            await self.channel_layer.group_send(self.room_group_name, event)

    async def handle_player_joined(self):
        async with redis_game_state(r, self.redis_key_game_state) as state:
            try:
                state.add_player(self.player_id)
                to_ret = {"type": "game.status", "content": state.model_dump_json()}
            except Exception as e:
                to_ret = {"type": "error", "content": {"msg": str(e)}}

            await self.channel_layer.group_send(self.room_group_name, to_ret)

    async def handle_player_left(self):
        async with redis_game_state(r, self.redis_key_game_state) as state:
            state.remove_player(self.player_id)
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "game.status", "content": state.model_dump_json()},
            )

    async def handle_player_play_score(self, event):
        play_name = event.get("content", {}).get("play")
        value = event.get("content", {}).get("value")
        async with redis_game_state(r, self.redis_key_game_state) as state:
            try:
                if self.player_id != state.current_player_id:
                    raise ValueError(f"It is not player {self.player_id}'s turn.")

                state.score(self.player_id, play_name, value)
                state.finish_turn()
                to_ret = {"type": "game.status", "content": state.model_dump_json()}
            except Exception as e:
                to_ret = {"type": "error", "content": {"msg": str(e)}}

        await self.channel_layer.group_send(self.room_group_name, to_ret)

    async def handle_game_status_change(self, event):
        new_status = event.get("content", {}).get("newStatus")
        async with redis_game_state(r, self.redis_key_game_state) as state:
            try:
                state.update_status(new_status)
                to_ret = {"type": "game.status", "content": state.model_dump_json()}
            except Exception as e:
                to_ret = {"type": "error", "content": {"msg": str(e)}}

            await self.channel_layer.group_send(self.room_group_name, to_ret)

    async def chat_message(self, event):
        # corresponds to the `chat.message` type
        # event = {'type': 'chat.message', 'content' : {'message': str}}
        await self.send(text_data=json.dumps(event))

    async def dice_roll_result(self, event):
        # corresponds to the `dice.roll.result` type
        # event = {'type': 'dice.roll.result', 'content': {'result': list[str]}}
        await self.send(text_data=json.dumps(event))

    async def player_turn_next(self, event):
        # corresponds to the `player.next.turn` type
        # event = {'type': 'player.next.turn', 'content': {'next_player': str}}
        await self.send(text_data=json.dumps(event))

    async def game_status(self, event):
        # corresponds to the `player.next.turn` type
        # event = {'type': 'player.next.turn', 'content': {...}}
        await self.send(text_data=json.dumps(event))

    async def error(self, event):
        # corresponds to the `error` type
        # event = {'type': 'error', 'content': {'msg': str}}
        await self.send(text_data=json.dumps(event))

    @property
    def redis_key_game_state(self) -> str:
        return f"{self.redis_key}:state"

    @property
    def redis_key_game_die_values(self) -> str:
        return f"{self.redis_key}:dies"
