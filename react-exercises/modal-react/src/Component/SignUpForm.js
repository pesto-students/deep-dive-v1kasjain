import React from "react";
import "./Form.css";
import { Link } from "react-router-dom";
const SignUpForm = () => {
  return (
    <div>
      <form className="form">
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

        <Link to="/home">
          <input className="submit" type="submit" value="Submit" />
        </Link>
      </form>
    </div>
  );
};
export default SignUpForm;
