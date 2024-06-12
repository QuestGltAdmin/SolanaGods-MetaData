import { createSlice } from "@reduxjs/toolkit";
import { decryptData } from "../../helpers/encryption";

const isAuthenticated = localStorage.getItem("isAuthenticated");
const isUserAuthenticated = localStorage.getItem("isUserAuthenticated");
const userRole = localStorage.getItem("userRole");
const userData = localStorage.getItem("userData");
const WalletEVM = localStorage.getItem("WalletEVM");
const WalletSOL = localStorage.getItem("WalletSOL");
const uniIns = localStorage.getItem("uniIns");
const uniSign = localStorage.getItem("uniSign");
const proupdatedata = localStorage.getItem("saveprodata");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    WalletEVM: !!WalletEVM && WalletEVM !== "undefined"?  JSON.parse(WalletEVM) : {},
    WalletSOL: !!WalletSOL ? JSON.parse(WalletSOL) : {},
    uniIns: !!uniIns ? JSON.parse(uniIns) : {},
    uniSign: !!uniSign ? JSON.parse(uniSign) : {},
    isAuthenticated: !!isAuthenticated ? true : false,
    isUserAuthenticated: !!isUserAuthenticated ? true : false,
    userRole: !!userRole ? userRole : "",
    user: !!userData ? JSON.parse(userData) : {},
    authToken: "",
    errorMsg: "",
    proupdate: !!proupdatedata ? JSON.parse(proupdatedata) : {},
  },

  reducers: {
    loginSaga: (state, action) => {
      return { ...state };
    },

    userLoginSaga: (state, action) => {
      return { ...state };
    },
    userLoginStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    userloginSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: true,
        user: action.payload,
        // userRole: action.payload.user_role,
        // authToken: action.payload.token,
      };
    },

    saveprofiledata: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: true,
        proupdate: action.payload,
      };
    },

    userLoginFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: false,
        user: {},
        errorMsg: action.payload,
      };
    },

    logout: (state) => {
      localStorage.clear();
      return {
        ...state,
        isLoading: false,
        WalletEVM: "",
        isUserAuthenticated: false,
        isAuthenticated: false,
        errorMsg: "",
        user: {},
        authToken: "",
      };
    },

    setEVMWallet: (state, action) => {
      localStorage.setItem("WalletEVM", JSON.stringify(action.payload));
      return {
        ...state,
        WalletEVM: action.payload,
      };
    },

    setPhantomWallet: (state, action) => {
      localStorage.setItem("WalletSOL", JSON.stringify(action.payload));
      return {
        ...state,
        WalletSOL: action.payload,
      };
    },
  },
});

export const {
  logout,
  setEVMWallet,
  userLoginSaga,
  userLoginStart,
  saveprofiledata,
  userloginSuccess,
  userLoginFail,
  setPhantomWallet,
} = authSlice.actions;

export default authSlice.reducer;
