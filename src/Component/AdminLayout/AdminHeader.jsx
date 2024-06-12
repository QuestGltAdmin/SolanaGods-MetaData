import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Col,
  Row,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logout,
  setEVMWallet,
  setPhantomWallet,
} from "../../store/reducers/authReducer";
import useAuth from "../../hooks/useAuth";
import ConnectWalletModal from "../ui/ConnectWalletModal";
import { Connect, ReConnect, onDisconnect } from "../../helpers/Connect";
import { disconnectPhantomWallet } from "../../helperSolana/connectwallet";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const { user, WalletEVM, WalletSOL } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [forMobileView, setForMobileView] = useState(
    window.innerWidth < 992 ? true : false
  );
  const [walletAddress, setWalletAddress] = useState("");
  const [switchForWallet, setSwitchForWallet] = useState("EVM");
  const HandleLogout = async () => {
    toast.success("Logged Out Successfully!");
    dispatch(logout());
  };

  const handleClose = useCallback((e) => {
    setShow(false);
  });

  const ConnectWalletModalProps = useMemo(() => ({
    modalProps: {
      show: show,
      onHide: handleClose,
    },
    chainData: switchForWallet === "EVM" ? "EVM" : "SOL",
    forMobileView,
  }));

  const getWalletAddress = async () => {
    //=================Account change code===============//
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
      dispatch(setEVMWallet(walletAcc));
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
  }, [walletAddress]);

  const logoutEVM = async () => {
    try {
      await onDisconnect(WalletEVM?.type);
      dispatch(setEVMWallet({}));
      toast.success("Wallet Disconnected SuccesFully!");
    } catch (err) {}
  };

  const logoutSOL = async () => {
    try {
      const disconnect = await disconnectPhantomWallet();
      dispatch(setPhantomWallet({}));
      toast.success("Wallet Disconnected SuccesFully!");
    } catch (err) {}
  };

  const controlNavbar = () => {
    if (window.scrollY) {
      document.getElementById("headerId").classList.add("darker-header");
      //   HandleClass12();
    }
    if (window.scrollY == 0) {
      document.getElementById("headerId").classList.remove("darker-header");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);
  return (
    <>
      <header className="main-header login-header-home" id="headerId">
        <Navbar expand="lg" sticky="top">
          <Container fluid>
            <Row className="w-100 m-auto">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Navbar.Brand href="/">
                    <img src="assets/Compress-img/updated-logo.webp" />
                  </Navbar.Brand>

                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-dashboard");
                        }}
                      >
                        <i className="fa fa-th-large"></i> Dashboard
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/all-trx");
                        }}
                      >
                        <i className="fa fa-exchange"></i>With Hash Transactions
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/all-trx-without-hash");
                        }}
                      >
                        <i className="fa fa-exchange"></i>Without Hash
                        Transactions
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/all-trx-manual");
                        }}
                      >
                        <i className="fa fa-exchange"></i>Manual Transactions
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/user-list");
                        }}
                      >
                        <i className="fa fa-money"></i> User List
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-referral");
                        }}
                      >
                        <i className="fa fa-user"></i> Referral List
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          navigate("/admin-profile");
                        }}
                      >
                        <i className="fa fa-user"></i> Profile
                      </Nav.Link>

                      <Nav.Link
                        onClick={() => {
                          HandleLogout();
                        }}
                      >
                        <i className="fa fa-sign-out"></i> Logout
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>

                  {!WalletEVM?.selectedAccount ? (
                    <button
                      onClick={() => {
                        setShow(true);
                        setSwitchForWallet("EVM");
                      }}
                      className=" common-btn"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle
                        className="common-btn"
                        id="dropdown-basic"
                      >
                        <img
                          src={
                            WalletEVM?.type === "metamask"
                              ? "assets/Compress-img/metamask.svg"
                              : WalletEVM?.type === "walletConnect"
                              ? "assets/Compress-img/walletconnect.svg"
                              : "assets/Compress-img/coinbase.webp"
                          }
                          loading="lazy"
                          alt="Img"
                        />
                        {WalletEVM?.selectedAccount.replace(
                          WalletEVM?.selectedAccount.substring(5, 37),
                          "..."
                        )}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            logoutEVM();
                          }}
                        >
                          Disconnect
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}

                  {!WalletSOL?.selectedAccount ? (
                    <button
                      onClick={() => {
                        setShow(true);
                        setSwitchForWallet("SOL");
                      }}
                      className=" common-btn"
                    >
                      Connect SOL Wallet
                    </button>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle
                        className="common-btn"
                        id="dropdown-basic"
                      >
                        <img
                          src={"assets/Compress-img/phantom.svg"}
                          loading="lazy"
                          alt="Img"
                        />
                        {WalletSOL?.selectedAccount.replace(
                          WalletSOL?.selectedAccount.substring(5, 37),
                          "..."
                        )}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            logoutSOL();
                          }}
                        >
                          Disconnect
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
      <ConnectWalletModal {...ConnectWalletModalProps} />
    </>
  );
}
