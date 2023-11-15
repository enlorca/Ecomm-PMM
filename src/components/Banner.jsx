import React from "react";
import "./Banner.css";

const Banner = (props) => {
  return <div className="banner d-flex flex-column justify-content-center align-items-center">{props.children}</div>;
};

export default Banner;
