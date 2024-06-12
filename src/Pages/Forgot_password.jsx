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
import { useNavigate } from "react-router-dom";
import { encryptData } from "../helpers/encryption";
import axiosMain from "../http/axios/axios_main";
import { toast } from "react-toastify";

export default function Forgot_password() {
  //====================== Global varable ========================//
  const navigate = useNavigate();
  //====================== end of code ========================//

  //====================== Local varable ========================//
  const [inputdata, setInputdata] = useState({
    email: "",
  });
  const [disable, setDisable] = useState(false);
  const [formError, setFormError] = useState("");
  //====================== end of code ========================//

  //====================== HandleData function ========================//
  const formData = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  const HandelData = async (e) => {
    e.preventDefault();
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(inputdata.email)) {
      setFormError("Please enter valid email");
    } else {
      setDisable(true);
      setFormError("");
      const RowEmail = await encryptData(inputdata.email);
      try {
        const api = await axiosMain.post("/forgot-password", {
          email: RowEmail,
        });
        if (api.data.status) {
          setDisable(false);
          toast.success("Please verify your otp");
          setTimeout(() => {
            navigate("/verify_otp_forgot", { state: { email: RowEmail } });
          }, 3000);
        }
      } catch (error) {
        setDisable(false);
        toast.error(error.response.data.message);
      }
    }
    function abc(event) {
      if (event == "Enter") {
        HandelData();
      }
    }

    abc();
  };
  //====================== end of code ========================//
  return (
    <>
      <Layout />
      <section className="signup-sec" id="sign_up">
        <Container>
          <Row>
            <Col lg={6} className="m-auto">
              <div className="outer-bg-signup">
                <h3> Reset Your Password </h3>
                <h5>Enter your email address below.</h5>
                <Form onSubmit={HandelData}>
                  <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={formData}
                        value={inputdata.email}
                      />
                    </InputGroup>
                  </Form.Group>
                  <p className="error-msg">{formError}</p>
                  <div>
                    <button
                      type="submit"
                      className="common-btn w-100 m-0"
                      // onClick={() => {
                      //   HandelData();
                      // }}
                      disabled={disable}
                    >
                      {disable ? "Processing" : "Submit"}
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
