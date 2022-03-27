import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button className="big ui primary button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Button",
};

export default Button;
