import _ from "lodash";
import React from "react";
import Modal from "./Modal";
import { PLAYER_COLORS } from "./ScoreBoard";

const VictoryScreen = ({ isActive, motive, onClose, gameState }) => {
  //if motive = "points, it means that the victory was achieved by finalizing all the rolling rounds"
  //if motive = "generala", it means that the victory was achieved by scoring Generala on the first roll

  //Here sortingScore is used to put the player that makes generala in the first roll on top of everyone even if
  //the sum of scores is less than other players, since that counts as an instant victory.
  const tableData = _.chain(gameState)
    .map((value, id) => {
      const score = _.chain(value.scores).toArray().sum().value();
      const sortingScore = motive === "generala" ? 9999 : score;
      return {
        id,
        name: value.name,
        score,
        sortingScore,
      };
    })
    .orderBy("sortingScore", "desc")
    .value();

  const ICON_NAMES = [":trophy:", ":second_place:", ":third_place:"];

  const getHeaderText = () => {
    switch (motive) {
      case "generala":
        return "¡Obtuvo una generala en el primer tiro!";
      case "points":
        return "Tuvo la mayor cantidad de puntos al finalizar la última ronda";
      default:
        return "La partida ha finalizado";
    }
  };

  return (
    <Modal active={isActive} onClose={onClose}>
      <Modal.Header>
        <em data-emoji=":tada:" className="small"></em>
        {`¡Ha ganado ${tableData[0].name}!`}
        <em data-emoji=":tada:" className="small"></em>
      </Modal.Header>
      <Modal.Content>
        <div className="ui one column centered grid">
          <div className="center aligned column">
            <p>{getHeaderText()}</p>
          </div>
          <div className="column">
            <table className="ui selectable unstackable center aligned very compact table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((player, index) => {
                  return (
                    <tr className={`left marked ${PLAYER_COLORS[player.id]}`}>
                      <td>
                        <em
                          data-emoji={
                            ICON_NAMES[index] ? ICON_NAMES[index] : ""
                          }
                          className="small"
                        ></em>
                      </td>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                    </tr>
                  );
                })}
                {/* <tr className="left marked green">
                  <td>
                    <em data-emoji=":trophy:" className="small"></em>
                  </td>
                  <td>Player</td>
                  <td>100</td>
                </tr>
                <tr className="left marked green">
                  <td>
                    <em data-emoji=":second_place:" className="small"></em>
                  </td>
                  <td>Player</td>
                  <td>50</td>
                </tr>
                <tr className="left marked green">
                  <td>
                    <em data-emoji=":third_place:" className="small"></em>
                  </td>
                  <td>Player</td>
                  <td>20</td>
                </tr>
                <tr className="left marked green">
                  <td></td>
                  <td>Player</td>
                  <td>10</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <div className="ui green button">Nueva Partida</div>
        <div className="ui red button" onClick={onClose}>
          Cerrar
        </div>
      </Modal.Actions>
    </Modal>
  );
};

export default VictoryScreen;
