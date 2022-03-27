import React from "react";
import Dice from "./Dice";
import "./Dice.css";

const Dices = ({ values, onClick }) => {
  //The values props must be an array of objects with the properties needed below
  return (
    <div className="ui center aligned padded grid">
      <div className="five column row">
        {values.map(dice => {
          return (
            <div
              className={`column ${dice.selected && "blue"}`}
              key={dice.id}
              onClick={() => onClick(dice.id)}
            >
              <Dice value={dice.value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dices;
