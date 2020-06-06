import React from "react";

const SlideUp = ({
    position = "relative",
    animationName = "myfirst",
    animationDuration = "5s",
    animationIterationCount = 1,
    height = -200,
    ...rest
}) => {

    const anim = {
        position,
        animationName,
        animationDuration,
        animationIterationCount,
    }
    const addDynamicKeyframes = (height) => {
        var style = document.createElement('style');
        style.type = 'text/css';
        const keyFrames = `@keyframes myfirst {
            100%   {left: 0px; top: 0px;}
            50%  {left: 0px; top: A_DYNAMIC_VALUEpx;}
            0% {left: 0px; top: 0px;}
        }`;
        style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, height);
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    addDynamicKeyframes(height);
    
    return (
        <div
            style={anim}
        >
            {rest.children}
        </div>
    );
};

export default SlideUp;
