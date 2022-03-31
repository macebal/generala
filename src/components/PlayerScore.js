import React from "react";
import { GAME_ORDER } from "../util/gameData";

const PlayerScore = ({ name, scores }) => {
  return (
    <tr className="left marked green">
      <td>{name}</td>
      {GAME_ORDER.map(game => {
        return <td key={game}>{scores[game]}</td>;
      })}
    </tr>
  );
};

export default PlayerScore;
