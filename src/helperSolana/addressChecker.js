import { PublicKey } from "@solana/web3.js";

export const addreshCheck = async (data) => {
  try {
    let valid = new PublicKey(data);
    if (valid.toString() == data) {
      return true;
    }
  } catch (err) {
    return false;
  }
};
