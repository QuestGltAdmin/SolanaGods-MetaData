import Web3 from "web3";
import Chains from "../JSON/Chain.json";
let chainList = Chains.Chains;

export const getCoinBalance = async (data) => {
  let chainData = chainList.filter(
    (contract) => contract.chainId === data.chainId
  );
  chainData = chainData[0];
  try {
    let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));
    const walletAddress = web3connect.utils.toChecksumAddress(data.address);

    let Coinbalance = web3connect.eth.getBalance(walletAddress);
    return Coinbalance;
  } catch (err) {
    console.log(err);
  }
};
