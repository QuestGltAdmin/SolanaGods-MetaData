import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Form,
  Pagination,
  InputGroup,
} from "react-bootstrap";
import Layout from "../../Component/AdminLayout/AdminLayout";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import { debounce } from "lodash";
import moment from "moment";
import ExportToExcel from "../../Component/ExportToExcel";

const AdminUserList = () => {
  const { user } = useAuth();
  const [showData, setShowData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalOrderCountAll, setTotalOrderCountAll] = useState(1);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    getUserTrx(pageNumber, searchData);
  }, []);
  const getUserTrx = async (pageNumber, searchData) => {
    try {
      const getData = await axiosMain.get(
        `/SOLGODS_ADMIN/user-list?page=${pageNumber}&limit=10&search=${searchData}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      console.log(getData);
      if (getData?.data?.status) {
        setShowData(getData?.data?.data?.content);
        setTotalOrderCountAll(getData?.data?.data?.total);
      }
    } catch (err) {}
  };

  const incressFunctionAll = () => {
    if (pageNumber < Math.ceil(totalOrderCountAll / 10)) {
      setPageNumber(pageNumber + 1);
    }
    window.scrollTo(0, 0);
  };
  const decressFunctionAll = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
    window.scrollTo(0, 0);
  };

  const filterDataAll = useCallback(debounce(getUserTrx, 1000), []);
  useEffect(() => {
    filterDataAll(pageNumber, searchData);
  }, [pageNumber, searchData]);

  return (
    <>
      <Layout>
        <section className="transactions-sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="dashboard-white-box">
                  <div className="w-100">
                    <h2 className="inner-page-heading mb-5">All Users</h2>

                    <Row>
                      <Col lg={3}>
                        <div>
                          <InputGroup className="p-3">
                            <Form.Control
                              className="mb-0 "
                              type="text"
                              placeholder="Search...."
                              name="searchData"
                              onChange={(e) => {
                                setSearchData(e.target.value);
                              }}
                              value={searchData}
                            />
                          </InputGroup>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <button
                            className="common-btn p-0"
                            onClick={() => {
                              setSearchData("");
                            }}
                          >
                            Clear Filter
                          </button>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div>
                          <ExportToExcel type="UserList" />
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
                                  <th width="20%">Date</th>
                                  <th width="10%">Referral Code</th>
                                  <th width="10%">Referral From</th>
                                  <th width="10%">Phone No</th>
                                  <th width="10%">Total referral Amt</th>
                                  <th width="10%">Total Withdrawal Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {showData?.length > 0 ? (
                                  showData.map((items, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>

                                        <td>{items?.fullName}</td>

                                        <td className="mail-break">
                                          {items?.email}
                                        </td>
                                        <td>
                                          {moment(items?.createdAt).format(
                                            "lll"
                                          )}
                                        </td>
                                        <td>{items?.referral_code}</td>

                                        <td>{items?.referral_from}</td>
                                        <td>
                                          +{items.countryCode}-{items.mobile}
                                        </td>
                                        <td>
                                          {(
                                            items.total_referral_amount_earn * 1
                                          ).toFixed(2)}
                                        </td>
                                        <td>
                                          {(
                                            items.total_withdrawal_amount * 1
                                          ).toFixed(2)}
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
                            {showData?.length > 0 ? (
                              <div className="d-flex justify-content-center paginate-register">
                                <div className="d-flex align-items-center">
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      decressFunctionAll();
                                    }}
                                  >
                                    <i className="fa fa-angle-left"></i>
                                  </button>
                                  <button className="common-btn m-2">
                                    Page {pageNumber} of{" "}
                                    {Math.ceil(totalOrderCountAll / 10)}
                                  </button>
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      incressFunctionAll();
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
      </Layout>
    </>
  );
};

export default AdminUserList;
