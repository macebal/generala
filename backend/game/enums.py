from enum import StrEnum


class GameStatus(StrEnum):
    PENDING: str = "pending"
    PLAYING: str = "playing"
    FINISHED: str = "finished"
