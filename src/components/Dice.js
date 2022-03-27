import React from "react";

const Dice = ({ value }) => {
  return (
    // <div className="ui fluid image dice" style={{ border: "1px solid orange" }}>
    <img
      className="ui fluid image dice"
      src={`/img/dice-${value}.png`}
      alt={`value ${value} dice`}
    />
    // </div>
  );
};

Dice.defaultProps = {
  value: 1,
};

export default Dice;
