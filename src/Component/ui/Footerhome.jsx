import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footerhome = () => {
  return (
    <>
      <footer className="footer-box-main">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="footer-logo-box">
                <img
                  src="assets/Compress-img/SolanaGods_Footer.webp"
                  className="logo"
                  loading="lazy"
                  alt="Img"
                />
                <div className="social-link">
                  {/* <Link
                    to={"https://www.facebook.com/SolanaGods/"}
                    target="_blank"
                  >
                    <img
                      src="assets/Compress-img/social1.webp"
                      loading="lazy"
                      alt="Img"
                    />
                  </Link> */}
                  <Link
                    to="https://www.instagram.com/solanagods__/"
                    target="_blank"
                  >
                    <img
                      src="assets/Compress-img/social2.webp"
                      loading="lazy"
                      alt="Img"
                    />
                  </Link>
                  <Link
                    to="https://www.youtube.com/@SolanaGods"
                    target="_blank"
                  >
                    <img
                      src="assets/Compress-img/social3.webp"
                      loading="lazy"
                      alt="Img"
                    />
                  </Link>
                  <Link to="https://twitter.com/SolanaGods__" target="_blank">
                    <img
                      src="assets/Compress-img/social4.webp"
                      loading="lazy"
                      alt="Img"
                    />
                  </Link>
                  <Link
                    to="https://www.linkedin.com/showcase/solanagods/"
                    target="_blank"
                  >
                    <img
                      src="assets/Compress-img/social5.webp"
                      loading="lazy"
                      alt="Img"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="quick-link">
                <h4>Quick Link</h4>
                <ul>
                  <li>
                    <a href="/#home">HOME</a>
                  </li>
                  <li>
                    <a href="/#about">ABOUT</a>
                  </li>
                  <li>
                    <a href="/#roadmap">ROADMAP</a>
                  </li>
                  <li>
                    <a
                      href=""
                      onClick={() => {
                        window.open(
                          // "https://solgods.gitbook.io/solana-gods-white-paper/",
                          "/assets/PDF/SolgodPDF.pdf",
                          "_blank"
                        );
                      }}
                    >
                      GODSPAPER
                    </a>
                  </li>
                  <li>
                    <a href="/airdrop">AIRDROP</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="quick-link">
                <h4>Resources</h4>
                <ul>
                  <li>
                    <a href="/privacy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          <p>©2024 SOLGODS. All rights reserved</p>
        </Container>
      </footer>
    </>
  );
};
