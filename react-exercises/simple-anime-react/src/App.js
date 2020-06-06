import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Bounce, SlideUp } from "./components";

function App() {
  return (
    <div style={{ padding: 100 }}>
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
  );
}

export default App;
