import React from "react";

const Footer = () => {
  const getFooterLeft = () => {
    return (
      <>
        <i className="copyright outline icon"></i>2022
      </>
    );
  };
  const getFooterRight = () => {
    return (
      <>
        Creado con <i className="heart icon red"></i> por{" "}
        <a href="https://github.com/macebal" target="_blank" rel="noreferrer">
          Mariano Acebal
        </a>
      </>
    );
  };
  return (
    <div className="ui segment">
      <div className="ui stackable grid">
        <div className="two column mobile only row">
          <div className="left floated center aligned column">
            {getFooterLeft()}
          </div>
          <div className="right floated center aligned column">
            {getFooterRight()}
          </div>
        </div>
        <div className="two column tablet computer only row">
          <div className="left floated column">{getFooterLeft()}</div>
          <div className="right floated right aligned column">
            {getFooterRight()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
