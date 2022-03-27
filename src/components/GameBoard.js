import React, { useState, useEffect } from "react";
import Button from "./Button";
import Dices from "./Dices";

const getDefaultDiceValues = values => {
  return values.map((value, index) => {
    return {
      id: index,
      value: value,
      selected: false,
    };
  });
};

const GameBoard = () => {
  const [diceValues, setDiceValues] = useState(
    getDefaultDiceValues([1, 1, 1, 1, 1])
  );

  const [rollTime, setRollTime] = useState(0); //remaining time for the roll animation
  const [buttonText, setButtonText] = useState("Tirar");
  const [isEnabled, setIsEnabled] = useState(true); //if the button is clickable
  const [remainingRolls, setRemainingRolls] = useState(3);

  useEffect(() => {
    if (rollTime <= 0) {
      setIsEnabled(true);
      return;
    }

    const timer = setInterval(() => {
      const newValues = Array.from({ length: 5 }, () =>
        Math.ceil(Math.random() * 6)
      );

      const newDices = newValues.map((value, index) => {
        const dice = diceValues[index];
        return {
          ...dice,
          value: dice.selected ? dice.value : value, //only change the value of the dice if it's not selected
        };
      });
      setDiceValues(newDices);
      setRollTime(prevTime => prevTime - 50);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [rollTime, diceValues]);

  useEffect(() => {
    if (rollTime > 0) {
      setButtonText("Tirando");
    } else {
      switch (remainingRolls) {
        case 0:
          setButtonText("Siguiente");
          break;
        default:
          setButtonText("Tirar");
          break;
      }
    }
  }, [remainingRolls, rollTime]);

  const handleRoll = () => {
    if (remainingRolls > 0) {
      setRollTime(1000);
      setIsEnabled(false);
      setRemainingRolls(remainingRolls - 1);
    } else {
      setRemainingRolls(3);
      setDiceValues(getDefaultDiceValues([1, 1, 1, 1, 1]));
    }
  };

  const handleSelection = diceId => {
    //This is done to avoid selection of dice while the rolling animation is happening
    if (isEnabled) {
      let dices = diceValues.filter(dice => dice.id !== diceId); //The dices that are *not* the selected one
      let dice = diceValues.filter(dice => dice.id === diceId)[0];

      dice = {
        ...dice,
        selected: !dice.selected,
      };

      setDiceValues([...dices, dice].sort((a, b) => (a.id > b.id ? 1 : -1))); //sort the array by the dices "id" key to ensure proper dice order
    }
  };

  return (
    <div className="ui center aligned  middle aligned stackable grid">
      <div className="two column row">
        <div className="two wide column">
          <div className="ui header">
            <Button
              text={buttonText}
              onClick={handleRoll}
              isEnabled={isEnabled}
              color={buttonText === "Siguiente" ? "green" : "blue"}
            />
          </div>
        </div>
        <div className="six wide column">
          <Dices values={diceValues} onClick={handleSelection} />
        </div>
      </div>
      <div className="one column row">
        <div className="column">
          <div className="ui header">
            {remainingRolls === 0
              ? `No quedan tiros`
              : remainingRolls === 1
              ? `Queda 1 tiro`
              : `Quedan ${remainingRolls} tiros`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
