import React, { useState } from "react";
import _ from "lodash";
import { INITIAL_SCORE } from "../util/gameData";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const INITIAL_STATE = {
  0: { name: "Player 1", scores: INITIAL_SCORE },
  1: { name: "Player 2", scores: INITIAL_SCORE },
  2: { name: "Player 3", scores: INITIAL_SCORE },
  3: { name: "Player 4", scores: INITIAL_SCORE },
};

const App = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [currentPlayerId, setCurrentPlayerId] = useState(
    Object.keys(INITIAL_STATE)[0]
  );

  const playerData = gameState[currentPlayerId];

  const handleScoreClick = (gameName, score) => {
    const newScores = { ...playerData.scores, [gameName]: score };
    setGameState({
      ...gameState,
      [currentPlayerId]: { ...playerData, scores: newScores },
    });
    setCurrentPlayerId(getNextPlayer());
  };

  const getNextPlayer = () => {
    const nextPlayersId = _.chain(gameState)
      .keys()
      .pickBy(item => item > currentPlayerId)
      .orderBy("asc")
      .value();

    if (nextPlayersId.length > 0) {
      return nextPlayersId[0];
    } else {
      //If the selected player is the one with the highest ID (the last one), return the first player to start a new round
      return Object.keys(INITIAL_STATE)[0];
    }
  };

  return (
    <React.StrictMode>
      <div className="ui container segment">
        <ScoreBoard gameState={gameState} />
      </div>
      <div className="ui container segment">
        <GameBoard
          playerId={currentPlayerId}
          playerScores={playerData.scores}
          onScoreClick={handleScoreClick}
        />
      </div>
    </React.StrictMode>
  );
};

export default App;
