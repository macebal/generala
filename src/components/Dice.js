import React from "react";

const Dice = ({ number }) => {
  return (
    // <div className="ui fluid image dice" style={{ border: "1px solid orange" }}>
    <img
      className="ui fluid image dice"
      src={`/img/dice-${number}.png`}
      alt={`Number ${number} dice`}
    />
    // </div>
  );
};

Dice.defaultProps = {
  number: 1,
};

export default Dice;
