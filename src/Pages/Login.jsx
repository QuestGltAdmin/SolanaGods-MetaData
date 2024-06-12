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
import { userLoginSaga } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { encryptData } from "../helpers/encryption";
import { toast } from "react-toastify";
import axiosMain from "../http/axios/axios_main";

export default function Sign_in() {
  //======================== Globle variable =========================//
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //========================= End of code =========================//

  //======================== Local variable =========================//
  const [formError, setFormError] = useState("");
  const [inputdata, setInputdata] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const [eyeShow, setEyeShow] = useState(false);
  //========================= End of code =========================//

  //======================== HandleLogin Data function =========================/

  const HandelData = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  const HandleData = async (e) => {
    e.preventDefault();
    let nameregex = new RegExp("^[a-zA-Z_ ]{1,36}$");
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (!inputdata.email) {
      setFormError("Please enter valid email");
    } else if (!inputdata.password) {
      setFormError("Please enter your password");
    } else {
      setDisable(true);
      setFormError("");
      const RowEmail = await encryptData(inputdata.email);
      const RowPassword = await encryptData(inputdata.password);
      const payload = {
        email: RowEmail,
        password: RowPassword,
      };
      try {
        // const api = await axiosMain.post("/login", payload);

        // if (api.data.status) {
        setDisable(false);
        // toast.success("please verify otp!");
        // setTimeout(() => {
        //   navigate("/Otp_verification", {
        //     state: { email: RowEmail, type: "user" },
        //   });
        // }, 3000);
        // dispatch(userLoginSaga({ payload, navigate, setDisable }));
        dispatch(userLoginSaga({ payload, navigate, setDisable }));
        setInputdata({
          email: "",
          password: "",
        });
      } catch (error) {
        setDisable(false);
        toast.error(error.response.data.message);
      }
    }
    function abc(event) {
      if (event == "Enter") {
        HandleData();
      }
    }

    abc();
  };
  //========================= end of code =========================//
  return (
    <>
      <Layout />
      <section className="signup-sec">
        <Container>
          <Row>
            <Col lg={6} className="m-auto">
              <div className="outer-bg-signup">
                <h3> Welcome </h3>
                <h5>Please login to continue </h5>
                <Form onSubmit={HandleData}>
                  <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={HandelData}
                        value={inputdata.email}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type={eyeShow ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        onChange={HandelData}
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
                      {disable ? "Processing" : "Login"}
                    </button>
                  </div>

                  <div className="outer-forgot-pass-link">
                    <Link to="/Forgot_password" className="forgot-link">
                      Forgot Password?
                    </Link>
                    <p className="dont-have-acc">
                      Don't have an account?{" "}
                      <Link to="/Register">Register</Link>
                    </p>
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
