import { web3 } from "../helpers/Web3Helper";
import Web3 from "web3";
import { getNetworkDetail } from "../helpers/web3Model";

export const verifyTrx = async (data) => {
  if (data.type === "walletConnect") {
    try {
      let network = await getNetworkDetail();
      let web3connect = new Web3(
        new Web3.providers.HttpProvider(network.chain.rpcUrls.default.http[0])
      );
      let transactionReceipt = await web3connect.eth.getTransaction(data.hash);
      let Owneraddress = data.Owneraddress;
      let amountInWei = web3connect.utils.toWei(
        data.amount.toString(),
        "ether"
      );
      if (
        transactionReceipt.to.toLowerCase() == Owneraddress.toLowerCase() &&
        parseInt(transactionReceipt.value) == parseInt(amountInWei)
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    try {
      const web3connect = await web3(data.type);
      let transactionReceipt = await web3connect.eth.getTransaction(data.hash);

      let Owneraddress = data.Owneraddress;
      let amountInWei = web3connect.utils.toWei(
        data.amount.toString(),
        "ether"
      );

      if (
        transactionReceipt.to == Owneraddress &&
        transactionReceipt.value == amountInWei
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
};

export const verifyTrxUSDT = async (data) => {
  if (data.type === "walletConnect") {
    try {
      let network = await getNetworkDetail();
      let web3connect = new Web3(
        new Web3.providers.HttpProvider(network.chain.rpcUrls.default.http[0])
      );
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
  } else {
    try {
      const web3connect = await web3(data.type);
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
  }
};
