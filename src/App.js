import React, { Component } from "react";
import "./App.css";
import Map from "./Components/Map";
import NavMenu from "./Components/NavMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import Heatmap from "./Components/Heatmap";

function App() {
  return (
    <div className="App">
      <NavMenu />
      <Heatmap />
    </div>
  );
}

export default App;
