import React from "react";
import "./App.css";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavMenu />
      <Filter />
    </div>
  );
}

export default App;
