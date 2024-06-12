import Web3 from "web3";
import pairABI from "../ABI/PairABI.json";

const EthPairAddress = "0x63b30de1A998e9E64FD58A21F68D323B9BcD8F85";
const BNBPairAddress = "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE";
const maticPairAddress = "0x3B09e13Ca9189FBD6a196cfE5FbD477C885afBf3";
const solanaPairAddress = "0xAe08C9D357731FD8d25681dE753551BE14C00405";

export const getDollarPrice = async (chainType) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/")
  );
  let pairAddress ;
  if (chainType == "BNB") {
     pairAddress = web3.utils.toChecksumAddress(BNBPairAddress);
  }
  if (chainType == "ETH") {
     pairAddress = web3.utils.toChecksumAddress(EthPairAddress);
  }
  if (chainType == "SOL") {
     pairAddress = web3.utils.toChecksumAddress(solanaPairAddress);
  }
  

  const abi = pairABI;

  const contract = new web3.eth.Contract(abi, pairAddress);
  let reserves = await contract.methods.getReserves().call();
  let reserve0 = reserves._reserve0;
  let reserve1 = reserves._reserve1;

  let token0 = await contract.methods.token0().call();
  let token1 = await contract.methods.token1().call();

  let rate;
  if (token0 == "0x55d398326f99059fF775485246999027B3197955") {
    rate = reserve0 / reserve1;
  } else {
    rate = reserve1 / reserve0;
  }

  return rate;
};

export const getDollarPriceMatic = async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/")
  );
  const pairAddress = web3.utils.toChecksumAddress(maticPairAddress);
  const abi = pairABI;

  const contract = new web3.eth.Contract(abi, pairAddress);
  let reserves = await contract.methods.getReserves().call();
  let reserve0 = reserves._reserve0;
  let reserve1 = reserves._reserve1;

  let token0 = await contract.methods.token0().call();
  let token1 = await contract.methods.token1().call();

  let price1;
  if (token0 == "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
    price1 = reserve0 / reserve1;
  } else {
    price1 = reserve1 / reserve0;
  }

  let price2 = await getDollarPrice("BNB");

  let rate = price2 * price1;

  return rate;
};
