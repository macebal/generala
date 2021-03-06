import React, { useState, useEffect } from "react";
import _ from "lodash";
import { INITIAL_SCORE } from "../util/gameData";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";
import Menu from "./Menu";
import Footer from "./Footer";
import VictoryScreen from "./VictoryScreen";

//TODO: Añadir logica para agregar/editar/borrar jugador
//TODO: Agregar splash, jugar y reglas (las rutas y la navegacion)
//TODO: Deshabilitar el boton cuando termina el juego!

const INITIAL_STATE = {
  0: { name: "Player 1", scores: INITIAL_SCORE },
  1: { name: "Player 2", scores: INITIAL_SCORE },
};

const App = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [currentPlayerId, setCurrentPlayerId] = useState(
    Object.keys(INITIAL_STATE)[0]
  );

  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const [winMotive, setWinMotive] = useState("");

  const playerData = gameState[currentPlayerId];

  useEffect(() => {
    //This function returns every score that has a value of 0.
    //If there are none, the game is over and a winner must be decided.
    const scoresRemaining = _.chain(gameState)
      .map(player => {
        return _.filter(player.scores, value => value === 0);
      })
      .flatten()
      .value();

    if (scoresRemaining.length === 0) handleVictory("points");
  }, [gameState]);

  const handleScoreClick = (gameName, score) => {
    const newScores = { ...playerData.scores, [gameName]: score };
    setGameState({
      ...gameState,
      [currentPlayerId]: { ...playerData, scores: newScores },
    });
    setCurrentPlayerId(getNextPlayer());
  };

  const handleVictory = (motive = "") => {
    setShowVictoryScreen(true);
    setWinMotive(motive);
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
      <VictoryScreen
        isActive={showVictoryScreen}
        motive={winMotive}
        gameState={gameState}
        onClose={() => setShowVictoryScreen(false)}
      />
      <div className="ui container">
        <Menu />
      </div>
      <div
        className="ui container segment"
        style={{ overflowX: "scroll", scrollbarWidth: "none" }}
      >
        <ScoreBoard gameState={gameState} />
      </div>
      <div className="ui container segment">
        <GameBoard
          playerName={gameState[currentPlayerId].name}
          playerScores={playerData.scores}
          onScoreClick={handleScoreClick}
          onVictory={handleVictory}
        />
      </div>
      <div className="ui container">
        <Footer />
      </div>
    </React.StrictMode>
  );
};

export default App;
