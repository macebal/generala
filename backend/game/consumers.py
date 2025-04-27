import json
import random

from channels.generic.websocket import AsyncWebsocketConsumer


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"game_{self.room_name}"

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        event = json.loads(text_data)

        match event.get("type"):
            case "chat.message":
                if (
                    not event.get("content", {}).get("message")
                    or len(event["content"]["message"]) == 0
                ):
                    return
            case "dice.roll":
                number_of_dice = event.get("content", {}).get("number_of_dice", 0)
                results = self.roll_dice(number_of_dice)
                event = {"type": "dice.roll.result", "content": {"result": results}}
            case _:
                print(f"invalid type: {event.get('type')}")
                return
        print(f"{event=}")

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

    @staticmethod
    def roll_dice(number_of_dice: int) -> list[int]:
        if number_of_dice == 0:
            return []

        return [random.randint(1, 6) for _ in range(number_of_dice)]
