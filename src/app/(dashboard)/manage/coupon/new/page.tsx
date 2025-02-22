import CouponAddNew from "@/app/component/coupon/CouponAddNew";
import Heading from "@/app/component/typography/Heading";

const page = async () => {
  return (
    <div>
       <Heading>Tạo mã giảm giá mới</Heading>
      <CouponAddNew />
    </div>
  );
};

export default page;
