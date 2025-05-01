import re
from pydantic import BaseModel, ValidationInfo, field_validator
from enum import StrEnum

FIELD_NUMBER_REGEX = re.compile(r"^number_(?P<number>[1-6])$")


class GameStatus(StrEnum):
    PENDING: str = "pending"
    STARTED: str = "started"
    FINISHED: str = "finished"


class GameState(BaseModel):
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
    def validate_straight_value(
        cls, value: int | None, info: ValidationInfo
    ) -> int | None:
        if value is None or value == 0:
            return value

        match info.field_name:
            case "straight":
                if value == 20:
                    return value
            case "full_house":
                if value == 30:
                    return value
            case "poker":
                if value == 40:
                    return value
            case "generala":
                if value == 50:
                    return value
            case "double_generala":
                if info.data["generala"] != 50:
                    raise ValueError(
                        "A game of double generala cannot be scored before scoring a game of generala"
                    )
                if value == 100:
                    return value

        raise ValueError(
            f"A value of {value} is not valid for the game of {info.field_name}"
        )


class GeneralaGame(BaseModel):
    player_ids: list[str]
    status: GameStatus = GameStatus.PENDING
