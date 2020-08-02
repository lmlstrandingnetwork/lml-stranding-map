import React, { useContext, useState, useEffect } from "react";
import "./NavMenu.css";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../Auth";

//Uses bootstrap
//Be sure to have bootstrap installed
function NavMenu() {
  const userContext = useContext(AuthContext);
  const [loggedInAs, setLoggedInAs] = useState("");

  // Set current active user if logged in
  useEffect(() => {
    if (userContext.currentUser != null) {
      setLoggedInAs("Logged in as " + userContext.currentUser.email);
    } else {
      setLoggedInAs("");
    }
  }, [userContext.currentUser]);

  return (
    <div>
      <Navbar className="header" expand="lg">
        <Navbar.Brand href="/">
          <img
            src="../long-marine-stranding-program.png"
            alt="stranding logo"
            width="100"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Map</Nav.Link>
            <Nav.Link href="faq">FAQ</Nav.Link>
            <Nav.Link href="https://lmlstrandingnetwork.ucsc.edu/">
              Stranding Program
            </Nav.Link>
            <Nav.Link href="about">Team</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <p className="email">{loggedInAs}</p>
        <Navbar.Brand href="/">
          <Nav className="justify-content-end">
            <img
              src="../baskin-logo-banner-new.jpg"
              alt="baskin logo"
              width="115"
              height="20"
            />
          </Nav>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default NavMenu;
