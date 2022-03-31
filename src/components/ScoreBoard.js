import React from "react";
import { GAME_NAMES, GAME_ORDER } from "../util/gameData";
import PlayerScore from "./PlayerScore";
import _ from "lodash";

const ScoreBoard = ({ gameState }) => {
  return (
    <table className="ui selectable celled unstackable center aligned very compact table">
      <thead>
        <tr>
          <th></th>
          {GAME_ORDER.map(game => {
            const { shortName, longName } = GAME_NAMES[game];
            return (
              <th
                data-tooltip={longName}
                data-position="bottom center"
                key={shortName}
              >
                {shortName}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {_.map(gameState, (playerData, id) => {
          return <PlayerScore key={id} playerData={playerData} />;
        })}
      </tbody>
    </table>
  );
};

export default ScoreBoard;
