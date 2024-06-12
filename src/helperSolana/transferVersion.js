import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  signAndSendTransaction,
  createTransferTransactionV0,
} from "./transferversionsol";
import config from "./../JSON/config.json"
import { toast } from "react-toastify";

let network = config.RPC;
const connection = new Connection(network, "confirmed");

let ownerpublicKey = new PublicKey(
  config.SolanaOwnerWallet
);

export const handleSignAndSendTransactionV0 = async (amount) => {
  let provider = window.phantom?.solana;
  let ConnectPrv = await provider.connect();
  if (!provider) return;
  const ids = toast.loading(
    "Please Check your Phantom Wallet for any Pending Transaction"
  );
  try {
    const transactionV0 = await createTransferTransactionV0(
      ConnectPrv.publicKey,
      connection,
      ownerpublicKey,
      amount
    );
    const signature = await signAndSendTransaction(provider, transactionV0);
    const expectedBlockTime = 1000; // 1sec
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    let transactionReceipt = null;
    let transactionReceipt1;
    while (transactionReceipt != "confirmed") {
      transactionReceipt1 = await connection.getSignatureStatus(signature);
      // gettrx = await connection.getParsedTransaction(signature,{ maxSupportedTransactionVersion: 0 });
      transactionReceipt = transactionReceipt1?.value?.confirmationStatus;
      await sleep(expectedBlockTime);
    }
    let status = transactionReceipt1?.value?.status?.ok;
    let error = transactionReceipt1?.value?.err;

    if (status == null && error == null) {
      toast.update(ids, {
        render: "Wallet Transaction Success",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      return signature;

      // toast.success('Transaction Success')
    } else {
      toast.update(ids, {
        render: "Transaction Reverted",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      // toast.error('Transaction Failed');

      window.location.reload();
    }
  } catch (error) {
    toast.error("Transaction Failed");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};
