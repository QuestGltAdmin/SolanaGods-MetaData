import Web3 from "web3"

const web3js = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed2.binance.org/"));

const CheckWallet = async (data) => {
  try {
    let wallet = web3js.utils.isAddress(data)
    return wallet;
  }
  catch (error) {
    return false;
    throw error;
  }
};

export default CheckWallet
