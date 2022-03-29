import React from "react";
import PlayerScore from "./PlayerScore";

const ScoreBoard = () => {
  return (
    <table className="ui selectable celled unstackable center aligned table">
      <thead>
        <tr>
          <th></th>
          <th data-tooltip="Número 1" data-position="bottom center">
            1
          </th>
          <th data-tooltip="Número 2" data-position="bottom center">
            2
          </th>
          <th data-tooltip="Número 3" data-position="bottom center">
            3
          </th>
          <th data-tooltip="Número 4" data-position="bottom center">
            4
          </th>
          <th data-tooltip="Número 5" data-position="bottom center">
            5
          </th>
          <th data-tooltip="Número 6" data-position="bottom center">
            6
          </th>
          <th data-tooltip="Escalera" data-position="bottom center">
            E
          </th>
          <th data-tooltip="Full" data-position="bottom center">
            F
          </th>
          <th data-tooltip="Póker" data-position="bottom center">
            P
          </th>
          <th data-tooltip="Generala" data-position="bottom center">
            G
          </th>
          <th data-tooltip="Doble Generala" data-position="bottom center">
            DG
          </th>
        </tr>
      </thead>
      <tbody>
        <PlayerScore />
        <PlayerScore />
        <PlayerScore />
        <PlayerScore />
      </tbody>
    </table>
  );
};

export default ScoreBoard;
