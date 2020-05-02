import React from "react";
import logo from "../logo.svg";

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
            <h1>Welcome To The DashBoard</h1>
            <p>
              Custom React Modal Implementation As A Part Of The Deep Dive
              Module Of Pesto Remote Program. This Project Is Developed By Vikas
              And Kanishka.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">Developed By Vikas And Kanishka</div>
      </footer>
    </div>
  );
};

export default DashBoard;
