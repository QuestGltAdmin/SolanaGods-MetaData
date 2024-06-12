import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Layout from "../Component/Loginheader";

export default function Otp_verification() {
  return (
    <>
      <Layout />
      <section className="signup-sec" id="sign_up">
        <Container>
          <Row>
            <Col lg={6} className="m-auto">
              <div className="outer-bg-signup">
                <h3> Verify Your Account </h3>
                <h5>
                  Enter your email address below. To activate your account.
                </h5>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <Form.Control type="email" placeholder="Email" />
                  </InputGroup>
                </Form.Group>

                <div>
                  <button className="common-btn w-100 m-0">
                    Re-send Verification Email{" "}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
