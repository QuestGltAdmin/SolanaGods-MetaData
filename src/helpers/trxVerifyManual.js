import Web3 from "web3";
import Chain from "../JSON/Chain.json";

const ChainList = Chain.Chains;

export const verifyTrxManual = async (data) => {
  try {
    let chainId = ChainList.filter((chain) => chain.chainId === data.chainId);
    chainId = chainId[0];
    const web3js = new Web3(new Web3.providers.HttpProvider(chainId.rpc));
    let transactionReceipt = await web3js.eth.getTransactionReceipt(data.hash);
    let transactionReceipt1 = await web3js.eth.getTransaction(data.hash);

    let Owneraddress = data.Owneraddress;
    let amountInWei = web3js.utils.toWei(
      data.amount.toString(),
      "ether"
    );
    if (
      transactionReceipt.to.toLowerCase() == Owneraddress.toLowerCase() &&
      transactionReceipt1.value == amountInWei
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const verifyTrxUSDTManual = async (data) => {
  try {
    let chainId = ChainList.filter((chain) => chain.chainId === data.chainId);
    chainId = chainId[0];
    const web3connect = new Web3(new Web3.providers.HttpProvider(chainId.rpc));
    let transactionReceipt = await web3connect.eth.getTransactionReceipt(
      data.hash
    );

    let Owneraddress = data.Owneraddress;
    let amountInWei = web3connect.utils.toWei(
      data.amount.toString(),
      "ether"
    );
    let amountInRes = transactionReceipt.logs[0].data;
    amountInRes = parseInt(amountInRes);
    let addressInRes = transactionReceipt.logs[0].topics[2];
    let finalAddress = await web3connect.eth.abi.decodeParameter(
      "address",
      addressInRes
    );
    if (
      finalAddress.toLowerCase() == Owneraddress.toLowerCase() &&
      amountInRes == amountInWei
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }

};
