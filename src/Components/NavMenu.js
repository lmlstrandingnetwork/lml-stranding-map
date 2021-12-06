import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import app from "../config/Fire";
import { AuthContext } from "../Auth";
import "./NavMenu.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <Nav.Link href="/faq">FAQ</Nav.Link>
            <Nav.Link
              href="https://lmlstrandingnetwork.ucsc.edu/"
              target="_blank"
            >
              Stranding Program
            </Nav.Link>
            <Nav.Link href="/about">Team</Nav.Link>
            {userContext.currentUser ? (
              <Nav.Link className="/logout" onClick={() => app.auth().signOut()}>
                Log Out
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <p className="email">{loggedInAs}</p>
        <Navbar.Brand
          href="https://engineering.ucsc.edu/"
          target="_blank"
        >
          <Nav className="justify-content-end">
            <img
              src="../baskin-logo-banner-2021.png"
              alt="baskin logo"
              width="120"
              height="30"
            />
          </Nav>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default NavMenu;
