import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import OTPInput, { ResendOTP } from "otp-input-react";
import Layout from "../Component/Loginheader";
import { useLocation, useNavigate } from "react-router-dom";
import { encryptData } from "../helpers/encryption";
import axiosMain from "../http/axios/axios_main";
import { toast } from "react-toastify";

export default function VerifyOtpForgot() {
  //========================= Globle variable =========================//
  const navigate = useNavigate();
  const { state } = useLocation("/Forgot_password");
  const { email } = state || "";
  //========================= end of code =========================//

  //========================= Local varables =========================//
  const [otp, setOTP] = useState("");
  const [formError, setFormError] = useState("");
  const [disable, setDisable] = useState(false);
  const [disableReSend, setDisableReSend] = useState(false);
  const [seconds, setSeconds] = useState(120);
  //========================= end of code =========================//

  //========================= HandleSandOtp function =========================//
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      setDisable(true);
      setFormError("");
      const RowOtp = await encryptData(otp);
      const RowType = await encryptData("forgot");

      try {
        const api = await axiosMain.post("/verify-otp", {
          email: email,
          otp: RowOtp,
          type: RowType,
        });

        if (api.data.status) {
          setDisable(false);
          toast.success("OTP Verified Successfully.Please Reset Password.");
          setTimeout(() => {
            navigate("/reset-password", {
              state: {
                email: email,
              },
            });
          }, 3000);
        }
      } catch (error) {
        setDisable(false);
        toast.error(error.response.data.message);
      }
    } else {
      setDisable(false);
      setFormError("Please fill all the values");
    }
    function abc(event) {
      if (event == "Enter") {
        handleSendOtp();
      }
    }

    abc();
  };
  //========================= end of code =========================//

  //========================= Otp Re-send =========================//
  const HandleReSend = async () => {
    setDisableReSend(true);
    try {
      const res = await axiosMain.post("/resend-otp", {
        email: email,
      });
      if (res?.data?.status) {
        setDisableReSend(false);
        toast.success("Otp Re-Send successful");
        setSeconds(120);
      }
    } catch (error) {
      setDisableReSend(false);
      toast.success(error.response.data.message);
    }
  };
  //========================= end of code =========================//

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <Layout />
      <section className="signup-sec" id="sign_up">
        <Container>
          <Row>
            <Col lg={6} className="m-auto">
              <div className="outer-bg-signup">
                <h3> Verify Your OTP </h3>
                <h5>Enter your OTP below.</h5>
                <Form onSubmit={handleSendOtp}>
                  <Form.Group className="mb-3">
                    <Form.Label>OTP</Form.Label>

                    <OTPInput
                      value={otp}
                      onChange={setOTP}
                      autoFocus
                      className="otp_box"
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      // secure
                      name="otp"
                    />
                  </Form.Group>
                  <p className="error-msg">{formError}</p>
                  <div>
                    <button
                      type="submit"
                      className="common-btn w-100 m-0"
                      // onClick={() => {
                      //   handleSendOtp();
                      // }}
                      disabled={disable}
                    >
                      {disable ? "Processing" : "Submit"}
                    </button>
                  </div>
                  {seconds <= 0 ? (
                    <h5
                      className="mt-3"
                      onClick={() => {
                        HandleReSend();
                      }}
                    >
                      {disableReSend ? "processing" : "Re-send"}
                    </h5>
                  ) : (
                    <h5 className="mt-3">
                      OTP expires in: {formatTime(seconds)}
                    </h5>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
