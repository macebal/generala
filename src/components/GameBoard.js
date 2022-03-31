import React, { useState, useEffect } from "react";
import Button from "./Button";
import Dices from "./Dices";
import _ from "lodash";
import getPossibleScores from "../util/scores";
import Scores from "./Scores";

const getDefaultDiceState = values => {
  return _.chain(values)
    .map((value, index) => {
      return {
        id: index,
        value: value,
        selected: false,
      };
    })
    .mapKeys("id")
    .value();
};

const GameBoard = ({ onScoreClick, playerScores }) => {
  const [diceValues, setDiceValues] = useState(
    getDefaultDiceState([1, 1, 1, 1, 1])
  );
  const [rollTime, setRollTime] = useState(0); //remaining time for the roll animation
  const [buttonText, setButtonText] = useState("Tirar");
  const [isEnabled, setIsEnabled] = useState(true); //if the button is clickable
  const [remainingRolls, setRemainingRolls] = useState(3);
  const [possibleScores, setPossibleScores] = useState([]);

  useEffect(() => {
    if (rollTime <= 0) {
      setIsEnabled(true);
      return;
    }

    const timer = setInterval(() => {
      let newValues = _.clone(diceValues);

      //Progressively modify the newValues array with a random number
      //for each element, if it's not selected
      _.forEach(newValues, (dice, id) => {
        newValues = {
          ...newValues,
          [id]: {
            ...dice,
            value: dice.selected ? dice.value : Math.ceil(Math.random() * 6),
          },
        };
      });
      setDiceValues(newValues);
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

  useEffect(() => {
    const scores = getPossibleScores(
      _.map(diceValues, "value"),
      remainingRolls,
      playerScores
    );

    setPossibleScores(scores);
  }, [remainingRolls, diceValues, playerScores]);

  const handleRoll = () => {
    if (remainingRolls > 0) {
      setRollTime(1000);
      setIsEnabled(false);
      setRemainingRolls(remainingRolls - 1);
    } else {
      setRemainingRolls(3);
      setDiceValues(getDefaultDiceState([1, 1, 1, 1, 1]));
    }
  };

  const handleSelection = diceId => {
    // this is done to avoid selection of dice while the rolling animation is happening or before the first roll
    if (isEnabled && remainingRolls < 3) {
      let dice = diceValues[diceId];

      dice = {
        ...dice,
        selected: !dice.selected,
      };
      setDiceValues({ ...diceValues, [diceId]: dice });
    }
  };

  return (
    <div className="ui center aligned  middle aligned stackable grid">
      <div className="two column row">
        <div className=" three wide mobile two wide computer column">
          <div className="ui header">
            <Button
              text={buttonText}
              onClick={handleRoll}
              isEnabled={isEnabled}
              color={buttonText === "Siguiente" ? "green" : "blue"}
            />
          </div>
        </div>
        <div className="eight wide tablet six wide computer column">
          <Dices values={diceValues} onClick={handleSelection} />
        </div>
      </div>
      {possibleScores.length > 0 && remainingRolls < 3 && (
        <div className="one column row">
          <div className="column">
            <Scores
              scores={possibleScores}
              isEnabled={isEnabled}
              onScoreClick={onScoreClick}
            />
          </div>
        </div>
      )}
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
