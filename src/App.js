import React, { Component } from "react";
import "./App.css";
import Map from "./Components/Map";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import Heatmap from "./Components/Heatmap";

function App() {
  return (
    <div className="App">
      <Filter />
    </div>
  );
}

export default App;
