"use server";

import Coupon, { ICoupon } from "@/database/coupon.modal";
import { connectDB } from "../moogose";
import { TCreateCoupon, TGetFilterParam, TUpdateCoupon } from "@/type/type";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { get } from "lodash";

export async function createCoupon(params: TCreateCoupon) {
  try {
    connectDB();
    const checkCouponCode = await Coupon.findOne({ code: params.code });
    if (checkCouponCode) {
      return {
        success: false,
        message: "Mã code đã tồn tại!",
      };
    }
    const couponRegex = /^[A-Z0-9]{3,10}$/;
    if (!couponRegex.test(params.code)) {
      return {
        success: false,
        message: "Mã code không hợp lệ(Chỉ chấp nhận ký tự hoa và số) !",
      };
    }
    const newCoupon = await Coupon.create(params);
    if (!newCoupon) {
      return {
        success: false,
        message: "Tạo mã khuyến mãi thất bại!",
      };
    }
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (e) {
    console.error(e);
  }
}
export async function getCoupons(
  params: TGetFilterParam
): Promise<ICoupon[] | undefined> {
  const { page = 1, limit = 10, search, status } = params;
  try {
    connectDB();
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Coupon> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const coupons = await Coupon.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });
    return coupons;
  } catch (e) {
    console.error(e);
  }
}
export async function getCouponByCode({
  params,
}: {
  params: { code: string };
}): Promise<ICoupon | undefined> {
  try {
    connectDB();
    const getCoupon = await Coupon.findOne({ code: params.code });
    return JSON.parse(JSON.stringify(getCoupon));
  } catch (e) {
    console.error(e);
  }
}
export async function getValidateCoupon({
  params,
}: {
  params: { code: string; course: string };
}): Promise<ICoupon | undefined> {
  try {
    connectDB();
    const getCoupon = await Coupon.findOne({ code: params.code });
    let isActive = true;
    if (!getCoupon?.status) isActive = false;
    if (getCoupon?.start_date && new Date(getCoupon?.start_date) > new Date())
      isActive = false;
    if (getCoupon?.end_date && new Date(getCoupon?.end_date) < new Date())
      isActive = false;
    if (getCoupon?.used >= getCoupon?.max_number) isActive = false;
    const coupon = JSON.parse(JSON.stringify(getCoupon));
    if (
      !coupon?.courses
        .map((course: string) => course.toString())
        .includes(params.course)
    )
      isActive = false;
    return isActive ? coupon : undefined;
  } catch (e) {
    console.error(e);
  }
}
export async function updateCoupon(param: TUpdateCoupon) {
  try {
    connectDB();
    await Coupon.findByIdAndUpdate({ _id: param._id }, param.updateData, {
      new: true,
    });
    revalidatePath("/manage/coupon");
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (e) {
    console.error(e);
  }
}
export async function deleteCoupon(id: string) {
  try {
    if (!id) return;
    connectDB();
    await Coupon.findByIdAndDelete(id);
    revalidatePath("/manage/coupon");
  } catch (e) {
    console.error(e);
  }
}
