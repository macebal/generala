import json
import random
from urllib.parse import parse_qs
from channels.generic.websocket import AsyncWebsocketConsumer


class GameConsumer(AsyncWebsocketConsumer):
    player_ids = list()
    current_player_index = 0

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"game_{self.room_name}"

        query_params = parse_qs(self.scope["query_string"].decode())
        player_id = query_params.get("player_id", [None])[0]

        if player_id is None:
            # Do not accept connections that don't contain player id
            self.close()

        self.player_id = player_id

        if player_id not in self.player_ids:
            self.player_ids.append(player_id)

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "player.status.joined",
                "content": {
                    "player_id": self.player_id,
                    "all_players": self.player_ids,
                },
            },
        )

    async def disconnect(self, close_code):
        # Leave room group
        self.player_ids.remove(self.player_id)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "player.status.left",
                "content": {
                    "player_id": self.player_id,
                    "all_players": self.player_ids,
                },
            },
        )
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        event = json.loads(text_data)
        print(f"{self.player_ids}")
        match event.get("type"):
            case "chat.message":
                if (
                    not event.get("content", {}).get("message")
                    or len(event["content"]["message"]) == 0
                ):
                    return
            case "dice.roll":
                print(f"Dice rolled by {self.player_id}")
                number_of_dice = event.get("content", {}).get("number_of_dice", 0)
                event = {
                    "type": "dice.roll.result",
                    "content": {
                        "result": self.roll_dice(number_of_dice),
                    },
                }
            case "player.turn.finish":
                print(
                    f"Player {self.player_ids[self.current_player_index]} finished its turn"
                )
                next_player_id = self.finish_turn()
                event = {
                    "type": "player.turn.next",
                    "content": {"player_id": next_player_id},
                }
            case _:
                print(f"invalid type: {event.get('type')}")
                return

        await self.channel_layer.group_send(self.room_group_name, event)

    # Receive message from room group
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

    async def player_status_joined(self, event):
        # corresponds to the `player.status.joined` type
        # event = {'type': 'player.status.joined', 'content': {'player_id': str, 'all_players': list[str]}}
        await self.send(text_data=json.dumps(event))

    async def player_status_left(self, event):
        # corresponds to the `player.status.joined` type
        # event = {'type': 'player.status.left', 'content': {'player_id': str, 'all_players': list[str]}}
        await self.send(text_data=json.dumps(event))

    @staticmethod
    def roll_dice(number_of_dice: int) -> list[int]:
        if number_of_dice == 0:
            return []

        return [random.randint(1, 6) for _ in range(number_of_dice)]

    def finish_turn(self) -> str:
        """Finished the current player id turn and moves the turn to the next.
        Returns the player id whose turn is next.
        """
        self.current_player_index = (self.current_player_index + 1) % len(
            self.player_ids
        )
        return self.player_ids[self.current_player_index]
