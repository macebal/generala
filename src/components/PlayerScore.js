import React from "react";
import { GAME_ORDER } from "../util/gameData";

const PlayerScore = ({ playerData, color }) => {
  const { name, scores } = playerData;

  const getScoreLabel = score => {
    switch (score) {
      case -1:
        return <i className="times icon"></i>;
      case 0:
        return "";
      default:
        return score;
    }
  };

  return (
    <tr className={`left marked ${color}`}>
      <td>{name}</td>
      {GAME_ORDER.map(game => {
        return <td key={game}>{getScoreLabel(scores[game])}</td>;
      })}
    </tr>
  );
};

export default PlayerScore;
