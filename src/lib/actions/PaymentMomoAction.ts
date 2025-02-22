import axios from "axios";
import crypto from "crypto";

export interface MomoPaymentRequest {
  accessKey: string;
  secretKey: string;
  partnerCode: string;
  amount: number;
  orderInfo: string;
  redirectUrl: string;
  ipnUrl: string;
  requestType: string;
  autoCapture: boolean;
  lang: string;
  extraData?: string;
  orderGroupId?: string;
}

export interface MomoPaymentResponse {
  resultCode: number;
  message: string;
  payUrl?: string; 
  [key: string]: number | string | undefined;
}

export interface MomoPaymentResult {
  resultCode: number;
  message: string;
  payType: string;
  [key: string]: number | string | undefined;
}

function generateSignature(secretKey: string, rawSignature: string): string {
  return crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
}

function buildRawSignature(
  params: MomoPaymentRequest,
  orderId: string,
  requestId: string
): string {
  return (
    `accessKey=${params.accessKey}&amount=${params.amount}&extraData=${
      params.extraData || ""
    }` +
    `&ipnUrl=${params.ipnUrl}&orderId=${orderId}&orderInfo=${params.orderInfo}` +
    `&partnerCode=${params.partnerCode}&redirectUrl=${params.redirectUrl}` +
    `&requestId=${requestId}&requestType=${params.requestType}`
  );
}

export async function createMomoPayment(
  params: MomoPaymentRequest
): Promise<MomoPaymentResponse> {
  const orderId = `${params.partnerCode}${Date.now()}`;
  const requestId = orderId;

  const rawSignature = buildRawSignature(params, orderId, requestId);

  const signature = generateSignature(params.secretKey, rawSignature);

  const requestBody = {
    partnerCode: params.partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: params.amount,
    orderId: orderId,
    orderInfo: params.orderInfo,
    redirectUrl: params.redirectUrl,
    ipnUrl: params.ipnUrl,
    lang: params.lang,
    requestType: params.requestType,
    autoCapture: params.autoCapture,
    extraData: params.extraData || "",
    orderGroupId: params.orderGroupId || "",
    signature: signature,
  };

  try {
    const response = await axios.post<MomoPaymentResponse>(
      "/api/momo-payment",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error during payment creation:",
      error.response?.data || error.message
    );
    throw error;
  }
}
export const createResultMomo = async (
  orderId: string
): Promise<MomoPaymentResult> => {
  const accessKey = 'F8BBA842ECF85';
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  const requestBody = {
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  };
  try {
    const response = await axios.post<MomoPaymentResult>(
      "https://test-payment.momo.vn/v2/gateway/api/refund/query",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
