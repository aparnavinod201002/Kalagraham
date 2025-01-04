import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header4() {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-light shadow-sm"
        style={{ padding: "10px 20px" }}
      >
        <Container>
          {/* Brand Section */}
          <Navbar.Brand className="d-flex align-items-center">
            <Link
              to="/"
              style={{
                textDecoration: "none",
               
                fontWeight: "bold",
                fontSize: "24px",
              }} className="text-primary"
            >
              Kalagraham
            </Link>
          </Navbar.Brand>

          {/* Registration Links on Right */}
          <Nav className="ms-auto d-flex align-items-center">
            <Link
              to="/UserReg"
              className="btn btn-primary me-3 px-4 fw-bold"
              style={{
                textDecoration: "none",
                width: "150px",
                textAlign: "center",
              }}
            >
              User Registration
            </Link>
            <Link
              to="/ArtistReg"
              className="btn btn-primary px-4 fw-bold"
              style={{
                textDecoration: "none",
                width: "150px",
                textAlign: "center",
              }}
            >
              Artist Registration
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header4;
