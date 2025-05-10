from game.enums import GameStatus


def requires_game_status(desired_status: GameStatus, raise_error: bool = False):
    def inner(func):
        def wrapper(self, *args, **kwargs):
            if self.status != desired_status:
                if raise_error:
                    raise ValueError(
                        f"The action {func.__name__} requires a game status of {desired_status}"
                    )
                return

            func(self, *args, **kwargs)

        return wrapper

    return inner
