import React, { useState } from "react";
import { INITIAL_SCORE } from "../util/gameData";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const INITIAL_STATE = {
  0: { name: "Player 1", scores: INITIAL_SCORE },
  1: { name: "Player 2", scores: INITIAL_SCORE },
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
  }; //...playerData, score: newPlayerData

  return (
    <React.StrictMode>
      <div className="ui container segment">
        <ScoreBoard gameState={gameState} />
      </div>
      <div className="ui container segment">
        <GameBoard
          playerScores={playerData.scores}
          onScoreClick={handleScoreClick}
        />
      </div>
    </React.StrictMode>
  );
};

export default App;
