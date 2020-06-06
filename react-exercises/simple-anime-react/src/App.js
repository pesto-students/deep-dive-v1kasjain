import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Bounce, SlideUp, Pulse } from "./components";

function App() {
  return (
    <div className="wrapper">
      <div className="box">
      <Bounce>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 200,
            borderWidth: 1,
            borderStyle: "solid",
            textAlign: "center"
          }}
        >
          T
        </div>
      </Bounce>
      </div>
      <div className="box">
      <SlideUp>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 200,
            borderWidth: 1,
            borderStyle: "solid",
            textAlign: "center"
          }}
        >
          T
        </div>
      </SlideUp>
      </div>
      <div className="box">
      <Pulse>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 200,
            borderWidth: 1,
            borderStyle: "solid",
            textAlign: "center"
          }}
        >
          T
        </div>
      </Pulse>
      </div>
    </div>
  );
}

export default App;
