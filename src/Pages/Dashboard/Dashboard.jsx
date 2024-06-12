import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap-v5";
import { Modal } from "react-bootstrap";
import Layout from "../../Component/Layout";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { addreshCheck } from "../../helperSolana/addressChecker";
import { encryptData } from "../../helpers/encryption";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState(0);
  const [totalReferralAmount, setTotalReferralAmount] = useState(0);
  const [totalPurchasedAmount, setTotalPurchasedAmount] = useState(0);
  const [copy, setCopy] = useState(false);
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const [disable, setDisable] = useState(false);
  const [formError, setFormError] = useState("");

  const handleModelWallet = () => {
    setShowWalletAddress(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const getData = await axiosMain.get("/user/user-dashboard", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token}`,
        },
      });
      if (getData?.data?.status) {
        // setShowData(getData?.data?.data);
        setTotalPurchasedAmount(getData?.data?.data?.totalPurchaseAmount);
        setTotalWithdrawalAmount(getData?.data?.data?.totalWithdrawalAmount);
        setTotalReferralAmount(getData?.data?.data?.totalReferralAmount);
      }
    } catch (err) {}
  };

  const HandleData = async () => {
    const checkAddress = await addreshCheck(walletAddress);
    if (!checkAddress) {
      setFormError("Please enter valid wallet address");
    } else {
      setFormError("");
      setDisable(true);
      const RowWalletAddress = await encryptData(walletAddress);
      const payload = {
        solana_wallet: RowWalletAddress,
      };
      try {
        const sendData = await axiosMain.post(
          "/user/update-solana-wallet",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (sendData?.data?.status) {
          toast.success("Wallet updated successfully");
          setWalletAddress("");
          handleModelWallet();
          setDisable(false);
        }
      } catch (err) {
        toast.error(err.response.data.message);
        setDisable(false);
      }
    }
  };

  const HandleAddSolanaWallet = async () => {
    if (user.solanaWallet) {
      toast.warn("Wallet Address Already Updated");
    } else {
      setShowWalletAddress(true);
    }
  };
  return (
    <>
      <Layout>
        <section className="outer-dash-section">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <div className="w-100">
                    <h2 className="inner-page-heading">Dashboard</h2>
                    <Row>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <p>Total Token Purchased</p>
                          <h4>
                            <span>SGODS </span>
                            {totalPurchasedAmount !== 0
                              ? (totalPurchasedAmount * 1).toFixed(4)
                              : "0.0000"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <p>Total Referral Amount</p>
                          <div className="d-flex justify-content-between align-items-end">
                            <h4>
                              <span>SGODS </span>
                              {totalReferralAmount !== 0
                                ? (totalReferralAmount * 1).toFixed(4)
                                : "0.0000"}
                            </h4>
                            <button
                              className="common-btn dash"
                              onClick={() => {
                                HandleAddSolanaWallet();
                              }}
                            >
                              Add Solana Wallet
                            </button>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <p>Total SGODS Received</p>
                          <h4>
                            <span>SGODS </span>
                            0
                            {/* {totalPurchasedAmount !== 0
                              ? (totalPurchasedAmount * 1).toFixed(4)
                              : "0.0000"} */}
                          </h4>
                        </div>
                      </Col>
                      {/* <Col lg={3} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash">
                          <p>ETH</p>

                          <h4>ETH 0.00</h4>
                        </div>
                      </Col> */}
                    </Row>
                    {/* <Row className="mt-3">
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="d-flex justify-content-center"
                      >
                        <button
                          className="common-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `https://app.mebe.world/Register?ref=${user.referral_code}`
                            );
                            setCopy(true);
                            setTimeout(() => {
                              setCopy(false);
                            }, [2500]);
                          }}
                        >
                          {" "}
                          {copy === true ? "Copied" : "Copy referral link"}
                        </button>
                      </Col>
                    </Row> */}
                  </div>
                </div>
              </Col>
            </Row>
            <Modal
              show={showWalletAddress}
              onHide={handleModelWallet}
              centered
              className="transaction-proceed-modal"
              backdrop="static"
            >
              <Modal.Header closeButton={handleModelWallet}></Modal.Header>
              <Modal.Body>
                <div className="heading-box">
                  <h4>Please Add Your Solana Wallet here</h4>
                </div>

                <Row>
                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="wallet Address"
                        name="walletAddress"
                        onChange={(e) => {
                          setWalletAddress(e.target.value);
                        }}
                        value={walletAddress}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <p className="error-msg">{formError}</p>
                    <div className="text-center">
                      <button
                        className="common-btn  m-0"
                        onClick={() => {
                          HandleData();
                        }}
                        disabled={disable}
                      >
                        {disable ? "Processing" : "Submit"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default Dashboard;
