import {
  createMomoPayment,
  MomoPaymentRequest,
} from "@/lib/actions/PaymentMomoAction";
import { createPaymentUrl } from "@/lib/paymentVNPay";
export const PaymentWithMomo = async ({
  _id,
  amount,
  url,
}: {
  _id: string;
  amount: number;
  url: string;
}) => {
  try {
    const params: MomoPaymentRequest = {
      accessKey: "F8BBA842ECF85",
      secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
      partnerCode: "MOMO",
      amount: amount,
      orderInfo: `Thanh toán hoá đơn KH${_id}`,
      redirectUrl: url,
      ipnUrl: url,
      requestType: "payWithMethod",
      autoCapture: true,
      lang: "vi",
    };

    const response = await createMomoPayment(params);
    if (response && response.payUrl) {
      window.location.href = response.payUrl;
    }
  } catch (error) {
    console.error("Error during payment creation:", error);
  }
};
export const paymentWithVnPay = async ({
  amount,
  url,
}: {
  amount: number;
  url: string;
}) => {
  try {
    const paymentUrl = await createPaymentUrl(amount, url);
    window.location.href = paymentUrl;
  } catch (error) {
    console.error("Error creating payment URL:", error);
  }
};
