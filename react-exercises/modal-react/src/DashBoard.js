import React from "react";
import logo from "./logo.svg";

const DashBoard = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h3>React Modal</h3>
        </div>
      </header>
      <section className="mainContent">
        <div className="container">
          <div className="mainLeft">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="mainRight">
            <h1>Welcome</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
              malesuada purus. Mauris eu libero leo. Sed quis malesuada magna,
              eget porta massa. Maecenas vulputate dignissim leo. Integer at
              quam sem. Sed placerat, odio eu mollis placerat, lorem elit
              ultricies lorem, venenatis iaculis orci lectus et massa. Donec ac
              convallis purus
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          Copyright 2020 Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </div>
      </footer>
    </div>
  );
};

export default DashBoard;
