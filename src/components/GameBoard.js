import React, { useState, useEffect } from "react";
import Button from "./Button";
import Dices from "./Dices";

const getDiceValuesObjArray = values => {
  return values.map((value, index) => {
    return {
      id: index,
      value: value,
    };
  });
};

const GameBoard = () => {
  const [diceValues, setDiceValues] = useState(
    getDiceValuesObjArray([1, 1, 1, 1, 1])
  );

  const [rollTime, setRollTime] = useState(0); //remaining time for the roll animation

  useEffect(() => {
    if (rollTime <= 0) {
      return;
    }

    let timer = setInterval(() => {
      const newValues = Array.from({ length: 5 }, () =>
        Math.ceil(Math.random() * 6)
      );

      setDiceValues(getDiceValuesObjArray(newValues));
      setRollTime(prevTime => prevTime - 50);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [rollTime]);

  const handleRoll = () => {
    setRollTime(1000);
  };
  //   var timer;
  //   const handleRoll = () => {
  //     timer = setInterval(() => {
  //       const newValues = Array.from({ length: 5 }, () =>
  //         Math.ceil(Math.random() * 6)
  //       );

  //       setDiceValues(getDiceValuesObjArray(newValues));
  //       setRemainingTime(prevTime => prevTime - 100);
  //     }, 100);
  //   };

  //   useEffect(() => {
  //     if (remainingTime <= 0) {
  //       clearTimeout(timer);
  //     }
  //   }, [remainingTime, timer]);

  return (
    <div className="ui center aligned stackable grid">
      <div className="two column row">
        <div className="two wide column">
          <Button text="Tirar" onClick={handleRoll} />
        </div>
        <div className="six wide column">
          <Dices values={diceValues} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
