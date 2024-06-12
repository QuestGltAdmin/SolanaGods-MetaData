// var CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js"
import configData from "./../JSON/config.json"

const JWT = configData.JWTKey;


export const encryptData = async (text) => {
  try {
    text = text.toString();
    let hashedPass = CryptoJS.AES.encrypt(text, JWT);
    hashedPass = hashedPass.toString();
    return hashedPass;
  } catch (error) {
    throw error;
  }
};

export const encryptDataPath = async (text) => {
  try {
    text = JSON.stringify(text);
    let hashedPass = CryptoJS.AES.encrypt(text, JWT);
    hashedPass = hashedPass.toString();
    return hashedPass;
  } catch (error) {
    throw error;
  }
};

export const decryptData = async (text) => {
  try {
    var bytes = CryptoJS.AES.decrypt(text, JWT);
    let data = bytes.toString(CryptoJS.enc.Utf8);
    return data;
  } catch (error) {
    throw error;
  }
};
