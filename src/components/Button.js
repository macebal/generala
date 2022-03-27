import React from "react";

const Button = ({ text, onClick, isEnabled }) => {
  return (
    <button
      className="big ui primary button"
      onClick={onClick}
      disabled={!isEnabled}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Button",
};

export default Button;
