import React, { useState } from "react";
import "./Form.css";
import { Redirect } from "react-router-dom";
const SignInForm = () => {
  const [showForm, setShowForm] = useState(true);
  const onSubmit = e => {
    console.log('m in c');
    e.preventDefault();
    setShowForm(false);
  };

  if (!showForm) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div>
        <form className="form" onSubmit={onSubmit}>
          <label className="fieldname">Name:</label>
          <br />
          <input
            className="textfield"
            type="text"
            name="name"
            placeholder="Name"
          />
          <br />

          <label className="fieldname">Password:</label>
          <br />
          <input
            className="textfield"
            type="text"
            name="password"
            placeholder="Password"
          />
          <br />
          <input className="submit" type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
};
export default SignInForm;
