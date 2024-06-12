import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Col, Container, Row, Form, Modal } from "react-bootstrap-v5";
import Layout from "../../Component/Layout";
import Tokens from "../../JSON/TokenListMainnetManual.json";
import useAuth from "../../hooks/useAuth";
import { ReConnect } from "../../helpers/Connect";
import { setEVMWallet } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import ConnectWalletModal from "../../Component/ui/ConnectWalletModal";
import { getCoinBalance } from "../../helpers/getethBalance";
import { _switchNetwork } from "../../helpers/web3Model";
import { commonSwitch } from "../../helpers/ChainSwitch";
import { toast } from "react-toastify";
import {
  getDollarPrice,
  getDollarPriceMatic,
} from "../../helpers/getPriceIndollars";
import { encryptData } from "../../helpers/encryption";
import axiosMain from "../../http/axios/axios_main";
import { useNavigate } from "react-router-dom";
import { addreshCheck } from "../../helperSolana/addressChecker";
import { getBalanceSOL } from "../../helperSolana/getSolanaBalance";
import { handleSignAndSendTransactionV0 } from "../../helperSolana/transferVersion";
import { InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getUsdtBalance } from "../../helpers/getUSDTBalance";
import { BuyFromUSDT } from "../../helpers/buyUSDT";
import CheckWallet from "../../helpers/checkWalletHelper";
import {
  verifyTrxManual,
  verifyTrxUSDTManual,
} from "../../helpers/trxVerifyManual";
import { getRemainingTimeUntilMsTimestamp } from "../../helpers/Timer";

