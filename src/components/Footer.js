import React from "react";

const Footer = () => {
  const getFooterLeft = () => {
    return (
      <>
        <i class="copyright outline icon"></i>2022
      </>
    );
  };
  const getFooterRight = () => {
    return (
      <>
        Creado con <i class="heart icon red"></i> por{" "}
        <a href="https://github.com/macebal" target="_blank" rel="noreferrer">
          Mariano Acebal
        </a>
      </>
    );
  };
  return (
    <div className="ui segment">
      <div className="ui stackable grid">
        <div class="two column mobile only row">
          <div class="left floated center aligned column">
            {getFooterLeft()}
          </div>
          <div class="right floated center aligned column">
            {getFooterRight()}
          </div>
        </div>
        <div class="two column tablet computer only row">
          <div class="left floated column">{getFooterLeft()}</div>
          <div class="right floated right aligned column">
            {getFooterRight()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
