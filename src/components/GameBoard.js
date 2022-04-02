import React, { useState, useEffect, useReducer } from "react";
import _ from "lodash";

import Button from "./Button";
import Dices from "./Dices";

import getPossibleScores from "../util/scores";
import Scores from "./Scores";
import diceReducer from "../reducers/diceReducer";
import rollReducer from "../reducers/rollReducer";
import buttonReducer from "../reducers/buttonReducer";

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

const GameBoard = ({ onScoreClick, onVictory, playerScores, playerName }) => {
  const [diceState, diceDispatch] = useReducer(
    diceReducer,
    [1, 1, 1, 1, 1],
    setDiceValues
  );

  const [rollState, rollDispatch] = useReducer(rollReducer, {
    isRolling: false,
    animationTimeLeft: 0,
  });

  const [buttonState, buttonDispatch] = useReducer(buttonReducer, {
    text: "Tirar",
    isEnabled: true,
    color: "blue",
    shouldChangePlayer: false,
  });

  const [remainingRolls, setRemainingRolls] = useState(3);
  const [possibleScores, setPossibleScores] = useState([]);

  useEffect(() => {
    if (!rollState.isRolling) return;

    const timer = setInterval(() => {
      diceDispatch({ type: "RANDOMIZE_VALUES" });
      rollDispatch({ type: "SUBSTRACT_ANIMATION_TIME", payload: 50 });
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

  useEffect(() => {
    if (rollState.isRolling) {
      buttonDispatch({ type: "ROLLING" });
    } else {
      switch (remainingRolls) {
        case 0:
          buttonDispatch({ type: "WAIT_FOR_SCORE_CLICK" });
          break;
        default:
          buttonDispatch({ type: "CAN_ROLL" });
          break;
      }
    }
  }, [remainingRolls, rollState]);

  useEffect(() => {
    if (!rollState.isRolling && remainingRolls === 2) {
      //if the player gets a Generala in the first roll, it automatically wins

      const hasWinCondition =
        _.filter(
          possibleScores,
          item => (item.name === "G" || item.name === "DG") && item.score > 0
        ).length > 0;

      if (hasWinCondition) onVictory("generala");
    }
  }, [remainingRolls, rollState, possibleScores, onVictory]);

  const handleRoll = () => {
    if (buttonState.shouldChangePlayer) {
      diceDispatch({
        type: "SET_STATE",
        payload: setDiceValues([1, 1, 1, 1, 1]),
      });
      setRemainingRolls(3);
    } else {
      if (remainingRolls > 0) {
        rollDispatch({ type: "SET_ANIMATION_DURATION", payload: 1000 });
        setRemainingRolls(remainingRolls - 1);
      }
    }
  };

  const handleSelection = diceId => {
    // This is done to avoid selection of dice while the rolling animation is happening or before the first roll
    if (!rollState.isRolling && remainingRolls < 3) {
      diceDispatch({ type: "TOGGLE_SELECTION", payload: diceId });
    }
  };

  const handleScoreClick = (shortName, score) => {
    //This function handles all the button and roll state logic before returning the original function coming
    //from the parent component
    buttonDispatch({ type: "NEXT_PLAYER" });
    return onScoreClick(shortName, score);
  };

  const getLabelText = remainingRolls => {
    switch (remainingRolls) {
      case 0:
        return "No quedan tiros";
      case 1:
        return "Queda 1 tiro";
      default:
        return `Quedan ${remainingRolls} tiros`;
    }
  };

  return (
    <div className="ui center aligned middle aligned stackable grid">
      {!buttonState.shouldChangePlayer && (
        <div className="one column row">
          <div className="column">
            <div className="ui header">{`Es el turno de ${playerName}`}</div>
          </div>
        </div>
      )}
      <div className="two column row">
        <div className=" three wide mobile two wide computer column">
          <div className="ui header">
            <Button data={buttonState} onClick={handleRoll} />
          </div>
        </div>
        <div className="eight wide tablet six wide computer column">
          <Dices values={diceState} onClick={handleSelection} />
        </div>
      </div>
      {possibleScores.length > 0 &&
      remainingRolls < 3 &&
      !buttonState.shouldChangePlayer ? (
        <div className="one column row">
          <div className="column">
            <Scores
              scores={possibleScores}
              isEnabled={!rollState.isRolling}
              onScoreClick={handleScoreClick}
            />
          </div>
        </div>
      ) : null}
      {!buttonState.shouldChangePlayer && (
        <div className="one column row">
          <div className="column">
            <div className="ui header">{getLabelText(remainingRolls)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
