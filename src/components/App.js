import React, { useState } from "react";
import { INITIAL_SCORE } from "../util/gameData";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const INITIAL_STATE = {
  "Player 1": INITIAL_SCORE,
  "Player 2": INITIAL_SCORE,
};

const App = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState(
    Object.keys(INITIAL_STATE)[0]
  );

  const handleScoreClick = (playerName, gameName, score) => {
    const playerData = gameState[playerName];
    const newPlayerData = { ...playerData, [gameName]: score };
    setGameState({ ...gameState, [playerName]: newPlayerData });
  };

  return (
    <React.StrictMode>
      <div className="ui container segment">
        <ScoreBoard gameState={gameState} />
      </div>
      <div className="ui container segment">
        <GameBoard
          currentPlayer={currentPlayer}
          playerData={gameState[currentPlayer]}
          onScoreClick={handleScoreClick}
        />
      </div>
    </React.StrictMode>
  );
};

export default App;
