import { ECouponType, EOrderStatus } from "@/type/enum";
import { model, models, Schema } from "mongoose";

export interface ICoupon extends Document {
  _id: string;
  title: string;
  code: string;
  dateStart: Date;
  dateEnd: Date;
  maxNumber: number;
  used: number;
  status: boolean;
  type: ECouponType;
  value: number;
  courses: Schema.Types.ObjectId[];
  create_at: Date;
}
const couponSchema = new Schema<ICoupon>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  maxNumber: {
    type: Number,
    required: true,
  },
  used: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: Object.values(ECouponType),
    default: ECouponType.PERCENT,
  },
  value: {
    type: Number,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  create_at: {
    type: Date,
    default: Date.now,
  },
});
const Coupon = models.Coupon || model<ICoupon>("Coupon", couponSchema);
export default Coupon;
