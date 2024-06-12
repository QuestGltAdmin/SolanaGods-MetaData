import React from "react";
import {
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
} from "react-share";
import { FaWhatsapp, FaTelegram, FaEnvelope } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const ReferralShareButton = ({ referralLink }) => {
  const { user, WalletSOL } = useAuth();

  const shareUrl = referralLink;
  const title = `Hey! Join Solana Gods using my referral code ${user.referral_code} and unlock rewards for both of us! You will receive a 5% reward. Register now:`;
  const emailBody = `${title}\n\nRegister now: https://solanagods.com/Register?ref=${user.referral_code}`;
  return (
    <div>
      <WhatsappShareButton url={shareUrl} title={title}>
        <FaWhatsapp />
      </WhatsappShareButton>
      <TelegramShareButton url={shareUrl} title={title}>
        <FaTelegram />
      </TelegramShareButton>
      <EmailShareButton url={shareUrl} subject={title} body={emailBody}>
        <FaEnvelope />
      </EmailShareButton>
    </div>
  );
};

export default ReferralShareButton;
