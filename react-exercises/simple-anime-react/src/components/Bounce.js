import React from "react";
import "./Bounce.css";

const Bounce = (props) => {
  const anim = {
    animationName: "bounce",
    animationDuration: "1s",
    animationDelay: "0s",
    animationIterationCount: 1,
  };
  console.log(anim);
  return (
    <div className="bounce" style={anim}>
      {props.children}
    </div>
  );
};

export default Bounce;
