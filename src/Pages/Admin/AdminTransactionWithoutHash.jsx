import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Form,
  Pagination,
  InputGroup,
  Modal,
} from "react-bootstrap";
import Layout from "../../Component/AdminLayout/AdminLayout";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { toast } from "react-toastify";
import Chains from "../../JSON/Chain.json";
import { Tab, Tabs } from "react-bootstrap-v5";
import { debounce, update } from "lodash";
import ExportToExcel from "../../Component/ExportToExcel";
import { Link } from "react-router-dom";
import { encryptData } from "../../helpers/encryption";
let chainList = Chains.Chains;

const AdminTransactionWithoutHash = () => {
  const { user } = useAuth();
  const [showDataClaim, setShowDataClaim] = useState([]);
  const [showDataUnClaim, setShowDataUnClaim] = useState([]);
  const [pageNumberClaim, setPageNumberClaim] = useState(1);
  const [pageNumberUnClaim, setPageNumberUnClaim] = useState(1);
  const [totalOrderClaim, setTotalOrderClaim] = useState(1);
  const [totalOrderUnClaim, setTotalOrderUnClaim] = useState(1);
  const [searchClaimData, setSearchClaimData] = useState("");
  const [searchUnClaimData, setSearchUnClaimData] = useState("");
  const [filterHashClaim, setFilterHashClaim] = useState("");
  const [filterHashUnClaim, setFilterHashUnClaim] = useState("");
  const [showUpdateHash, setShowUpdateHash] = useState(false);
  const [inputdata, setInputdata] = useState({
    hash: "",
    TrxDocumentId: "",
    user_id: "",
  });
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getTrxClaim(pageNumberClaim, searchClaimData, filterDataClaim);
    getTrxUnClaim(pageNumberUnClaim, searchUnClaimData, filterDataUnClaim);
  }, []);
  const getTrxClaim = async (
    pageNumberClaim,
    searchClaimData,
    filterDataClaim
  ) => {
    try {
      const getData = await axiosMain.get(
        `/SOLGODS_ADMIN/get-claimed-transaction?page=${pageNumberClaim}&limit=10isHashUpdate=${filterDataClaim}&search=${searchClaimData}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      // console.log(getData);
      if (getData?.data?.status) {
        console.log(getData?.data?.data?.content);
        setShowDataClaim(getData?.data?.data?.content);
        setTotalOrderClaim(getData?.data?.data?.total);
      }
    } catch (err) { }
  };

  const getTrxUnClaim = async (
    pageNumberUnClaim,
    searchUnClaimData,
    filterHashUnClaim
  ) => {
    try {
      const getData = await axiosMain.get(
        `/SOLGODS_ADMIN/get-unclaimed-transaction?page=${pageNumberUnClaim}&limit=10&isHashUpdate=${filterHashUnClaim}&search=${searchUnClaimData}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      // console.log(getData);
      if (getData?.data?.status) {
        const filteredData = getData?.data?.data?.content.filter(
          (item) =>
            item.incomingTrxHash === null ||
            item.incomingTrxHash === "" ||
            item.incomingTrxHash === undefined
        );
        console.log(getData?.data?.data?.content);
        setShowDataUnClaim(filteredData);
        setTotalOrderUnClaim(filteredData.length);
      }
    } catch (err) { }
  };

  const incressFunctionClaim = () => {
    if (pageNumberClaim < Math.ceil(totalOrderClaim / 10)) {
      setPageNumberClaim(pageNumberClaim + 1);
    }
    window.scrollTo(0, 0);
  };
  const decressFunctionClaim = () => {
    if (pageNumberClaim > 1) {
      setPageNumberClaim(pageNumberClaim - 1);
    }
    window.scrollTo(0, 0);
  };

  const filterDataClaim = useCallback(debounce(getTrxClaim, 1000), []);
  useEffect(() => {
    filterDataClaim(pageNumberClaim, searchClaimData);
  }, [pageNumberClaim, searchClaimData]);

  const incressFunctionUnClaim = () => {
    if (pageNumberUnClaim < Math.ceil(totalOrderUnClaim / 10)) {
      setPageNumberUnClaim(pageNumberUnClaim + 1);
    }
    window.scrollTo(0, 0);
  };
  const decressFunctionUnClaim = () => {
    if (pageNumberUnClaim > 1) {
      setPageNumberUnClaim(pageNumberUnClaim - 1);
    }
    window.scrollTo(0, 0);
  };

  const filterDataUnClaim = useCallback(debounce(getTrxUnClaim, 1000), []);
  useEffect(() => {
    filterDataUnClaim(pageNumberUnClaim, searchUnClaimData, filterHashUnClaim);
  }, [pageNumberUnClaim, searchUnClaimData, filterHashUnClaim]);

  const update = (items) => {
    console.log(items);
    setShowUpdateHash(true);
    setInputdata((prevState) => ({
      ...prevState,
      TrxDocumentId: items._id,
      user_id: items.userId,
    }));
  };
  console.log(inputdata);
  const handleClose = () => {
    setShowUpdateHash(false);
  };
  const HandelData = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  const updateHash = async () => {
    setDisable(true);
    try {
      const RowincomingTrxHash = await encryptData(inputdata.hash);
      const RowTrxDocumentId = await encryptData(inputdata.TrxDocumentId);
      const RowEmailuser_id = await encryptData(inputdata.user_id);

      const res = await axiosMain.post(
        "/SOLGODS_ADMIN/update-tranx-hash-by-admin",
        {
          incomingTrxHash: RowincomingTrxHash,
          TrxDocumentId: RowTrxDocumentId,
          user_id: RowEmailuser_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      if (res?.data?.status) {
        setDisable(false);
        toast.success("Hash updated successfully");
        setShowUpdateHash(false);
      }
    } catch (error) {
      console.error(error);
      setDisable(false);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <>
      <Layout>
        <section className="transactions-sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <div className="w-100">
                    <h2 className="inner-page-heading mb-2">
                      All Transactions Without Hash
                    </h2>
                    <Row>
                      <Col lg={3}>
                        <div>
                          <InputGroup className="m-2">
                            <Form.Select
                              className="mb-0"
                              name="filterDataUnClaim"
                              onChange={(e) => {
                                setFilterHashUnClaim(e.target.value);
                              }}
                              value={filterDataUnClaim}
                            >
                              <option>Sort By</option>
                              <option value="yes">Success</option>
                              <option value="no">Failed</option>
                            </Form.Select>
                          </InputGroup>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <InputGroup className="m-2">
                            <Form.Control
                              className="mb-0"
                              type="email"
                              placeholder="Search...."
                              name="searchUnClaimData"
                              onChange={(e) => {
                                setSearchUnClaimData(e.target.value);
                              }}
                              value={searchUnClaimData}
                            />
                          </InputGroup>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <button
                            className="common-btn"
                            onClick={() => {
                              setSearchUnClaimData("");
                              setFilterHashUnClaim("");
                            }}
                          >
                            Clear Filter
                          </button>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <ExportToExcel type="UnClaimedTrx" />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <div className="table-box-new shadow-box-main">
                          <div className="table-responsive table-outer-box">
                            <Table className="table">
                              <thead>
                                <tr>
                                  <th width="5%">S.No</th>
                                  <th width="10%">Name</th>
                                  <th width="15%">Email</th>
                                  <th width="10%">Buy Address</th>
                                  <th width="10%">SOL Address</th>
                                  <th width="10%">Buy Amount</th>
                                  <th width="10%">SGODS Amount</th>
                                  <th width="10%">Date</th>
                                  {/* <th width="10%">Token</th> */}
                                  <th width="10%">Payment Trx Hash</th>

                                  <th width="10%">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {showDataUnClaim?.length > 0 ? (
                                  showDataUnClaim.map((items, index) => {
                                    let chainData = chainList.filter(
                                      (chain) =>
                                        chain.chainId ===
                                        parseInt(items.networkFrom)
                                    );

                                    chainData = chainData[0];
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{items.userName}</td>
                                        <td>{items.userEmail}</td>
                                        <td>
                                          <Link
                                            to={`${chainData?.explorer
                                              }address/${items?.walletAddress}${items.currency !== "SOL"
                                                ? ""
                                                : "?cluster=mainnet-alpha"
                                              }`}
                                            target="_blank"
                                          >
                                            {items?.walletAddress.replace(
                                              items?.walletAddress.substring(
                                                2,
                                                40
                                              ),
                                              "..."
                                            )}
                                          </Link>
                                        </td>
                                        <td>
                                          <Link
                                            to={`https://solana.fm/address/${items.solanaWallet}?cluster=mainnet-alpha`}
                                            target="_blank"
                                          >
                                            {items.solanaWallet.replace(
                                              items.solanaWallet.substring(
                                                4,
                                                40
                                              ),
                                              "..."
                                            )}
                                          </Link>
                                        </td>

                                        <td>
                                          {(items.amountIn * 1).toFixed(4)}{" "}
                                          {items?.currency}
                                        </td>
                                        <td>
                                          {(items?.amountOut * 1).toFixed(2)}
                                        </td>
                                        <td>
                                          {moment(items.createdAt)
                                            .format("lll")
                                            .slice(0, 12)}
                                        </td>
                                        {/* <td>{items?.currency}</td> */}
                                        <td>
                                          {items?.incomingTrxHash ? (
                                            <Link
                                              to={`${chainData?.explorer
                                                }${items.currency == "USDT (TRON)"
                                                  ? "transaction"
                                                  : "tx"
                                                }/${items?.incomingTrxHash
                                                }`}
                                              target="_blank"
                                            >
                                              {" "}
                                              {items.currency !== "SOL"
                                                ? items?.incomingTrxHash?.replace(
                                                  items?.incomingTrxHash?.substring(
                                                    5,
                                                    62
                                                  ),
                                                  "..."
                                                )
                                                : items?.incomingTrxHash?.replace(
                                                  items?.incomingTrxHash?.substring(
                                                    5,
                                                    84
                                                  ),
                                                  "..."
                                                )}
                                            </Link>
                                          ) : (
                                            <button
                                              className="common-btn"
                                              onClick={() => {
                                                update(items);
                                              }}
                                            >
                                              Update
                                            </button>
                                          )}
                                        </td>
                                        {/* <td>
                                              {items?.outgoingTrxHash ? (
                                                <a
                                                  href={`https://solana.fm/tx/${items?.outgoingTrxHash}?cluster=mainnet-alpha`}
                                                  target="_blank"
                                                >
                                                  {" "}
                                                  {items?.outgoingTrxHash?.replace(
                                                    items?.outgoingTrxHash?.substring(
                                                      5,
                                                      62
                                                    ),
                                                    "..."
                                                  )}
                                                </a>
                                              ) : (
                                                ""
                                              )}
                                            </td> */}

                                        <td>
                                          <b
                                            className={
                                              items.status === "SUCCESS"
                                                ? "success"
                                                : "pending"
                                            }
                                          >
                                            {!items?.incomingTrxHash
                                              ? "Failed"
                                              : items.statusIn}
                                          </b>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td colSpan={10}>
                                      <p className="text-center">
                                        No Data Found
                                      </p>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                          <div className="d-flex justify-content-end">
                            {showDataUnClaim?.length > 0 ? (
                              <div className="d-flex justify-content-center paginate-register">
                                <div className="d-flex align-items-center">
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      decressFunctionUnClaim();
                                    }}
                                  >
                                    <i className="fa fa-angle-left"></i>
                                  </button>
                                  <button className="common-btn m-2">
                                    Page {pageNumberUnClaim} of{" "}
                                    {Math.ceil(totalOrderUnClaim / 10)}
                                  </button>
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      incressFunctionUnClaim();
                                    }}
                                  >
                                    <i className="fa fa-angle-right"></i>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Modal
          show={showUpdateHash}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="presale-popup"
          backdrop="static"
        >
          <div className="outer-bg-signup">
            <h3> Transaction</h3>
            <h5 className="color-black mt-3">Update Transaction Hash</h5>
            <Form>
              <Form.Group className="mb-3">
                <InputGroup className="">
                  <Form.Control
                    type="text"
                    placeholder="Transaction Hash"
                    name="hash"
                    onChange={HandelData}
                    value={inputdata.hash}
                  />
                </InputGroup>
              </Form.Group>
              <button
                className="common-btn position-static"
                onClick={updateHash}
                disabled={disable}
              >
                {disable ? "Updating..." : "Submit"}
              </button>
              <button className="common-btn" onClick={handleClose}>
                Close
              </button>
            </Form>
          </div>
        </Modal>
      </Layout>
    </>
  );
};

export default AdminTransactionWithoutHash;
