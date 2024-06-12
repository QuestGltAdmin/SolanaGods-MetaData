import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import config from "./../JSON/config.json"
import { toast } from "react-toastify";

let network = config.RPC;
const connection = new Connection(network);

export const verifySolTrxManual = async (signature) => {
  try {
    console.log(signature);
    let transactionReceipt = null;
    let transactionReceipt1;
    // while (transactionReceipt != "confirmed") {
      transactionReceipt1 = await connection.getSignatureStatus(signature);
      console.log(transactionReceipt1);
      let gettrx = await connection.getParsedTransaction(signature,{ maxSupportedTransactionVersion: 0 });
      console.log(gettrx);
   
      //   transactionReceipt = transactionReceipt1?.value?.confirmationStatus;
    // }
    let status = transactionReceipt1?.value?.status?.ok;
    let error = transactionReceipt1?.value?.err;
  } catch (error) {
    console.log(error);
    toast.error("Transaction Failed");
  }
};
