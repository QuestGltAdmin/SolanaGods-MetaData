import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap-v5";
import Layout from "../../Component/AdminLayout/AdminLayout";
import axiosMain from "../../http/axios/axios_main";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [showData, setShowData] = useState("");
  const [showDataCurrency, setShowDataCurrency] = useState([]);
  const [totalReferral, setTotalReferral] = useState("");
  const [totalUser, setTotalUser] = useState("");
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const payload = {};
      const getData = await axiosMain.post(
        "/SOLGODS_ADMIN/admin-dashboard",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      console.log(getData);
      if (getData?.data?.status) {
        setShowDataCurrency(getData?.data?.data?.currency);
        setShowData(getData?.data?.data?.totalPurchaseToken);
        setTotalUser(getData?.data?.data?.totalUser);
        setTotalReferral(getData?.data?.data?.totalReferral);
      }
    } catch (err) {}
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
                    <h2 className="inner-page-heading">Admin Dashboard</h2>
                    <Row>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash m-2">
                          <p>Total Token Purchased</p>
                          <h4>
                            <span>SGODS </span>
                            {showData !== 0
                              ? (showData * 1).toFixed(4)
                              : "0.0000"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash m-2">
                          <p>Total Referral</p>
                          <h4>
                            <span>SGODS </span>
                            {totalReferral !== 0
                              ? (totalReferral * 1).toFixed(4)
                              : "0.0000"}
                          </h4>
                        </div>
                      </Col>
                      <Col lg={4} md={6} sm={6} xs={12}>
                        <div className="shadow-box-dash m-2">
                          <p>Total User</p>

                          <h4>{totalUser}</h4>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {showDataCurrency?.length > 0
                        ? showDataCurrency.map((items, index) => {
                            return (
                              <Col lg={4} md={6} sm={6} xs={12}>
                                <div className="shadow-box-dash m-2">
                                  <p>Total {items.currency} Collected</p>
                                  <h4>
                                    {items.total !== 0
                                      ? (items.total * 1).toFixed(4)
                                      : "0.0000"}
                                  </h4>
                                </div>
                              </Col>
                            );
                          })
                        : ""}
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

export default AdminDashboard;
