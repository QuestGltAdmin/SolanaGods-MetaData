import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Verify_account from "./Pages/Verify_account";
import Otp_verification from "./Pages/Otp_verification";
import Forgot_password from "./Pages/Forgot_password";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Transactions from "./Pages/Dashboard/Transactions";
import Profile from "./Pages/Dashboard/Profile";
import { Buycoin } from "./Pages/Dashboard/Buycoin";
import { ToastContainer } from "react-toastify";
import VerifyOtpForgot from "./Pages/VerifyOtpForgot";
import ResetPassword from "./Pages/ResetPassword";
import UserPrivateRoute from "./PrivateRoute/UserPrivateRoute";
import * as buffer from "buffer";
import ReferEarn from "./Pages/Dashboard/ReferEarn";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminPrivateRoute from "./PrivateRoute/AdminPrivateRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminUserList from "./Pages/Admin/AdminUserList";
import AdminTransaction from "./Pages/Admin/AdminTransaction";
import AdminProfile from "./Pages/Admin/AdminProfile";
import AdminReferralList from "./Pages/Admin/AdminReferralList";
import { BuycoinManual } from "./Pages/Dashboard/BuycoinManual";
import { Homepage } from "./Pages/Homepage";
import Aos from "aos";
import { Privacy } from "./Pages/Privacy";
import { Terms } from "./Pages/Terms";
import { Airdrop } from "./Pages/Airdrop";
import AdminTransactionManual from "./Pages/Admin/AdminTransactionManual";
import AdminTransactionWithoutHash from "./Pages/Admin/AdminTransactionWithoutHash";
import QueryHandler from "./QueryHandler";

window.Buffer = buffer.Buffer;
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <QueryHandler>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Verify_account" element={<Verify_account />} />
          <Route path="/Otp_verification" element={<Otp_verification />} />
          <Route path="/verify_otp_forgot" element={<VerifyOtpForgot />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/Forgot_password" element={<Forgot_password />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/airdrop" element={<Airdrop />} />
          <Route
            path="/refer-earn"
            element={
              <UserPrivateRoute>
                <ReferEarn />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <UserPrivateRoute>
                <Dashboard />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/Transactions"
            element={
              <UserPrivateRoute>
                <Transactions />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <UserPrivateRoute>
                <Profile />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/Buycoin"
            element={
              <UserPrivateRoute>
                <Buycoin />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/BuycoinManual"
            element={
              <UserPrivateRoute>
                <BuycoinManual />
              </UserPrivateRoute>
            }
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/user-list"
            element={
              <AdminPrivateRoute>
                <AdminUserList />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/all-trx"
            element={
              <AdminPrivateRoute>
                <AdminTransaction />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/all-trx-manual"
            element={
              <AdminPrivateRoute>
                <AdminTransactionManual />
              </AdminPrivateRoute>
            }
          />{" "}
          <Route
            path="/all-trx-without-hash"
            element={
              <AdminPrivateRoute>
                <AdminTransactionWithoutHash />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <AdminPrivateRoute>
                <AdminProfile />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin-referral"
            element={
              <AdminPrivateRoute>
                <AdminReferralList />
              </AdminPrivateRoute>
            }
          />
        </Routes>
        </QueryHandler>
      </BrowserRouter>
    </>
  );
}

export default App;