export const BuycoinManual = () => {
  const [endTime, setEndTime] = useState(1717761598)

  useEffect(() => {
    const dateString1 = new Date();
    const date1 = new Date(dateString1);
    let timestamp1 = date1.getTime();
    timestamp1 = timestamp1 / 1000;
    setCurrentTimeStamp(parseInt(timestamp1));
    if(timestamp1 < endTime){
      setShowTimer(true);
    }
  }, []);
  //===============================Global Variable===============================//
  const { user, WalletEVM, WalletSOL } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //===============================End Of Code===============================//

  //===============================Local Variable===============================//
  const [from, setFrom] = useState({
    name: "Binance",
    symbol: "BNB",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 56,
    decimals: 18,
    logos: "assets/Compress-img/bnb.webp",
  });
  const [address, setAddress] = useState("");
  const [PaymentAddress, setPaymentAddress] = useState("");
  const [amountFrom, setAmountFrom] = useState(0);
  const [solgodsPrice, setSolgodsPrice] = useState(0.000555);
  const [amountTo, setAmountTo] = useState(0);
  const [balanceFrom, setBalanceFrom] = useState(0);
  const [to, setTo] = useState("SGODS");
  const [show, setShow] = useState(false);
  const [forMobileView, setForMobileView] = useState(
    window.innerWidth < 992 ? true : false
  );
  const [walletAddress, setWalletAddress] = useState("");
  const [showEVMToSOLGODS, setShowEVMToSOLGODS] = useState(false);
  const [disable, setDisable] = useState(false);
  const [switchForWallet, setSwitchForWallet] = useState("EVM");
  const [ownerAddress, setOwnerAddress] = useState(
    "0x89C7aCEc5d41820bC7611B71B103bfCfe70f7CBc"
  );
  const [solOwnerAddress, setSolOwnerAddress] = useState(
    "3Fk3nWkomhQmkLtMMr8HYPWSw9U5TZYGTbhouAERTEQb"
  );
  const [tronOwnerAddress, setTronOwnerAddress] = useState(
    "TUesvb4DpA43RYRMwWCtmomUHUG2iEZKVR"
  );
  const [usdPrice, setUsdPrice] = useState(0);
  const [copy, setCopy] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [stateForId, setStateForId] = useState("");
  const [checkForHashData, setCheckForHashData] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

  //===============================End Of Code===============================//
  const handleClose = useCallback((e) => {
    setShow(false);
  });

  const handleEVMToSOLGODS = () => {
    setShowEVMToSOLGODS(false);
  };

  //===============================Connect Wallet model props==================================//
  const ConnectWalletModalProps = useMemo(() => ({
    modalProps: {
      show: show,
      onHide: handleClose,
    },
    chainData: switchForWallet === "EVM" ? "EVM" : "SOL",
    forMobileView,
  }));
  //===============================End Of Code==================================//

  //===============================Get Wallet Address==================================//
  const getWalletAddress = async () => {
    const walletAcc = await ReConnect(WalletEVM.type);
    if (WalletEVM.type === "walletConnect") {
      document.addEventListener("ACCOUNT_CONNECTED", (e) => {
        if (e.detail) {
          dispatch(setEVMWallet(e.detail));
        }
      });
      document.addEventListener("SELECT_WALLET", (e) => {
        if (e.detail) {
          dispatch(setEVMWallet(e.detail));
        }
      });
      document.addEventListener("MODAL_CLOSE", (e) => {
        if (e.detail) {
          dispatch(setEVMWallet(e.detail));
        }
      });
      document.addEventListener("CONNECT_SUCCESS", (e) => {
        if (e.detail) {
          dispatch(setEVMWallet(e.detail));
        }
      });
      // dispatch(setEVMWallet(walletAcc));
    } else {
      dispatch(setEVMWallet(walletAcc));
    }
  };

  useEffect(() => {
    if (WalletEVM) {
      let objData = localStorage.getItem("WalletEVM");
      if (objData !== "undefined") {
        objData = JSON.parse(objData);
        setWalletAddress(objData?.selectedAccount);
      }
    }
  }, [WalletEVM]);

  useEffect(() => {
    if (walletAddress) {
      getWalletAddress();
    }
  }, [walletAddress, from?.symbol]);
  //===============================End Of Code==================================//

  useEffect(() => {
    getBalanceFrom();
  }, [from, WalletSOL?.selectedAccount, WalletEVM?.selectedAccount]);

  const getBalanceFrom = async () => {
    setBalanceFrom(0);
    const payload = {
      address: WalletEVM?.selectedAccount,
      chainId: from?.chainId,
    };
    const payloadUSDT = {
      address: WalletEVM?.selectedAccount,
      chainId: from?.chainId,
      symbol: from?.symbol,
    };
    try {
      if (
        from?.symbol === "USDT (BNB)" ||
        from?.symbol === "USDT (ETH)" ||
        from?.symbol === "USDT (MATIC)"
      ) {
        if (WalletEVM?.selectedAccount) {
          let balanceData = await getUsdtBalance(payloadUSDT);
          balanceData = balanceData / 1e18;
          setBalanceFrom(balanceData);
        }
      } else if (from?.symbol === "SOL") {
        if (WalletSOL?.selectedAccount) {
          let balanceData = await getBalanceSOL(WalletSOL?.selectedAccount);
          setBalanceFrom(balanceData);
        }
      } else {
        if (WalletEVM?.selectedAccount) {
          let balanceData = await getCoinBalance(payload);
          balanceData = balanceData / 1e18;
          setBalanceFrom(balanceData);
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    getToBalance();
  }, [amountFrom, from, WalletEVM?.selectedAccount]);

  useEffect(() => {
    if (WalletEVM?.selectedAccount) {
      setPaymentAddress(WalletEVM?.selectedAccount);
    }
  }, [WalletEVM?.selectedAccount]);

  const getToBalance = async () => {
    try {
      // let getAmtTo ;
      if (from?.symbol === "MATIC") {
        const getAmtToMatic = await getDollarPriceMatic();
        const finalAmtMatic = (amountFrom * getAmtToMatic) / solgodsPrice;
        setUsdPrice(amountFrom * getAmtToMatic);
        setAmountTo(finalAmtMatic);
      } else if (
        from?.symbol === "USDT (BNB)" ||
        from?.symbol === "USDT (ETH)" ||
        from?.symbol === "USDT (MATIC)" ||
        from?.symbol === "USDT (TRON)"
      ) {
        const getUSDTAmt = 1;
        const finalAMTUSDT = (amountFrom * getUSDTAmt) / solgodsPrice;
        setUsdPrice(amountFrom * getUSDTAmt);
        setAmountTo(finalAMTUSDT);
      } else {
        const getAmtTo = await getDollarPrice(from?.symbol);
        const finalAmt = (amountFrom * getAmtTo) / solgodsPrice;
        setUsdPrice(amountFrom * getAmtTo);
        setAmountTo(finalAmt);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const switchNetwork = async () => {
    try {
      const switchData = await commonSwitch(from?.chainId, WalletEVM?.type);
      if (switchData) {
        getWalletAddress();
        getBalanceFrom();
      }
    } catch (err) {}
  };

  useEffect(() => {
    getTimerData();
  }, []);

  const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  };
  //========================== fast bonous timer =======================//
  const [privateRemainingTimer, setPrivateRemainingTimer] =
    useState(defaultRemainingTime);

  const getTimerData = () => {
    let incressDay = new Date("2024-06-07T11:59:59.000Z");

    function updateRemainingTime(countdown) {
      setPrivateRemainingTimer(getRemainingTimeUntilMsTimestamp(countdown));
    }
    getRemainingTimeUntilMsTimestamp;
    let intervalId;
    intervalId = setInterval(() => {
      updateRemainingTime(Number(new Date(incressDay)));
    }, 1000);
    return () => clearInterval(intervalId);
  };

  const handleCloseTimer = () => {
    setShowTimer(false);
  };

  const handleOpenTimer = () => {
    setShowTimer(true);
  };

  const buySolgodsManually = async () => {
    const checkForAddress = await addreshCheck(address);
    let checkFromAddress = false;
    if (from?.symbol === "SOL") {
      checkFromAddress = await addreshCheck(PaymentAddress);
    } else if(from?.symbol === "USDT (TRON)") {
      checkFromAddress = true;
    } else {
      checkFromAddress = await CheckWallet(PaymentAddress);
    }
    // let dateString1 = new Date();
    // let date1 = new Date(dateString1);
    // let timestamp1 = date1.getTime();
    // timestamp1 = timestamp1 / 1000;
    // if(timestamp1 > 1711929599){
    //   toast.warn("Presale Ended");
    // } else
    if (!amountFrom || amountFrom <= 0) {
      toast.warn("Please enter valid amount");
    } else if (!amountTo || amountTo <= 0) {
      toast.warn("Invalid amount Out");
    } else if (!address || !checkForAddress) {
      toast.warn("Please enter valid address");
    } else if (!PaymentAddress || !checkFromAddress) {
      toast.warn("Please enter valid payment address");
    } else if (parseFloat(usdPrice) > 5000) {
      toast.warn("limit exceeded");
    } else {
      setDisable(true);
      try {
        let rateData = parseFloat(amountTo) / parseFloat(amountFrom);
        const RowIsManually = await encryptData("true");
        const RowCurrency = await encryptData(from?.symbol);
        const RowWalletAddress = await encryptData(PaymentAddress);
        const RowAmountIn = await encryptData(amountFrom);
        const RowAmountOut = await encryptData(`${amountTo}`);
        const RowRate = await encryptData(`${rateData}`);
        const RowTokenInAddress = await encryptData(from?.address);
        const RowSolanaWallet = await encryptData(address);
        const RowNetworkFrom = await encryptData(`${from?.chainId}`);
        const RowWalletType = await encryptData("Manual");
        const payloadInApi = {
          isManual: RowIsManually,
          currency: RowCurrency,
          walletAddress: RowWalletAddress,
          amountIn: RowAmountIn,
          amountOut: RowAmountOut,
          rate: RowRate,
          tokenInAddress: RowTokenInAddress,
          solanaWallet: RowSolanaWallet,
          networkFrom: RowNetworkFrom,
          walletType: RowWalletType,
        };

        const InApiData = await axiosMain.post(
          "/user/create-tranx",
          payloadInApi,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (InApiData?.data?.status) {
          setStateForId(InApiData?.data?.data?._id);
          setDisable(false);
          setShowEVMToSOLGODS(true);
        }
      } catch (err) {
        setShowEVMToSOLGODS(false);
        toast.error(err.response.data.message);
        setDisable(false);
      }
    }
  };

  const HandelTRXCheck = async (e) => {
    setTransactionHash(e.target.value);
    const varifyTRXSOL = {
      amount: amountFrom,
      chainId: from?.chainId,
      Owneraddress: solOwnerAddress,
      hash: e.target.value,
      userAddress: PaymentAddress,
    };
    const varifyTRXBNB = {
      amount: amountFrom,
      chainId: from?.chainId,
      Owneraddress: ownerAddress,
      hash: e.target.value,
      userAddress: PaymentAddress,
    };
    setCheckForHashData(null);
    try {
      let checkTRX = false;
      if (from?.symbol === "USDT (BNB)") {
        checkTRX = await verifyTrxUSDTManual(varifyTRXBNB);
        if (checkTRX) {
          setCheckForHashData(true);
        } else {
          setCheckForHashData(false);
        }
      } else if (from?.symbol === "SOL") {
        setCheckForHashData(true);
      } else if (from?.symbol === "USDT (TRON)") {
        setCheckForHashData(true);
      } else {
        checkTRX = await verifyTrxManual(varifyTRXBNB);
        if (checkTRX) {
          setCheckForHashData(true);
        } else {
          setCheckForHashData(false);
        }
      }
    } catch (err) {
      setCheckForHashData(false);
    }
  };

  const saveTransactionHash = async () => {
    setDisable(true);

    if (checkForHashData) {
      const RowTrxHash = await encryptData(transactionHash);
      const RowDocId = await encryptData(stateForId);
      const payloadApi = {
        incomingTrxHash: RowTrxHash,
        TrxDocumentId: RowDocId,
      };
      try {
        const apiData = await axiosMain.post(
          "/user/update-tranx-hash",
          payloadApi,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (apiData?.data?.status) {
          setDisable(false);

          toast.success("Transaction success");
          setTimeout(() => {
            navigate("/Transactions");
          }, 3000);
          setShowEVMToSOLGODS(false);
        }
      } catch (err) {
        setShowEVMToSOLGODS(false);
        toast.error(err.response.data.message);
        setDisable(false);
      }
    }
  };

  return (
    <>
      <Layout>
        <section className="content-body">
          <Container className="mt-0">
            <Row>
              <Col lg={8} className="m-auto">
                <div className="card mb-3 shadow-box-main">
                  <div className="card-header d-block d-sm-flex">
                    <h4 className="text-white">Buy SGODS Token</h4>
                  </div>
                  <div className="card-body">
                    <div className="buy-coin-imperial">
                      <Form.Group>
                        <label>
                          <div className="select-coin">
                            <img src={from.logos} loading="lazy" alt="Img" />
                            <Form.Select
                              aria-label="Default select example"
                              name="from"
                              onChange={(e) => {
                                const data = JSON.parse(e.target.value);
                                setFrom({
                                  ...from,
                                  ...data,
                                });
                              }}
                            >
                              {Tokens.tokens?.length > 0
                                ? Tokens.tokens.map((item, index) => (
                                    <option
                                      key={index}
                                      value={JSON.stringify(item)}
                                    >
                                      {item.symbol}
                                    </option>
                                  ))
                                : ""}
                            </Form.Select>
                          </div>
                        </label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>You Pay</InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder=""
                            name="amountFrom"
                            value={amountFrom}
                            onChange={(e) => setAmountFrom(e.target.value)}
                          />
                          <InputGroup.Text>
                            ${(usdPrice * 1).toFixed(2)}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>

                      <div className="arrow-down">
                        <i className="fa fa-arrow-down"></i>
                      </div>

                      <label>
                        <div className="select-coin">
                          <img
                            src="/assets/Compress-img/coin-sol.webp"
                            loading="lazy"
                            alt="Img"
                          />
                          SGODS
                        </div>
                      </label>
                      <Form.Group>
                        <InputGroup>
                          <InputGroup.Text>You Receive</InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={(amountTo * 1).toFixed(2)}
                            readOnly
                          />
                        </InputGroup>
                      </Form.Group>

                      <label>
                        <div className="select-coin">Payment Address</div>
                      </label>
                      <Form.Group className="mb-3">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Payment Address"
                            name="PaymentAddress"
                            value={PaymentAddress}
                            onChange={(e) => setPaymentAddress(e.target.value)}
                          />
                          <InputGroup.Text>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  This is your wallet address from which funds
                                  are transferred.
                                </Tooltip>
                              }
                            >
                              <i
                                style={{ fontSize: "30px" }}
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                            </OverlayTrigger>
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>

                      <label>
                        <div className="select-coin">Solana Address</div>
                      </label>
                      <Form.Group className="mb-3">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Solana Address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <InputGroup.Text>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  You will receive/claim the SGODS token in this
                                  wallet.
                                </Tooltip>
                              }
                            >
                              <i
                                style={{ fontSize: "30px" }}
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                            </OverlayTrigger>
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>

                      {currentTimeStamp > endTime ? (
                        <button
                          className="common-btn w-100"
                          onClick={buySolgodsManually}
                          disabled={disable}
                        >
                          {disable ? "Processing" : "Buy"}
                        </button>
                      ) : (
                        <button
                          className="common-btn w-100"
                          onClick={handleOpenTimer}
                          disabled={disable}
                        >
                          {disable ? "Processing" : "Buy"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
      <Modal
        show={showEVMToSOLGODS}
        onHide={handleEVMToSOLGODS}
        centered
        className="transaction-proceed-modal"
        backdrop="static"
      >
        <Modal.Body>
          <div className="heading-box">
            <h4>
              Pay {amountFrom} {from?.symbol} in this wallet address
            </h4>
          </div>

          <div className="card-body mt-3">
            <div className="buy-coin-imperial">
              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="text"
                    // className="mb-3"
                    placeholder="Enter Your Transaction Hash "
                    name="transactionHash"
                    value={
                      from?.symbol === "SOL" ? solOwnerAddress : from?.symbol === "USDT (TRON)" ? tronOwnerAddress : ownerAddress 
                    }
                  />
                  <InputGroup.Text
                    onClick={() => {
                      navigator.clipboard.writeText(
                      from?.symbol === "SOL" ? solOwnerAddress : from?.symbol === "USDT (TRON)" ? tronOwnerAddress : ownerAddress 
                      // from?.symbol !== "SOL" ? ownerAddress : solOwnerAddress
                      );
                      setCopy(true);
                      setTimeout(() => {
                        setCopy(false);
                      }, [2500]);
                    }}
                  >
                    {copy === true ? (
                      <i class="fa fa-check" aria-hidden="true"></i>
                    ) : (
                      <i class="fa fa-clone" aria-hidden="true"></i>
                    )}
                  </InputGroup.Text>
                  <InputGroup.Text>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          Funds Need to be transfered in this Solgods
                          organization wallet
                        </Tooltip>
                      }
                    >
                      <i
                        style={{ fontSize: "30px" }}
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i>
                    </OverlayTrigger>

                    {/* */}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="text"
                    // className="mb-3"
                    placeholder="Enter Your Transaction Hash"
                    name="transactionHash"
                    value={transactionHash}
                    onChange={(e) => {
                      HandelTRXCheck(e);
                    }}
                  />
                  <InputGroup.Text>
                    {checkForHashData ? (
                      <i class="fa fa-check" aria-hidden="true"></i>
                    ) : checkForHashData === false ? (
                      <i class="fa fa-times" color="Red" aria-hidden="true"></i>
                    ) : (
                      <i
                        class="fa fa-spinner"
                        color="Red"
                        aria-hidden="true"
                      ></i>
                    )}
                  </InputGroup.Text>
                  <InputGroup.Text>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          Enter the transaction hash immediately after the
                          transaction
                        </Tooltip>
                      }
                    >
                      <i
                        style={{ fontSize: "30px" }}
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i>
                    </OverlayTrigger>

                    {/* */}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <button
                className="common-btn"
                onClick={() => {
                  if (checkForHashData) {
                    saveTransactionHash();
                  } else {
                    toast.error("Please enter valid transaction hash");
                  }
                }}
                disabled={disable}
              >
                {disable ? "Processing" : "Submit"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showTimer}
        onHide={handleCloseTimer}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="presale-popup"
        backdrop="static"
      >
        <div className="outer-bg-signup">
          <h3> Offer Alert</h3>
          <h5 className="color-black">Presale starts in </h5>

          <div className="timer-box-inner">
            <h4>
              <span className="time">
                {" "}
                {privateRemainingTimer?.days || "00"}
              </span>{" "}
              <span className="title">Days</span>
            </h4>
            <h4>
              <span className="time">
                {" "}
                {privateRemainingTimer?.hours || "00"}
              </span>{" "}
              <span className="title">Hours</span>
            </h4>
            <h4>
              <span className="time">
                {privateRemainingTimer?.minutes || "00"}
              </span>{" "}
              <span className="title">Minutes</span>
            </h4>
            <h4>
              <span className="time">
                {privateRemainingTimer?.seconds || "00"}
              </span>{" "}
              <span className="title">Seconds</span>
            </h4>
          </div>

          <h5>07 June 2024</h5>
          <button
            className="common-btn"
            onClick={() => {
              handleCloseTimer();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
      <ConnectWalletModal {...ConnectWalletModalProps} />
    </>
  );
};
