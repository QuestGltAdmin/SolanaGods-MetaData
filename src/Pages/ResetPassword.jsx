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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { encryptData } from "../helpers/encryption";
import axiosMain from "../http/axios/axios_main";
import { toast } from "react-toastify";

export default function ResetPassword() {
  //========================= Globle variable =========================//
  const { state } = useLocation("/verify-forgot-otp");
  const { email } = state || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //========================= end of code =========================//

  //========================= Local Variable =========================//
  const [formError, setFormError] = useState("");
  const [inputdata, setInputdata] = useState({
    password: "",
    confirm_password: "",
  });
  const [disable, setDisable] = useState(false);

  const [eyeShow, setEyeShow] = useState(false);
  const [eyeShow1, setEyeShow1] = useState(false);
  //========================= end of code =========================//

  //========================= FormData =========================//
  const formdata = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };
  //========================= end of code =========================//

  //========================= HandleData code =========================//
  const HandleData = async (e) => {
    e.preventDefault();
    let passregex = new RegExp("^(?=.*[A-Z])(?=.{6,})");

    if (!passregex.test(inputdata.password)) {
      setFormError(
        "Password must contain 1 Uppercase character . Length must be greater than or equal to 6 digit"
      );
    } else if (inputdata.password !== inputdata.confirm_password) {
      setFormError("New password does not match to confirm password");
    } else {
      setDisable(true);
      setFormError("");
      const RowPassword = await encryptData(inputdata.password);
      const payload = {
        email: email,
        password: RowPassword,
      };
      try {
        const api = await axiosMain.post("/reset-password", payload);
        if (api.data.status) {
          setDisable(false);
          toast.success("Password changed successfully");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setDisable(false);
          toast.error(api.data.message);
        }
      } catch (error) {
        setDisable(false);
      }
    }
    function abc(event) {
      if (event == "Enter") {
        handleSendOtp();
      }
    }

    abc();
  };
  //========================= end of code =========================//

  return (
    <>
      <Layout />
      <section className="signup-sec" id="sign_up">
        <Container>
          <Row>
            <Col lg={6} className="m-auto">
              <div className="outer-bg-signup">
                <h3> Reset Your Password</h3>
                <h5>Enter your new password below. To update.</h5>
                <Form onSubmit={HandleData}>
                  <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type={eyeShow ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        onChange={formdata}
                        value={inputdata.password}
                      />
                      <InputGroup.Text
                        onClick={() => {
                          setEyeShow(!eyeShow);
                        }}
                      >
                        {eyeShow ? (
                          <i class="fa fa-eye"></i>
                        ) : (
                          <i class="fa fa-eye-slash"></i>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type={eyeShow1 ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirm_password"
                        onChange={formdata}
                        value={inputdata.confirm_password}
                      />
                      <InputGroup.Text
                        onClick={() => {
                          setEyeShow1(!eyeShow1);
                        }}
                      >
                        {eyeShow1 ? (
                          <i class="fa fa-eye"></i>
                        ) : (
                          <i class="fa fa-eye-slash"></i>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <p className="error-msg">{formError}</p>
                  <div>
                    <button
                      type="submit"
                      className="common-btn w-100 m-0"
                      // onClick={() => {
                      //   HandleData();
                      // }}
                      disabled={disable}
                    >
                      {disable ? "Processing" : "Reset password"}{" "}
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
