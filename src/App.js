import React from "react";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//comment
function App() {
  return (
    <div className="App">


      
      

      <Router>


      <Route path="/" exact render={
		()=>{
			return (
			<div>
		
  <NavMenu />
      <Filter />
      <Footer />
      
			</div>
			)
		}
	}/>
      <Route path="/FAQ" exact render={
		()=>{
			return (
			<div>
			
	<h1> hi</h1>
			
			</div>
			)
		}
	}/>
        </Router>
    </div>
  );
}
//SWA-65
//
export default App;
