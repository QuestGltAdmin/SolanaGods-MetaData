import Web3 from "web3";
import { ethers } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const providerOptions = {
  /* See Provider Options Section */

  walletconnect: {
    // package: WalletConnectProvider,
    options: {
      rpc: {
        56: "https://bsc-dataseed2.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545",
        1: "https://mainnet.infura.io/v3/41e0714609d84b088e97155fe8849958",
        5: "https://goerli.infura.io/v3/41e0714609d84b088e97155fe8849958",
        11155111:
          "https://sepolia.infura.io/v3/41e0714609d84b088e97155fe8849958",
        137: "https://rpc-mainnet.maticvigil.com",
        80001: "https://matic-mumbai.chainstacklabs.com",
        43114: "https://api.avax.network/ext/bc/C/rpc",
        43113: "https://rpc.ankr.com/avalanche_fuji",
      },
      // network: "mainnet",
      // chainId: 56,
      // infuraId: "bnb1a5cae5d9hp0we9cx9v02n9hvmt94nnuguv0fav",
    },
  },
};

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  disableInjectedProvider: false,
});

export const web3 = async (type) => {
  let provider;
  let web3;
  if (type === "metamask") {
    if (typeof window.ethereum === "undefined") {
      console.error("Please install Metamask");
    } else {
      await window.ethereum
        .enable()
        .then(function (accounts) {
          provider = new ethers.providers.Web3Provider(window.ethereum);
          provider = provider.provider;
          web3 = new Web3(provider);
        })
        .catch(function (error) {
          console.error(
            "Error accessing Ethereum accounts with Metamask",
            error
          );
        });
      return web3;
    }
    return web3;
  }
  if (type === "Coinbase") {
    if (typeof window.ethereum === "undefined") {
      console.error("Please install Coinbase");
    } else {
      await window.ethereum
        .enable()
        .then(function (accounts) {
          provider = new ethers.providers.Web3Provider(window.ethereum);
          provider = provider.provider;
          web3 = new Web3(provider);
        })
        .catch(function (error) {
          console.error(
            "Error accessing Ethereum accounts with Coinbase",
            error
          );
        });
      return web3;
    }
    return web3;
  }
  if (type === "walletConnect") {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
  } else {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
  }
  return web3;
};

export const Provider = async (type) => {
  let provider;
  if (type === "metamask") {
    if (typeof window.ethereum === "undefined") {
      console.error("Please install Metamask");
    } else {
      await window.ethereum
        .enable()
        .then(function (accounts) {
          provider = new ethers.providers.Web3Provider(window.ethereum);
          provider = provider.provider;
        })
        .catch(function (error) {
          console.error(
            "Error accessing Ethereum accounts with Metamask",
            error
          );
        });
    }
  } else if (type === "Coinbase") {
    if (typeof window.ethereum === "undefined") {
      console.error("Please install Coinbase");
    } else {
      await window.ethereum
        .enable()
        .then(function (accounts) {
          provider = new ethers.providers.Web3Provider(window.ethereum);
          provider = provider.provider;
        })
        .catch(function (error) {
          console.error(
            "Error accessing Ethereum accounts with Coinbase",
            error
          );
        });
    }
  } else if (type === "walletConnect") {
    provider = await web3Modal.connect();
  } else {
    provider = await web3Modal.connect();
  }
  return provider;
};

export const Disconnect = async () => {
  const disconnect = await web3Modal.clearCachedProvider();
  return disconnect;
};
