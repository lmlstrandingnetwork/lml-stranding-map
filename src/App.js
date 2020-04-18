import React, { Component } from "react";
import "./App.css";
import Map from "./Components/Map";
import NavMenu from "./Components/NavMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import Heatmap from "./Components/Heatmap"

//you dont need to type myinfo.js since it is default file for import

function App() {
  return (
    <div className="App">
      <NavMenu />
       
     <Heatmap />
    </div> //MHM 
  );
}

export default App;
