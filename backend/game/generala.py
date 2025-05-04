from collections import OrderedDict
import re
from pydantic import BaseModel, ValidationInfo, field_validator, Field, ConfigDict
from enum import StrEnum
from dataclasses import dataclass


FIELD_NUMBER_REGEX = re.compile(r"^number_(?P<number>[1-6])$")


@dataclass(frozen=True)
class Play:
    name: str
    value: int


PLAYS = {
    "straight": Play(name="straight", value=20),
    "full_house": Play(name="full_house", value=30),
    "poker": Play(name="poker", value=40),
    "generala": Play(name="generala", value=50),
    "double_generala": Play(name="double_generala", value=100),
}


class GameStatus(StrEnum):
    PENDING: str = "pending"
    STARTED: str = "started"
    FINISHED: str = "finished"


class PlayerGameState(BaseModel):
    model_config = ConfigDict(validate_assignment=True)

    number_1: int | None = None
    number_2: int | None = None
    number_3: int | None = None
    number_4: int | None = None
    number_5: int | None = None
    number_6: int | None = None
    straight: int | None = None
    full_house: int | None = None
    poker: int | None = None
    generala: int | None = None
    double_generala: int | None = None

    @field_validator(
        "number_1",
        "number_2",
        "number_3",
        "number_4",
        "number_5",
        "number_6",
        mode="after",
    )
    @classmethod
    def validate_is_multiple_of_6_or_none(
        cls, value: int | None, info: ValidationInfo
    ) -> int | None:
        field_number = int(
            re.match(FIELD_NUMBER_REGEX, info.field_name).group("number")
        )

        # Ensure that the value is possible to achieve with dies. For example, for the number 3
        # the possible values are None, 0, 3, 6, 9, 12, 15
        if (
            value is None
            or value == 0
            or (value % field_number == 0 and value <= field_number * 5 and value > 0)
        ):
            return value

        raise ValueError(
            f"A value of {value} is not valid for the number {field_number}"
        )

    @field_validator(
        "straight",
        "full_house",
        "poker",
        "generala",
        "double_generala",
        mode="after",
    )
    @classmethod
    def validate_play_value(cls, value: int | None, info: ValidationInfo) -> int | None:
        if value is None or value == 0:
            return value

        match info.field_name:
            case "straight" | "full_house" | "poker" | "generala":
                play = PLAYS[info.field_name]
                if value == play.value:
                    return value
            case "double_generala":
                play = PLAYS[info.field_name]
                if info.data["generala"] != 50:
                    raise ValueError(
                        "A game of double generala cannot be scored before scoring a game of generala"
                    )
                if value == play.value:
                    return value
            case _:
                raise ValueError(f"Unknown play: {info.field_name}")

        raise ValueError(
            f"A value of {value} is not valid for the game of {info.field_name}"
        )


class GameState(BaseModel):
    status: GameStatus = GameStatus.PENDING
    state: dict[str, PlayerGameState] = Field(default_factory=OrderedDict)

    @property
    def player_ids(self) -> list[str]:
        return list(self.state.keys())

    def add_player(self, player_id: str) -> None:
        # if player_id in self.state:
        #     raise ValueError(f"Player {player_id} is already playing")

        self.state[player_id] = PlayerGameState()

    def remove_player(self, player_id: str) -> None:
        self.state.pop(player_id, {})

    def score(self, player_id: str, play_name: str, play_value: int):
        setattr(self.state[player_id], play_name, play_value)
