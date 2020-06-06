import React from "react";
import "./Bounce.css";

const Bounce = ({
  animationName = "bounce",
  animationDuration = "1s",
  animationDelay = "0s",
  animationIterationCount = 1, 
  ...rest
}) => {
  
  const anim = {
    animationName,
    animationDuration,
    animationDelay,
    animationIterationCount
  };
  
  console.log(anim);
  return (
    <div className="bounce" style={anim}>
      {rest.children}
    </div>
  );
};

export default Bounce;
