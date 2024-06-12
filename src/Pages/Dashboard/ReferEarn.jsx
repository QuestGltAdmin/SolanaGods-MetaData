import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap-v5";
import { toast } from "react-toastify";
import Layout from "../../Component/Layout";
import { encryptData } from "../../helpers/encryption";
import { addreshCheck } from "../../helperSolana/addressChecker";
import useAuth from "../../hooks/useAuth";
import axiosMain from "../../http/axios/axios_main";
import ReferralShareButton from "./ReferralShareButton";

const ReferEarn = () => {
  const { user, WalletSOL } = useAuth();
  const referralLink = `https://solanagods.com/Register?ref=${user.referral_code}`;
  const [copy, setCopy] = useState(false);
  const [totalReferralAmount, setTotalReferralAmount] = useState(0);
  const [showWalletAddressModal, setShowWalletAddressModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [disable, setDisable] = useState(false);
  const [formError, setFormError] = useState("");

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

  const handleModelWallet = () => {
    setShowWalletAddressModal(false);
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
          // localStorage.setItem(
          //   "userData",
          //   JSON.stringify(sendData.data)
          // );
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
      setShowWalletAddressModal(true);
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
                    <h2 className="inner-page-heading d-flex align-items-center justify-content-between">
                      Refer and Earn
                      <button
                        className="common-btn"
                        onClick={() => {
                          HandleAddSolanaWallet();
                        }}
                      >
                        Add Solana Wallet
                      </button>
                    </h2>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <div className="shadow-box-dash referal-box">
                          <div className="d-flex justify-content-between align-items-center mb-3 refer-and-earn">
                            <h4 className="mt-0">
                              Refer and Earn 5% in SGODS Tokens
                            </h4>
                            <div className="referal-with-btn">
                              <button
                                className="common-btn d-flex align-items-baseline justify-content-between"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `https://solanagods.com/Register?ref=${user.referral_code}`
                                  );
                                  setCopy(true);
                                  setTimeout(() => {
                                    setCopy(false);
                                  }, [2500]);
                                }}
                              >
                                {" "}
                                {copy === true
                                  ? "Copied"
                                  : `${user?.referral_code}`}{" "}
                                {copy === true ? (
                                  <i
                                    class="fa fa-check m-2"
                                    aria-hidden="true"
                                  ></i>
                                ) : (
                                  <i
                                    class="fa fa-clone m-2"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              </button>
                              <div className="refferal-share-icon">
                                <ReferralShareButton
                                  referralLink={referralLink}
                                />
                              </div>
                            </div>
                          </div>
                          <p>
                            <b>Step 1: Obtaining Your Referral Link</b>{" "}
                          </p>
                          <p>
                            <b>Log into Your Account:</b> Access your SGODS
                            token platform account. Register and log in to
                            participate in the referral program.{" "}
                          </p>
                          <p>
                            {" "}
                            <b> Discover the Referral Section:</b> Find the
                            referral program on the dashboard or menu to access
                            the referral link.
                          </p>
                          <p>
                            <b>Copy Your Referral Link:</b> After that, click
                            the referral link to copy your unique referral link
                            to your clipboard.
                          </p>{" "}
                          <br />
                          <p>
                            {" "}
                            <b>Step 2: Sharing Your Referral Link </b>
                          </p>{" "}
                          <p>
                            <b> Choose Your Platform:</b> Share your referral
                            link on WhatsApp, Telegram and other social media
                            platforms. Explain the benefits of the SGODS token
                            pre-sale and how using the referral link can benefit
                            both you and the referred companion.
                          </p>{" "}
                          <br />
                          <p>
                            {" "}
                            <b>Step 3: Earning Rewards </b>{" "}
                          </p>{" "}
                          <p>
                            {" "}
                            <b>Registration by Referred Individuals:</b> After
                            that, they should be directed to the registration
                            page and to be eligible for rewards they must
                            complete the registration process.{" "}
                          </p>
                          <p>
                            {" "}
                            <b> Purchase of SGODS Tokens:</b>After registration,
                            individuals must buy SGODS tokens. And you both
                            referrer and referral receive the reward.{" "}
                          </p>
                          <p>
                            {" "}
                            <b> Claiming Your Rewards:</b> Once you buy it
                            successfully, you both will receive a reward
                            equivalent to 5% of your total purchase amount in
                            SGODS tokens. This will automatically credited to
                            your account.
                          </p>{" "}
                          <br />
                          <p>
                            {" "}
                            <b>Step 4: Token Rewards Claim </b>
                          </p>
                          <p>
                            <b> Token Listing Day:</b> Claiming the sold or the
                            referred rewards is possible. Stay alert to the
                            dashboard and social media accounts for the posting
                            date and time.
                          </p>
                          <p>
                            {" "}
                            <b> Note:</b> Both referrers and referrals get 5% in
                            SGODS tokens. This is a one-time referral. Join this
                            and get the chance to earn!
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Modal
              show={showWalletAddressModal}
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

export default ReferEarn;
