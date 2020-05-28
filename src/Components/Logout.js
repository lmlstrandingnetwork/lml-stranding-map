import React from "react";
import app from "../config/Fire";
import Button from 'react-bootstrap/Button'

const Logout = () => {
  return (
    <div>
      <button className="logOutButton" onClick={() => app.auth().signOut()}>Log out</button>
    </div>
  );
};

export default Logout;