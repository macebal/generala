/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Menu() {
  return (
    <div className="ui large borderless secondary pointing menu">
      <img
        src="/img/logo_small.png"
        alt="logo"
        className="ui image "
        style={{ height: 40, width: "auto" }}
      />
      <div className="right menu">
        <a className="active blue item">Jugar</a>
        <a className="blue item">Reglas</a>
      </div>
    </div>
  );
}

export default Menu;
