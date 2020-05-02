import React, { useState } from "react";
import logo from "../logo.svg";
import Modal from "./Modal";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const HomePage = () => {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const displayModal = (e) => {
    if (e.target.value === "signUp") {
      setSignUpModal(true);
    }
    if (e.target.value === "signIn") {
      setSignInModal(true);
    }
  };
  const hideModal = (modalName) => {
    if (modalName === "signUp") {
      setSignUpModal(false);
    }
    if (modalName === "signIn") {
      setSignInModal(false);
    }
  };
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
            <h1>React Modal Example</h1>
            <p>
              Custom React Modal Implementation As A Part Of The Deep Dive
              Module Of Pesto Remote Program. This Project Is Developed By Vikas
              And Kanishka.
            </p>
            <ul className="buttonGroup">
              <li>
                <button onClick={displayModal} value="signUp">
                  SIGN UP
                </button>
              </li>
              <li>
                <button onClick={displayModal} value="signIn">
                  SIGN IN
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Modal
          modalVisibility={signUpModal}
          onClose={hideModal}
          modalName="signUp"
          showHeader="true"
          headingText="Sign Up"
          shouldCloseOnClick={true}
        >
          <SignUpForm></SignUpForm>
        </Modal>
        <Modal
          modalVisibility={signInModal}
          onClose={hideModal}
          showHeader="true"
          headingText="Sign In"
          modalName="signIn"
        >
          <SignInForm></SignInForm>
        </Modal>
      </section>
      <footer>
        <div className="container">Developed By Vikas And Kanishka</div>
      </footer>
    </div>
  );
};

export default HomePage;
