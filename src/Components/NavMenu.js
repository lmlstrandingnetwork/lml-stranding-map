import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import "./NavMenu.css";

//Uses bootstrap
//Be sure to have bootstrap installed
function NavMenu() {
  return (
    <div>
      <Navbar className="header" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src="../long-marine-stranding-program.png"
            alt="stranding logo"
            width="100"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
            <Nav.Link href="#home" >About</Nav.Link>
            <Nav.Link href="#home" >FAQ</Nav.Link>
            <Nav.Link href="https://lmlstrandingnetwork.ucsc.edu/" >
              Stranding Program
            </Nav.Link>
            <Nav.Link href="#home" >About The Developers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand href="#home">
            <Nav className="justify-content-end">
            <img
            src="../baskin-logo-banner-new.jpg"
            alt="baskin logo"
            width="230"
            height="40"
          />
          </Nav>
          </Navbar.Brand>
          
      </Navbar>
    </div>
  );
}

export default NavMenu;
