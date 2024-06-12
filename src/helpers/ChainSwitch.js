import { Provider } from "./Web3Helper";
import Chain from "../JSON/Chain.json";
import { toast } from "react-toastify";
import { _switchNetwork } from "./web3Model";

const ChainList = Chain.Chains;

export const commonSwitch = async (requireNetwork, type) => {
  let chainId = ChainList.filter((chain) => chain.chainId === requireNetwork);
  chainId = chainId[0];
  if (type === "walletConnect") {
    // setTimeout(async () => {
    const id = toast.loading("Please Check Your Wallet");
    try {
      await _switchNetwork(chainId.chainId);
      toast.update(id, {
        render: `You have successfully switched to ${chainId.name} network`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return true;
    } catch (error) {
      toast.update(id, {
        render: "Failed to switch to the network",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return false;
    }
    // }, 5000);
  } else {
    const provider = await Provider(type);
    const id = toast.loading("Please Check Your Wallet");
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId.chainIdHex }],
      });
      
      toast.update(id, {
        render: `You have successfully switched to ${chainId.name} network`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        await provider
          .request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainId.chainIdHex,
                chainName: `${chainId.name} Network`,
                nativeCurrency: {
                  name: `${chainId.coinName}`,
                  symbol: `${chainId.symbol}`,
                  decimals: 18,
                },
                rpcUrls: [chainId.rpc],
                blockExplorerUrls: [chainId.explorer],
              },
            ],
          })
          .catch((error) => {
            return false;
          });
        toast.update(id, {
          render: `You have successfully Added & switched to ${chainId.name} network`,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        return true;
      }
      toast.update(id, {
        render: "Failed to switch to the network",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return false;
    }
  }
};
