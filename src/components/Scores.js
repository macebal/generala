/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";

const Scores = ({ scores, isEnabled }) => {
  return (
    <div className="ui large labels">
      {_.chain(scores)
        .orderBy("score", "desc")
        .map(score => {
          return (
            <a
              className={`ui blue ${!isEnabled ? "disabled" : ""} label`}
              href="#"
              key={score.name}
            >
              {_.upperFirst(score.name)}
              <div className="detail">{score.score} pts</div>
            </a>
          );
        })
        .value()}
    </div>
  );
};

export default Scores;
