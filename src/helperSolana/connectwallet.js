import { toast } from "react-toastify";

export const ConnectPhantomWallet = async () => {
  const provider = getProvider(); // see "Detecting the Provider"
  try {
    const resp = await provider.connect();
    // console.log(resp.publicKey.toString());
    return { resp, provider };
    // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
  } catch (err) {
    // { code: 4001, message: 'User rejected the request.' }
    console.log(err);
  }
};

export const disconnectPhantomWallet = async () => {
  const provider = getProvider();
  provider.disconnect();
};

const getProvider = () => {
  const provider = window.phantom?.solana;

  if (provider?.isPhantom) {
    return provider;
  } else {
    toast.error("please install phantom wallet");
  }

  // window.open('https://phantom.app/', '_blank');
};
