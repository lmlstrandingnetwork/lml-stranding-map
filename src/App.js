import React from "react";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import About from "./Components/About";
import Faq from "./Components/faq";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
// import Team from "./Components/Team";
import Footer from "./Components/Footer";
import CaseStudyPage from "./Components/CaseStudyPage";
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
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/about" exact component={About} />
          <Route
            exact path="/stranding/:databaseid"
            render={(props) =>
              <CaseStudyPage databaseid={props.match.params.databaseid}
                {...props} />}
          />
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
