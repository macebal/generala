/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _, { isInteger } from "lodash";
import { GAME_NAMES } from "../util/gameData";

const Scores = ({ scores, isEnabled }) => {
  return (
    <div className="ui large labels">
      {_.chain(scores)
        .orderBy("score", "desc")
        .map(score => {
          const scoreName = GAME_NAMES[score.name].name;
          return (
            <a
              className={`ui blue ${!isEnabled ? "disabled" : ""} label`}
              href="#"
              key={score.name}
            >
              {scoreName}
              <div className="detail">{score.score} pts</div>
            </a>
          );
        })
        .value()}
    </div>
  );
};

export default Scores;
