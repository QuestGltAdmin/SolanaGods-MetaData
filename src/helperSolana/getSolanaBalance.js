import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import config from "./../JSON/config.json"

export const getBalanceSOL = async (data) => {
  let network = config.RPC;
  const connection = new Connection(network, "confirmed");
  let keyData = new PublicKey(data);
  let balance = await connection.getAccountInfo(keyData);
  balance = balance.lamports / LAMPORTS_PER_SOL;
  return balance;
};
