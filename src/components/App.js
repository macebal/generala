import React from "react";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const App = () => {
  return (
    <React.StrictMode>
      <div className="ui container segment">
        <ScoreBoard />
      </div>
      <div className="ui container segment">
        <GameBoard />
      </div>
    </React.StrictMode>
  );
};

export default App;
