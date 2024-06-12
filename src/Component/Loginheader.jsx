import React, { useEffect } from "react";
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

export default function Header() {
  const controlNavbar = () => {
    if (window.scrollY) {
      document.getElementById("headerId").classList.add("darker-header");
      //   HandleClass12();
    }
    if (window.scrollY == 0) {
      document.getElementById("headerId").classList.remove("darker-header");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      <header
        className="main-header login-header-home login-without-scroll"
        id="headerId"
      >
        <Navbar className="" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img src="assets/Compress-img/updated-logo.webp" />
            </Navbar.Brand>

            {/* <Nav className="ms-auto justify-content-end">
              <Link className="buy-btn" to="/Login">
                Login
              </Link> 
              <Link className="gray-btn" to="/Register">
                Register
              </Link>
            </Nav> */}

            <div></div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
