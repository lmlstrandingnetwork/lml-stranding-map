import React from "react";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavMenu />
      <Filter />
      <Footer />
    </div>
  );
}

export default App;
