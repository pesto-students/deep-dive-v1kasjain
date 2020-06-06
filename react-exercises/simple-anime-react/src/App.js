import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Bounce from "./components/Bounce";

function App() {
  return (
    <div style={{ marginTop: 100 }}>
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
  );
}

export default App;
