from game.enums import GameStatus


def requires_game_status(desired_status: GameStatus):
    def inner(func):
        def wrapper(self, *args, **kwargs):
            if self.status != desired_status:
                raise ValueError(
                    f"The action {func.__name__} requires a game status of {desired_status}"
                )

            func(self, *args, **kwargs)

        return wrapper

    return inner
