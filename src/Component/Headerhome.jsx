import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { logout } from "../store/reducers/authReducer";

export const Headerhome = () => {
  const { user, isUserAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const HandleLogout = async () => {
    toast.success("Logged Out Successfully!");
    navigate("/", { replace: true });
    dispatch(logout());
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener(
        "scroll",

        controlNavbar
      );
    };
  }, []);

  return (
    <>
      <header className="header-main-home" id="headerId">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/#home">HOME</Nav.Link>
                <Nav.Link href="/#about">ABOUT</Nav.Link>
                <Nav.Link href="/#roadmap">ROADMAP</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    window.open(
                      // "https://solgods.gitbook.io/solana-gods-white-paper/",
                      "/assets/PDF/SolgodPDF.pdf",
                      "_blank"
                    );
                  }}
                >
                  GODSPAPER
                </Nav.Link>
                <Nav.Link href="/airdrop">AIRDROP</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Brand href="#home">
              <img
                src="assets/Compress-img/updated-logo.webp"
                loading="lazy"
                alt="Img"
              />
            </Navbar.Brand>
            <Nav className="ms-auto justify-content-end">
              <a
                href="https://t.me/solgods"
                target="_blank"
                class="connect-telegram-btn"
              >
                <img
                  src="assets/Compress-img/telegram.webp"
                  loading="lazy"
                  alt="Img"
                />
                Connect on Telegram
              </a>

              {!isUserAuthenticated ? (
                <Nav.Link
                  onClick={() => {
                    navigate("/Login");
                  }}
                  className="buy-btn"
                >
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link
                  onClick={() => {
                    navigate("/Buycoin");
                  }}
                  className="buy-btn"
                >
                  Buy Now
                </Nav.Link>
              )}
              {!isUserAuthenticated ? (
                <Nav.Link
                  onClick={() => {
                    navigate("/Register");
                  }}
                  className="gray-btn"
                >
                  Sign Up
                </Nav.Link>
              ) : (
                <></>
              )}
              {isUserAuthenticated ? (
                <Nav.Link
                  onClick={() => {
                    HandleLogout();
                  }}
                  className="gray-btn"
                >
                  <i className="fa fa-sign-out"></i> Logout
                </Nav.Link>
              ) : (
                <></>
              )}
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Container>
        </Navbar>
      </header>
    </>
  );
};
