import { web3, Provider, Disconnect } from "./Web3Helper";
import { DisconnectWalletConnect, OpenModal, getAccountDetail, reConnect, web3Modal } from "./web3Model";

export const Connect = async (type) => {
  if (type === "walletConnect") {
    setTimeout(async () => {
      let account = await reConnect();
      if (account) {
        dispatch("ACCOUNT_CONNECTED", account);
        return account;
      } else {
        let _web3Modal = await web3Modal();
        await OpenModal();
        _web3Modal.subscribeEvents(async (e) => {
          account = await getAccountDetail();
          if (account) {
            dispatch(e.data.event, account);
          }
          if(e.data.event == "MODAL_CLOSE"){
            window.location.reload();
          }
        });
      }
    }, 2000);
  } else {
    const web3connect = await web3(type);

    const accounts = await web3connect.eth.getAccounts();

    let selectedAccount = accounts[0];
    const chainId = await web3connect.eth.getChainId();
    return {
      selectedAccount: selectedAccount,
      chainId: chainId,
      type,
    };
  }
};


export const ReConnect = async (type) => {
  if (type === "walletConnect") {
    setTimeout(async () => {
      let account = await reConnect();
      if (account) {
        dispatch("ACCOUNT_CONNECTED", account);
      }
    }, 2000);
  } else {
    const web3connect = await web3(type);

    const accounts = await web3connect.eth.getAccounts();

    let selectedAccount = accounts[0];
    const chainId = await web3connect.eth.getChainId();
    return {
      selectedAccount: selectedAccount,
      chainId: chainId,
      type,
    };
  }
};

export function dispatch(eventName, detail) {
  document.dispatchEvent(new CustomEvent(eventName, { detail }));
}

export const onDisconnect = async (type) => {
  if (type === "walletConnect") {
    DisconnectWalletConnect();
  } else {
    const web3connect = await web3(type);

    const accounts = await web3connect.eth.getAccounts();

    let selectedAccount = accounts[0];

    const provider = await Provider(type);

    console.log("Killing the wallet connection", provider);

    // TODO: Which providers have close method?
    if (provider) {
      // await provider.close();

      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.
      await Disconnect();
      // provider = null;
    }

    selectedAccount = null;
    // Set the UI back to the initial state
    // document.querySelector("#prepare").style.display = "block";
    // document.querySelector("#connected").style.display = "none";
  }
};
