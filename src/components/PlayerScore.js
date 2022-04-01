import React from "react";
import { GAME_ORDER } from "../util/gameData";

const PlayerScore = ({ playerData, color }) => {
  const { name, scores } = playerData;
  return (
    <tr className={`left marked ${color}`}>
      <td>{name}</td>
      {GAME_ORDER.map(game => {
        return (
          <td key={game}>
            {scores[game] === -1 ? (
              <i className="times icon"></i>
            ) : (
              scores[game]
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default PlayerScore;
