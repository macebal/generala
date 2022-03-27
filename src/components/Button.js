import React from "react";

const Button = ({ text, onClick, isEnabled, color }) => {
  return (
    <button
      className={`big ui ${color} button`}
      onClick={onClick}
      disabled={!isEnabled}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Button",
  isEnabled: true,
  color: "blue",
};

export default Button;
