import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const renderApp = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
ReactDOM.render(renderApp(), document.querySelector("#root"));
