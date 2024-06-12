import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Col, Container, Row, Form, Modal } from "react-bootstrap-v5";
import Layout from "../../Component/Layout";
import Tokens from "../../JSON/TokenListmainnet.json";
import useAuth from "../../hooks/useAuth";
import { ReConnect } from "../../helpers/Connect";
import { setEVMWallet } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import ConnectWalletModal from "../../Component/ui/ConnectWalletModal";
import { getCoinBalance } from "../../helpers/getethBalance";
import { _switchNetwork } from "../../helpers/web3Model";
import { commonSwitch } from "../../helpers/ChainSwitch";
import { toast } from "react-toastify";
import { TransferCoinsOnBuy } from "../../helpers/sendCoins";
import { verifyTrx, verifyTrxUSDT } from "../../helpers/trxVerify";
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
import { getRemainingTimeUntilMsTimestamp } from "../../helpers/Timer";

export const Buycoin = () => {
  // console.log(new Date());
  const [endTime, setEndTime] = useState(1717761598)
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

  useEffect(() => {
    const dateString1 = new Date();
    const date1 = new Date(dateString1);
    let timestamp1 = date1.getTime();
    // setCurrentTimeStamp(timestamp1);
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
    name: "USDT BNB",
    symbol: "USDT (BNB)",
    address: "0x55d398326f99059fF775485246999027B3197955",
    chainId: 56,
    decimals: 18,
    logos: "assets/Compress-img/usdt.webp",
  });

  const [address, setAddress] = useState("");
  const [amountFrom, setAmountFrom] = useState(555);
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
  const [checkForProcessETM, setCheckForProcessETM] = useState(0);
  const [disable, setDisable] = useState(false);
  const [switchForWallet, setSwitchForWallet] = useState("EVM");
  const [ownerAddress, setOwnerAddress] = useState(
    "0xAd56626F63E286Ae36870D80a0FdE6dc95e4656e"
  );
  const [usdPrice, setUsdPrice] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

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
        from?.symbol === "USDT (MATIC)"
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

  const buySolgodsWithEVM = async () => {
    const checkForAddress = await addreshCheck(address);
    let dateString1 = new Date();
    let date1 = new Date(dateString1);
    let timestamp1 = date1.getTime();
    timestamp1 = timestamp1 / 1000;
    if (timestamp1 < endTime) {
      toast.warn("Thank You, Presale will start on 07 June.");
    } else if (!amountFrom || amountFrom <= 0) {
      toast.warn("Please enter valid amount");
    } else if (!amountTo || amountTo <= 0) {
      toast.warn("Invalid amount Out");
    } else if (parseFloat(amountFrom) > parseFloat(balanceFrom)) {
      toast.warn("Insufficient balance");
    } else if (!address || !checkForAddress) {
      toast.warn("Please enter valid address");
    } else if (parseFloat(usdPrice) > 5000) {
      toast.warn("limit exceeded");
    } else {
      setShowEVMToSOLGODS(true);
      setDisable(true);
      try {
        let rateData = parseFloat(amountTo) / parseFloat(amountFrom);
        const RowCurrency = await encryptData(from?.symbol);
        const RowWalletAddress = await encryptData(WalletEVM?.selectedAccount);
        const RowAmountIn = await encryptData(amountFrom);
        const RowAmountOut = await encryptData(`${amountTo}`);
        const RowRate = await encryptData(`${rateData}`);
        const RowTokenInAddress = await encryptData(from?.address);
        const RowSolanaWallet = await encryptData(address);
        const RowNetworkFrom = await encryptData(`${from?.chainId}`);
        const RowWalletType = await encryptData(WalletEVM?.type);
        const payloadInApi = {
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
          setCheckForProcessETM(1);
          try {
            const buyPayload = {
              chainId: from?.chainId,
              amount: amountFrom,
              type: WalletEVM?.type,
              Owneraddress: ownerAddress,
              symbol: from?.symbol,
              userAddress: WalletEVM?.selectedAccount,
            };
            let buy = false;
            if (
              from?.symbol === "USDT (BNB)" ||
              from?.symbol === "USDT (ETH)" ||
              from?.symbol === "USDT (MATIC)"
            ) {
              buy = await BuyFromUSDT(buyPayload);
            } else {
              buy = await TransferCoinsOnBuy(buyPayload);
            }
            if (buy) {
              setCheckForProcessETM(2);

              const varifyTRXPayload = {
                amount: amountFrom,
                type: WalletEVM?.type,
                Owneraddress: ownerAddress,
                hash: buy?.transactionHash,
              };
              try {
                let verifyTRX = false;
                if (
                  from?.symbol === "USDT (BNB)" ||
                  from?.symbol === "USDT (ETH)" ||
                  from?.symbol === "USDT (MATIC)"
                ) {
                  verifyTRX = await verifyTrxUSDT(varifyTRXPayload);
                } else {
                  verifyTRX = await verifyTrx(varifyTRXPayload);
                }
                if (verifyTRX === true) {
                  setCheckForProcessETM(3);
                  const RowTrxHash = await encryptData(buy?.transactionHash);
                  const RowDocId = await encryptData(
                    InApiData?.data?.data?._id
                  );
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
                      setCheckForProcessETM(3);
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
                } else {
                  setShowEVMToSOLGODS(false);
                  toast.error("Verify Transaction Failed");
                  setDisable(false);
                }
              } catch (err) {
                setShowEVMToSOLGODS(false);
                toast.error("Verify Transaction Failed");
                setDisable(false);
              }
            } else {
              setShowEVMToSOLGODS(false);
              toast.error("Buy Transaction Failed");
              setDisable(false);
            }
          } catch (err) {
            setShowEVMToSOLGODS(false);
            toast.error("Buy Transaction Failed");
            setDisable(false);
          }
        }
      } catch (err) {
        setShowEVMToSOLGODS(false);
        toast.error(err.response.data.message);
        setDisable(false);
      }
    }
  };

  const buySolgodsWithSOL = async () => {
    const checkForAddress = await addreshCheck(address);
    let dateString1 = new Date();
    let date1 = new Date(dateString1);
    let timestamp1 = date1.getTime();
    timestamp1 = timestamp1 / 1000;
    if (timestamp1 < endTime) {
      toast.warn("Thank You, Presale will start on 07 June.");
    } else if (!amountFrom || amountFrom <= 0) {
      toast.warn("Please enter valid amount");
    } else if (parseFloat(amountFrom) > parseFloat(balanceFrom)) {
      toast.warn("Insufficient balance");
    } else if (!address || !checkForAddress) {
      toast.warn("Please enter valid address");
    } else if (parseFloat(usdPrice) > 5000) {
      toast.warn("Limit exceeded");
    } else {
      setShowEVMToSOLGODS(true);
      try {
        let rateData = parseFloat(amountTo) / parseFloat(amountFrom);
        const RowCurrency = await encryptData(from?.symbol);
        const RowWalletAddress = await encryptData(WalletSOL?.selectedAccount);
        const RowAmountIn = await encryptData(amountFrom);
        const RowAmountOut = await encryptData(`${amountTo}`);
        const RowRate = await encryptData(`${rateData}`);
        const RowTokenInAddress = await encryptData(from?.address);
        const RowSolanaWallet = await encryptData(address);
        const RowNetworkFrom = await encryptData(`${from?.chainId}`);
        const payloadInApi = {
          currency: RowCurrency,
          walletAddress: RowWalletAddress,
          amountIn: RowAmountIn,
          amountOut: RowAmountOut,
          rate: RowRate,
          tokenInAddress: RowTokenInAddress,
          solanaWallet: RowSolanaWallet,
          networkFrom: RowNetworkFrom,
        };
        const InapiData = await axiosMain.post(
          "/user/create-tranx",
          payloadInApi,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.token}`,
            },
          }
        );
        if (InapiData?.data?.status) {
          setCheckForProcessETM(1);

          try {
            let Amt = amountFrom;
            Amt = parseFloat(Amt);

            const buyTrx = await handleSignAndSendTransactionV0(Amt);
            if (buyTrx) {
              setCheckForProcessETM(2);

              const RowTrxHash = await encryptData(buyTrx);
              const RowDocId = await encryptData(InapiData?.data?.data?._id);
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
                  setCheckForProcessETM(3);
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
            } else {
              setDisable(false);
              setShowEVMToSOLGODS(false);
              toast.error("Transaction failed");
            }
          } catch (err) {
            setDisable(false);
            setShowEVMToSOLGODS(false);
            toast.error("Transaction failed");
          }
        }
      } catch (error) {}
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
                    <h4 className=" text-white">Buy SGODS Token</h4>
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
                                  name: data.name,
                                  symbol: data.symbol,
                                  decimals: data.decimals,
                                  address: data.address,
                                  logos: data.logos,
                                  chainId: data.chainId,
                                });
                              }}
                            >
                              {Tokens.tokens?.length > 0
                                ? Tokens.tokens.map((items, index) => {
                                    return (
                                      <option value={JSON.stringify(items)}>
                                        {items.symbol}
                                      </option>
                                    );
                                  })
                                : ""}
                            </Form.Select>
                          </div>
                          <span>
                            Current Balance{" "}
                            {!isNaN(balanceFrom)
                              ? (balanceFrom * 1).toFixed(4)
                              : 0}
                          </span>
                        </label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>You Pay</InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder=""
                            name="amountFrom"
                            value={amountFrom}
                            onChange={(e) => {
                              setAmountFrom(e.target.value);
                            }}
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
                        {/* <span>Imperial Balance 0</span> */}
                      </label>
                      <Form.Group>
                        <InputGroup>
                          <InputGroup.Text>You Recieve</InputGroup.Text>
                          <Form.Control
                            type="text"
                            // className="mb-3"
                            placeholder=""
                            value={(amountTo * 1).toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })}
                            readOnly
                          />
                        </InputGroup>
                      </Form.Group>

                      <label>
                        <div className="select-coin">Solana Address</div>
                        {/* <span>Imperial Balance 0</span> */}
                      </label>
                      <Form.Group className="mb-3">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            // className="mb-3"
                            placeholder="Enter Your Solana Address"
                            name="address"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                          />
                          <InputGroup.Text>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  You will receive/claim the SGODS token in this
                                  wallet
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

                      {/* {checkForDate > 1711909799 ? ( */}
                      {currentTimeStamp > endTime ? (
                        !WalletEVM?.selectedAccount && from.symbol !== "SOL" ? (
                          <button
                            className="common-btn w-100"
                            onClick={() => {
                              setShow(true);
                              setSwitchForWallet("EVM");
                            }}
                          >
                            Connect Wallet
                          </button>
                        ) : from.symbol === "SOL" &&
                          !WalletSOL?.selectedAccount ? (
                          <button
                            className="common-btn w-100"
                            onClick={() => {
                              setShow(true);
                              setSwitchForWallet("SOL");
                            }}
                          >
                            Connect SOL Wallet
                          </button>
                        ) : WalletEVM?.chainId !== from?.chainId &&
                          from?.symbol !== "SOL" ? (
                          <button
                            className="common-btn w-100"
                            onClick={() => switchNetwork()}
                          >
                            Switch to {from.symbol} chain
                          </button>
                        ) : (
                          <button
                            className="common-btn w-100"
                            onClick={() => {
                              if (from?.symbol !== "SOL") {
                                buySolgodsWithEVM();
                              } else {
                                buySolgodsWithSOL();
                              }
                            }}
                            disabled={disable}
                          >
                            {disable ? "Processing" : "Buy"}
                          </button>
                        )
                      ) : (
                        <button
                          className="common-btn w-100"
                          onClick={() => handleOpenTimer()}
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
            <h4>Your Transaction is Being Process</h4>
            <p>Transaction status can also be tracked in Recent Trades</p>
          </div>
          <div className="swap-row">
            <div>
              <img src={from.logos} loading="lazy" alt="Img" className="" />
              <div>
                <h4>{from.symbol}</h4>
              </div>
            </div>
            {/* <img
              src="assets/Compress-img/Arrow.webp"
              loading="lazy"
              alt="Img"
              className="arrow-img"
            /> */}
            <div>
              <img
                src="assets/Compress-img/Logo_Solgods.webp"
                loading="lazy"
                alt="Img"
                className=""
              />
              <div>
                <h4>{to.toUpperCase()}</h4>
              </div>
            </div>
          </div>
          <div className="currency-transfer-loading">
            <div>
              <img
                src={
                  checkForProcessETM === 1 ||
                  checkForProcessETM === 2 ||
                  checkForProcessETM === 3
                    ? "assets/Compress-img/tik.webp"
                    : "assets/Compress-img/loader.gif"
                }
                loading="lazy"
                alt="Img"
                className="loader-ing"
              />
              <img
                src={from.logos}
                loading="lazy"
                alt="Img"
                className="coin-img"
              />
              <span>Payment</span>
            </div>

            <div>
              <img
                src={
                  checkForProcessETM === 2 || checkForProcessETM === 3
                    ? "assets/Compress-img/tik.webp"
                    : "assets/Compress-img/loader.gif"
                }
                loading="lazy"
                alt="Img"
                className="loader-ing"
              />
              <img
                src={from.logos}
                loading="lazy"
                alt="Img"
                className="coin-img"
              />
              <span>Verification</span>
            </div>

            <div>
              <img
                src={
                  checkForProcessETM === 3
                    ? "assets/Compress-img/tik.webp"
                    : "assets/Compress-img/loader.gif"
                }
                loading="lazy"
                alt="Img"
                className="loader-ing"
              />
              <img
                src="assets/Compress-img/Logo_Solgods.webp"
                loading="lazy"
                alt="Img"
                className="coin-img"
              />
              <span>Solana Verification</span>
            </div>
          </div>
          <p>
            If your transaction seems to be taking longer than normal (more than
            30 mins). Please contact our Support Team at Support@solgods.com
          </p>
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
