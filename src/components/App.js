import React from "react";
import GameBoard from "./GameBoard";

const App = () => {
  return (
    <React.StrictMode>
      <div className="ui container segment">
        <GameBoard />
      </div>
    </React.StrictMode>
  );
};

export default App;
