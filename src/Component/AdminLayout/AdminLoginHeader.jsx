import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Col,
  Row,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminLoginHeader() {
  return (
    <>
      <header className="main-header login-header-home login-without-scroll">
        <Navbar className="" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img src="assets/Compress-img/updated-logo.webp" />
            </Navbar.Brand>

            {/* <div>
              <Link className="common-btn" to="/">
                Login
              </Link>
              <Link className="common-btn" to="/Register">
                Register
              </Link>
            </div> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Container>
        </Navbar>
      </header>
    </>
  );
}
