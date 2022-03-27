import React from "react";

const Dice = ({ value }) => {
  return (
    <img
      className="ui fluid image dice"
      src={`/img/dice-${value}.png`}
      alt={`value ${value} dice`}
    />
  );
};

Dice.defaultProps = {
  value: 1,
};

export default Dice;
