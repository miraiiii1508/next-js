"use client";
import { IconReplay } from "@/app/component/icons";
import { ICoupon } from "@/database/coupon.modal";
import { useState } from "react";
import ButtonEnroll from "./[slug]/ButtonEnroll";
import CouponForm from "./[slug]/CouponForm";
import { TCourseUpdateLecture } from "@/type/type";
const CourseWidget = ({
  data,
  userId,

}: {
  data: TCourseUpdateLecture;
  userId: string | null;

}) => {
  const [price, setPrice] = useState<number>(data.sale_price);
  const [couponCode, setCouponCode] = useState("");
  const [couponValue , setCouponValue] = useState<ICoupon | undefined>(undefined)

  return (
    <div className="responsiveSellCourse ">
      <div className="bg-white dark:bg-grayDarker rounded-lg p-5 ">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-primary text-xl font-bold">
            {price.toLocaleString("de-DE")}đ
          </strong>
          <span className="text-slate-400 line-through text-sm">
            {data?.price.toLocaleString("de-DE")}đ
          </span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
            {data?.price && data?.sale_price
              ? Math.floor(100 - (data.sale_price / data.price) * 100)
              : 0}
            %
          </span>
        </div>
        <h3 className="font-bold mb-3 text-sm">Khoá học bao gồm có:</h3>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-200">
          <li className="flex items-center gap-2">
            <IconReplay className="size-4" />
            <span>30h học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconReplay className="size-4" />
            <span>Video full Hd</span>
          </li>
          <li className="flex items-center gap-2">
            <IconReplay className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconReplay className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <ButtonEnroll
          slug={data?.slug}
          price={price}
          courseId={data?._id}
          userId={userId}
          sale_price={data?.sale_price}
          orginal_price={data?.price}
          coupon={couponValue || undefined}
        />
        <CouponForm
          originalPrice={data?.sale_price}
          setPrice={setPrice}
          courseId={data?._id}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          setCouponValue={setCouponValue}
        />
      </div>
    </div>
  );
};

export default CourseWidget;
