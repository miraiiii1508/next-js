"use client";
import { Button } from "@/components/ui/button";
import { createPaymentUrl } from "@/lib/paymentVNPay";
import { toast } from "react-toastify";
const ButtonPaymentVnp = ({amount ,url}:{amount :number,url:string}) => {
  const handlePayment = async () => {
    try {
      const paymentUrl = await createPaymentUrl(amount , url);
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error creating payment URL:", error);
      toast.error("Có lỗi xảy ra khi tạo URL thanh toán.");
    }
  };

  return (
    <Button onClick={handlePayment} variant={"primary"} className="p-4">
      Thanh toán VN Pay
    </Button>
  );
};

export default ButtonPaymentVnp;
