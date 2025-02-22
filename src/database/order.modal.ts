import { EOrderStatus } from "@/type/enum";
import { model, models, Schema } from "mongoose";

export interface IOder extends Document {
  _id: string;
  code: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: EOrderStatus;
  create_at: Date;
  total: number;
  amount: number;
  discount: number;
  coupon: Schema.Types.ObjectId;
}
const orderSchema = new Schema<IOder>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  status: {
    type: String,
    enum: Object.values(EOrderStatus),
    default: EOrderStatus.COMPLETE,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  discount: {
    type: Number,
    default:0
  },
});
const Order = models.Order || model<IOder>("Order", orderSchema);
export default Order;
