import React from "react";
import "./Pulse.css";

const Pulse = (props) => {
  const anim = {
    animationName: "pulse",
    animationDuration: "1s",
    animationDelay: "0s",
    animationIterationCount: 20,
  };
  console.log(anim);
  return (
    <div className="pulse" style={anim}>
      {props.children}
    </div>
  );
};

export default Pulse;
