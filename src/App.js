import React from "react";
import "./App.css";
import Map from "./Components/Map";
import Header from "./Components/Header";
//import { ReactComponent } from "*.svg";

//you dont need to type myinfo.js since it is default file for import

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <Map />
    </div>
  );
}

export default App;
