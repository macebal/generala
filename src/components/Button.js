import React from "react";

const Button = ({ text }) => {
  return <button className="big ui primary button">{text}</button>;
};

Button.defaultProps = {
  text: "Button",
};

export default Button;
