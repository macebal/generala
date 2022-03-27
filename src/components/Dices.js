import React from "react";
import Dice from "./Dice";
import "./Dice.css";

const Dices = ({ values }) => {
  return (
    <div className="ui center aligned grid">
      <div className="five column row">
        {values.map(dice => {
          return (
            <div className="column" key={dice.id}>
              <Dice value={dice.value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dices;
