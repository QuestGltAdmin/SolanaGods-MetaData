import Web3 from "web3";
import Tokens from "../JSON/TokenListmainnet.json";
import Chains from "../JSON/Chain.json";
import abi from "../ABI/ERC20ABI.json"
let chainList = Chains.Chains;

const TokensList = Tokens.tokens;

export const getUsdtBalance = async (data) => {
  let chainData = chainList.filter(
    (contract) => contract.chainId === data.chainId
  );
  chainData = chainData[0];
  let address = TokensList.filter((token) => token.symbol === data.symbol);
  address = address[0];
  let tokenAddress = address.address;
  tokenAddress = web3connect.utils.toChecksumAddress(tokenAddress);
  let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));
  const usdtContract = new web3connect.eth.Contract(abi, tokenAddress);
  let balance = await usdtContract.methods.balanceOf(data.address).call();

  return balance;
};
