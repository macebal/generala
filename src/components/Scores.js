/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import { GAME_NAMES } from "../util/gameData";

const Scores = ({ scores, isEnabled, onScoreClick }) => {
  return (
    <div className="ui large labels">
      {_.chain(scores)
        .orderBy("score", "desc")
        .map(({ score, name: gameName }) => {
          const { name, shortName } = GAME_NAMES[gameName];
          if (score === -1) {
            return (
              <a
                className={`ui red ${!isEnabled ? "disabled" : ""} label`}
                href="#"
                key="tachar"
                onClick={() => onScoreClick(shortName, score)}
              >
                {`Tachar ${name}`}
                <div className="detail">
                  <i className="times icon"></i>
                </div>
              </a>
            );
          } else {
            return (
              <a
                className={`ui blue ${!isEnabled ? "disabled" : ""} label`}
                href="#"
                key={shortName}
                onClick={() => onScoreClick(shortName, score)}
              >
                {name}
                <div className="detail">{`${score} pts`}</div>
              </a>
            );
          }
        })
        .value()}
    </div>
  );
};

export default Scores;
