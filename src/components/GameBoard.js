import React, { useState, useEffect, useReducer } from "react";
import _ from "lodash";

import Button from "./Button";
import Dices from "./Dices";

import getPossibleScores from "../util/scores";
import Scores from "./Scores";
import diceReducer from "../reducers/diceReducer";
import rollReducer from "../reducers/rollReducer";

const setDiceValues = values => {
  return _.chain(values)
    .map((value, index) => {
      return {
        id: index,
        value: value,
        isSelected: false,
      };
    })
    .mapKeys("id")
    .value();
};

const GameBoard = ({ onScoreClick, playerScores, playerId }) => {
  const [diceState, diceDispatch] = useReducer(
    diceReducer,
    [1, 1, 1, 1, 1],
    setDiceValues
  );

  const [rollState, rollDispatch] = useReducer(rollReducer, {
    isRolling: false,
    animationTimeLeft: 0,
  });

  const [buttonText, setButtonText] = useState("Tirar");
  const [isEnabled, setIsEnabled] = useState(true); //if the button is clickable
  const [remainingRolls, setRemainingRolls] = useState(3);
  const [possibleScores, setPossibleScores] = useState([]);

  useEffect(() => {
    if (!rollState.isRolling) return;

    const timer = setInterval(() => {
      diceDispatch({ type: "RANDOMIZE_VALUES" });
      rollDispatch({ type: "SUBSTRACT_ANIMATION_TIME", payload: 50 });
      // setRollTime(prevTime => prevTime - 50);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [rollState]);

  useEffect(() => {
    const scores = getPossibleScores(
      _.map(diceState, "value"),
      remainingRolls,
      playerScores
    );

    setPossibleScores(scores);
  }, [remainingRolls, diceState, playerScores]);

  // useEffect(() => {
  //   //FIXME: Ni bien arranca no tiene que ser "Siguiente"
  //   //FIXME: El turno debe terminar si seleccionan un score antes de hacer los 3 tiros
  //   setIsEnabled(true);
  //   setRemainingRolls(0);
  //   setPossibleScores([]);
  // }, [playerId]);

  useEffect(() => {
    if (rollState.isRolling) {
      setButtonText("Tirando");
    } else {
      switch (remainingRolls) {
        case 0:
          setButtonText("Siguiente");
          break;
        default:
          setButtonText("Tirar");
          setIsEnabled(true);
          break;
      }
    }
  }, [remainingRolls, rollState, playerId]);

  const handleRoll = () => {
    if (remainingRolls > 0) {
      // setRollTime(1000);
      rollDispatch({ type: "SET_ANIMATION_DURATION", payload: 1000 });
      setIsEnabled(false);
      setRemainingRolls(remainingRolls - 1);
    } else {
      setRemainingRolls(3);
      setDiceValues([1, 1, 1, 1, 1]);
    }
  };

  const handleSelection = diceId => {
    // this is done to avoid selection of dice while the rolling animation is happening or before the first roll
    if (isEnabled && remainingRolls < 3) {
      diceDispatch({ type: "TOGGLE_SELECTION", payload: diceId });
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
          <Dices values={diceState} onClick={handleSelection} />
        </div>
      </div>
      {possibleScores.length > 0 && remainingRolls < 3 && (
        <div className="one column row">
          <div className="column">
            <Scores
              scores={possibleScores}
              isEnabled={!rollState.isRolling}
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
