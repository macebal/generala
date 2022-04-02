import React from "react";

const Button = ({ data, onClick }) => {
  const { text, isEnabled, color } = data;
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
