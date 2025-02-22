import moment from "moment";
import crypto from "crypto";
import qs from "qs";
import axios from "axios";

export function createPaymentUrl(
  amount: number,
  url:string,
  bankCode?: string,
  language: string = "vn",
) {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");

  const ipAddr = "127.0.0.1"; // Use a default IP if no real IP is available

  const tmnCode = "MWHETFTN"; // VNP_TmnCode
  const secretKey = "YRYIU2ZPRKK1T6USGFVMZDG3IMW175OD"; // VNP_HashSecret
  const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // VNP_Url
  const returnUrl = url; // VNP_ReturnUrl
  const orderId = moment(date).format("DDHHmmss");

  const currCode = "VND";
  let vnp_Params: Record<string, string | number>  = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: language,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100, // VNPAY yêu cầu giá trị được nhân với 100
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  return vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });
}
export const createResultVPN = async ({
  orderId,
  transDate,
}: {
  orderId: string;
  transDate: string;
}) => {
  try {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    const date = new Date();

    const tmnCode = "MWHETFTN"; // VNP_TmnCode
    const secretKey = "YRYIU2ZPRKK1T6USGFVMZDG3IMW175OD"; // VNP_HashSecret
    const vnp_Api =
      "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
    const ipAddr = "127.0.0.1";

    const vnp_TxnRef = orderId;
    const vnp_TransactionDate = transDate;

    const vnp_RequestId = moment(date).format("HHmmss");
    const vnp_Version = "2.1.0";
    const vnp_Command = "querydr";
    const vnp_OrderInfo = "Truy van GD ma: " + vnp_TxnRef;

    const vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");
    const data =
      vnp_RequestId +
      "|" +
      vnp_Version +
      "|" +
      vnp_Command +
      "|" +
      tmnCode +
      "|" +
      vnp_TxnRef +
      "|" +
      vnp_TransactionDate +
      "|" +
      vnp_CreateDate +
      "|" +
      ipAddr +
      "|" +
      vnp_OrderInfo;

    const hmac = crypto.createHmac("sha512", secretKey);
    const vnp_SecureHash = hmac.update(Buffer.from(data, "utf-8")).digest("hex");

    const dataObj = {
      vnp_RequestId: vnp_RequestId,
      vnp_Version: vnp_Version,
      vnp_Command: vnp_Command,
      vnp_TmnCode: tmnCode,
      vnp_TxnRef: vnp_TxnRef,
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_TransactionDate: vnp_TransactionDate,
      vnp_CreateDate: vnp_CreateDate,
      vnp_IpAddr: ipAddr,
      vnp_SecureHash: vnp_SecureHash,
    };
    const response = await axios.post(vnp_Api, dataObj, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
function sortObject(obj: Record<string, string | number | undefined>): Record<string, string> {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    if (obj[key] !== undefined) {
      sorted[key] = encodeURIComponent(String(obj[key])).replace(/%20/g, "+");
    }
  }
  return sorted;
}
