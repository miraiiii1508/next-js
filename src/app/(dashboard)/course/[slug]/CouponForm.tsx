"use client";
import { Input } from "@/components/ui/input";
import { ICoupon } from "@/database/coupon.modal";
import { getValidateCoupon } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/type/enum";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CouponForm = ({
  originalPrice,
  setPrice,
  courseId,
  couponCode,
  setCouponCode,
  setCouponValue
}: {
  originalPrice: number;
  courseId: string;
  couponCode:string,
  setPrice: Dispatch<SetStateAction<number>>;
  setCouponCode:Dispatch<SetStateAction<string>>,
  setCouponValue:Dispatch<SetStateAction<ICoupon | undefined>>
}) => {

  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    setIsApplied(false);
  }, [couponCode]);
  const handleChangeCoupon = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCouponCode(e.target.value);
    },
    500
  );
  const handleApplyCoupon = async () => {
    if (isApplied) return;
    try {
      const response = await getValidateCoupon({
        params: { code: couponCode.toUpperCase(), course: courseId },
      });
      const couponType = response?.type;
      let finalPrice = originalPrice;
      if (!response?.code) {
        toast.error("Mã giảm giá không hợp lệ !");
        return;
      }
      if (couponType === ECouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * response?.value) / 100;
      } else {
        finalPrice = originalPrice - response?.value;
      }
      setPrice(finalPrice);
      setCouponValue(response );
      setIsApplied(true);
      setCouponCode("");
      toast.success("Áp dụng mã giảm giá thành công !");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="mt-5 relative">
      <Input
        placeholder="Nhập mã giảm giá"
        className="pr-20 uppercase font-semibold"
        onChange={handleChangeCoupon}
        defaultValue={couponCode}
      />
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
