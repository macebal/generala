from contextlib import asynccontextmanager
from game.generala import GameState


# TODO: use redis.lock()
@asynccontextmanager
async def redis_game_state(redis_client, redis_key):
    data = redis_client.get(redis_key)
    state = GameState.from_json_string(data) if data else GameState()
    yield state
    redis_client.set(redis_key, state.model_dump_json())
