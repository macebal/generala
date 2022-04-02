import React from "react";
import Modal from "./Modal";

const VictoryScreen = () => {
  return (
    <Modal>
      <Modal.Header>
        <em data-emoji=":tada:" class="small"></em>
        {`¡Ha ganado <<<Player>>>!`}
        <em data-emoji=":tada:" class="small"></em>
      </Modal.Header>
      <Modal.Content>
        <div class="ui one column centered grid">
          <div className="center aligned column">
            <p>Tuvo la mayor cantidad de puntos al finalizar la ultima ronda</p>
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
                <tr className="left marked green">
                  <td>
                    <em data-emoji=":trophy:" class="small"></em>
                  </td>
                  <td>Player</td>
                  <td>100</td>
                </tr>
                <tr className="left marked green">
                  <td>
                    <em data-emoji=":second_place:" class="small"></em>
                  </td>
                  <td>Player</td>
                  <td>50</td>
                </tr>
                <tr className="left marked green">
                  <td>
                    <em data-emoji=":third_place:" class="small"></em>
                  </td>
                  <td>Player</td>
                  <td>20</td>
                </tr>
                <tr className="left marked green">
                  <td></td>
                  <td>Player</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <div class="ui green button">Nueva Partida</div>
        <div class="ui red button">Cerrar</div>
      </Modal.Actions>
    </Modal>
  );
};

export default VictoryScreen;
