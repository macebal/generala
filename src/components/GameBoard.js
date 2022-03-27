import React from "react";
import Button from "./Button";
import Dices from "./Dices";

const GameBoard = () => {
  return (
    <div className="ui center aligned stackable grid">
      <div className="two column row">
        <div className="six wide column">
          <Button text="Tirar" />
        </div>
        <div className="six wide column">
          <Dices />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
//right floated left floated
