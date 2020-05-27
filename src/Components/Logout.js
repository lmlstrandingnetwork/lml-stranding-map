import React from "react";
import app from "../config/Fire";

const Home = () => {
  return (
    <>
      <h1>Log out</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Home;