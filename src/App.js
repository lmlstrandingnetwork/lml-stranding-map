import React from "react";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import About from "./Components/About";
import Faq from "./Components/faq";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Signup from "./Components/Signup";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./Auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavMenu />
        <Router>
          <Route path="/" exact component={Filter} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/signup" exact component={Signup} />
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
