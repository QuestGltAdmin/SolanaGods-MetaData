import { createWeb3Modal } from "@web3modal/wagmi/react";
import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, bsc, polygon } from "viem/chains";
import { walletConnect } from "wagmi/connectors";
import {
  getAccount,
  // getNetwork,
} from "@wagmi/core";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { switchChain } from "@wagmi/core";
import { reconnect , disconnect} from '@wagmi/core'
import configData from "./../JSON/config.json"

// 0. Setup queryClient
// const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
let projectId = configData.ProjectId;
// if (!projectId) throw new Error("Project ID is undefined");

// 2. Create wagmiConfig
const metadata = {
  name: "SGODS",
  description: "SGODS Solana Token",
  url: "https://solanagods.com/",
  icons: ["https://bafybeigesge5mcfs5ipekq7wvjrqnrl6o7nlgknrjqhp6t52x7j75sym2a.ipfs.nftstorage.link/"],
};

// Define chains
const chains = [mainnet, bsc, polygon];
const wagmiConfig = createConfig({
  chains, // Use the defined chains here
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
  ],
});

export const config = () => {
  return wagmiConfig;
}

export const web3Modal = async () => {
  const web3modal = createWeb3Modal({ wagmiConfig, projectId });
  return web3modal;
};

export const OpenModal = async () => {
  let _web3Modal = await web3Modal();
  await _web3Modal.open();
};

export const reConnect = async () => {
    let details = await reconnect(wagmiConfig);
    if (details.length > 0) {
      return {
        selectedAccount: details[0].accounts[0],
        chainId: details[0].chainId,
        type: "walletConnect",
      };;
    }
    return false;
};

export const getAccountDetail = async () => {
  let account = getAccount(wagmiConfig);
  if (account.address) {
    return {
      selectedAccount: account.address,
      chainId: account.chainId,
      type: "walletConnect",
    };
  }
  return false;
};

export const DisconnectWalletConnect = async () => {
  disconnect(wagmiConfig);
};

export const getNetworkDetail = async () => {
  let account = getAccount(wagmiConfig);
  if (account.address) {
    return account;
  }
  return false;
};

export const _switchNetwork = async (ChainId) => {
  try {
    await switchChain(wagmiConfig, { chainId: ChainId });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
