import React from "react";
import { downloadExcel } from "react-export-table-to-excel/lib";
import axiosMain from "../http/axios/axios_main";
import useAuth from "../hooks/useAuth";
import moment from "moment";

export default function ExportToExcel({ type }) {
  const { user } = useAuth();

  if (type === "UserList") {
    const exportData = async () => {
      const getApiDataToExport = await axiosMain.get(
        "/SOLGODS_ADMIN/user-list?page=&limit=&search=",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      console.log(getApiDataToExport);
      if (getApiDataToExport?.data?.status) {
        const header = [
          "fullName",
          "email",
          "Data",
          "Referral Code",
          "Referral From",
          "Phone No",
          "Total referral Amt",
          "Total Withdrawal Amount",
        ];
        const dataMap = getApiDataToExport?.data?.data?.content?.map(
          (items, intex) => {
            return {
              fullName: items.fullName,
              email: items.email,
              Data: moment(items?.createdAt).format("lll"),
              ReferralCode: items?.referral_code,
              ReferralFrom: items?.referral_from,
              PhoneNo: `+${items.countryCode}-${items.mobile}`,
              TotalReferralAmt: (items.total_referral_amount_earn * 1).toFixed(
                2
              ),
              TotalWithdrawalAmount: (
                items.total_withdrawal_amount * 1
              ).toFixed(2),
            };
          }
        );

        downloadExcel({
          fileName: "User List",
          sheet: "react-export-table-to-excel",
          tablePayload: {
            header,
            body: dataMap,
          },
        });
      }
    };

    return (
      <button
        className="common-btn"
        onClick={() => {
          exportData();
        }}
      >
        Export
      </button>
    );
  }
  if (type === "UnClaimedTrx") {
    const exportData = async () => {
      const getApiDataToExport = await axiosMain.get(
        "/SOLGODS_ADMIN/get-unclaimed-transaction?page=&limit=&isHashUpdate=&search=",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      console.log(getApiDataToExport);
      if (getApiDataToExport?.data?.status) {
        const header = [
          "Name",
          "Email",
          "Buy Address",
          "SOL Address",
          "Buy Amount",
          "SOLGODS Amount",
          "Date",
          "Payment Trx Hash",
          "Status",
        ];
        const dataMap = getApiDataToExport?.data?.data?.content?.map(
          (items, intex) => {
            return {
              Name: items.userName,
              Email: items.userEmail,
              BuyAddress: items?.walletAddress,
              SOLAddress: items.solanaWallet,
              BuyAmount: `${(items.amountIn * 1).toFixed(4)} ${
                items?.currency
              }`,
              SOLGODSAmount: (items?.amountOut * 1).toFixed(2),
              Date: moment(items?.createdAt).format("lll"),
              PaymentTrxHash: items?.incomingTrxHash,
              Status: !items?.incomingTrxHash ? "Failed" : items.statusIn,
            };
          }
        );

        downloadExcel({
          fileName: "UnClaimed TRX List",
          sheet: "react-export-table-to-excel",
          tablePayload: {
            header,
            body: dataMap,
          },
        });
      }
    };

    return (
      <button
        className="common-btn"
        onClick={() => {
          exportData();
        }}
      >
        Export
      </button>
    );
  }
  if (type === "ClaimedTrx") {
    const exportData = async () => {
      const getApiDataToExport = await axiosMain.get(
        "/SOLGODS_ADMIN/get-claimed-transaction?page=&limit=&isHashUpdate=&search=",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.token}`,
          },
        }
      );
      console.log(getApiDataToExport);
      if (getApiDataToExport?.data?.status) {
        const header = [
          "Name",
          "Email",
          "Buy Address",
          "SOL Address",
          "Buy Amount",
          "SOLGODS Amount",
          "Date",
          "Payment Trx Hash",
          "Claim Trx Hash",
          "Status",
        ];
        const dataMap = getApiDataToExport?.data?.data?.content?.map(
          (items, intex) => {
            return {
              Name: items.userName,
              Email: items.userEmail,
              BuyAddress: items?.walletAddress,
              SOLAddress: items.solanaWallet,
              BuyAmount: `${(items.amountIn * 1).toFixed(4)} ${
                items?.currency
              }`,
              SOLGODSAmount: (items?.amountOut * 1).toFixed(2),
              Date: moment(items?.createdAt).format("lll"),
              PaymentTrxHash: items?.incomingTrxHash,
              ClaimTrxHash: items?.outgoingTrxHash,
              Status: !items?.incomingTrxHash ? "Failed" : items.statusIn,
            };
          }
        );

        downloadExcel({
          fileName: "Claimed TRX List",
          sheet: "react-export-table-to-excel",
          tablePayload: {
            header,
            body: dataMap,
          },
        });
      }
    };

    return (
      <button
        className="common-btn"
        onClick={() => {
          exportData();
        }}
      >
        Export
      </button>
    );
  }
}
