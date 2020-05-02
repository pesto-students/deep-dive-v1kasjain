import React, { useState } from "react";
import "../styles/Form.css";
import { Redirect } from "react-router-dom";
const SignUpForm = () => {
  const [showForm, setShowForm] = useState(true);
  const onSubmit = (e) => {
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

          <label className="fieldname">Email:</label>
          <br />
          <input
            className="textfield"
            type="text"
            name="email"
            placeholder="Email"
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

          <input className="submit" type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
};
export default SignUpForm;
