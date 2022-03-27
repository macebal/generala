import React from "react";
import Dice from "./Dice";
import "./Dice.css";

const Dices = () => {
  return (
    <div className="ui center aligned grid">
      <div className="five column row">
        <div className="column">
          <Dice />
        </div>
        <div className="column">
          <Dice />
        </div>
        <div className="column">
          <Dice />
        </div>
        <div className="column">
          <Dice />
        </div>
        <div className="column">
          <Dice />
        </div>
      </div>
    </div>
  );
};

export default Dices;
