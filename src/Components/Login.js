import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../config/Fire.js";
import "./LoginStyles.css";
import { AuthContext } from "../Auth.js";
import Button from "react-bootstrap/Button";

const Login = ({ history }) => {
  // Query the Firebase api of the email and password combo is good
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const userContext = useContext(AuthContext);

  if (userContext.currentUser != null) {
    console.log(userContext);
    return <Redirect to="/" />;
  }

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder=" Email" />
        <br></br>
        <br></br>

        <input name="password" type="password" placeholder=" Password" />
        <br></br>
        <br></br>
        <Button variant="primary" size="lg" type="submit">
          Log in
        </Button>
        <br></br>
      </form>
    </div>
  );
};

export default withRouter(Login);
