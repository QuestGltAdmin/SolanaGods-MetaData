import {
  TransactionMessage,
  VersionedTransaction,
  SystemProgram,
  Connection,
  PublicKey,
} from "@solana/web3.js";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const createTransferTransactionV0 = async (
  publicKey,
  connection,
  ownerpublicKey,
  amount
) => {
  //   connection,
  //   ownerpublicKey.toString(),
  //   amount);
  // connect to the cluster and get the minimum rent for rent exempt status
  // perform this step to get an "arbitrary" amount to transfer
  //   let minRent = await connection.getMinimumBalanceForRentExemption(0);

  // get latest `blockhash`
  let blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);

  // create an array with your desired `instructions`
  // in this case, just a transfer instruction
  const instructions = [
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: ownerpublicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    }),
  ];
  // create v0 compatible message
  const messageV0 = new TransactionMessage({
    payerKey: publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  // make a versioned transaction
  const transactionV0 = new VersionedTransaction(messageV0);

  return transactionV0;
};

export const signAndSendTransaction = async (provider, transaction) => {
  try {
    const { signature } = await provider.signAndSendTransaction(transaction);
    return signature;
  } catch (error) {
    // console.warn(error);
    throw new Error(error.message);
  }
};
