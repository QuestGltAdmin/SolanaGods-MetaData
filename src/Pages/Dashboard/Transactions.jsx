import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Form, Pagination } from "react-bootstrap";
import Layout from "../../Component/Layout";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { toast } from "react-toastify";
import Chains from "../../JSON/Chain.json";
import { Link } from "react-router-dom";
let chainList = Chains.Chains;

const Transactions = () => {
  const { user } = useAuth();
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    getUserTrx();
  }, []);
  const getUserTrx = async () => {
    try {
      const getData = await axiosMain.get("/user/get-user-tranx", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token}`,
        },
      });
      if (getData?.data?.status) {
        setShowData(getData?.data?.data);
      }
    } catch (err) { }
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
                      All Transactions
                    </h2>

                    <Row>
                      <Col>
                        <div className="table-box-new shadow-box-main">
                          <div className="table-responsive table-outer-box">
                            <Table className="table">
                              <thead>
                                <tr>
                                  <th width="5%">S.No</th>
                                  {/* <th width="10%">Buy Address</th> */}
                                  <th width="15%">SOL Address</th>
                                  <th width="15%">Buy Amount</th>
                                  <th width="10%">SGODS Amount</th>
                                  <th width="15%">Date</th>
                                  {/* <th width="10%">Token</th> */}
                                  <th width="15%">Payment Trx Hash</th>
                                  <th width="15%">Received Trx Hash</th>
                                  {/* <th width="5%">Action</th> */}
                                  <th width="10%">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {showData?.length > 0 ? (
                                  showData.map((items, index) => {
                                    let chainData = chainList.filter(
                                      (chain) =>
                                        chain.chainId ===
                                        parseInt(items.networkFrom)
                                    );

                                    chainData = chainData[0];
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        {/* <td>
                                          <a
                                            href={`${
                                              chainData.explorer
                                            }address/${items?.walletAddress}${
                                              items.currency !== "SOL"
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
                                          </a>
                                        </td> */}
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
                                            ""
                                          )}
                                        </td>
                                        <td>
                                          {items?.outgoingTrxHash ? (
                                            <Link
                                              to={`https://solana.fm/tx/${items?.outgoingTrxHash}?cluster=mainnet-alpha`}
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
                                            </Link>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        {/* <td>
                                           {items?.status === "SUCCESS" ? (
                                                <button className="common-btn disable">
                                                  Claimed
                                                </button>
                                              ) : ( */}
                                        {/* <button
                                            className="common-btn"
                                            onClick={() => {
                                              toast.warn("Coming Soon!");
                                            }}
                                          >
                                            Claim
                                          </button> */}
                                        {/* )} 
                                        </td>*/}
                                        <td>
                                          <b
                                            className={
                                              items.status === "SUCCESS"
                                                ? "success"
                                                : "pending"
                                            }
                                          >
                                            {!items?.incomingTrxHash
                                              ? "Pending"
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
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default Transactions;
