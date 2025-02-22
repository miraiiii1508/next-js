import { TCreateOrder, TGetAllOrderParams } from "@/type/type";
import { connectDB } from "../moogose";
import Order, { IOder } from "@/database/order.modal";
import { FilterQuery } from "mongoose";
import User from "@/database/user.modal";

export async function createOrder(params: TCreateOrder) {
  try {
    connectDB();
    const newOrder = await Order.create(params);
    const findUser = await User.findById(params.user);
    if(!findUser) return null;
    findUser.course.push(params.course);
    await findUser.save();
    return JSON.parse(JSON.stringify(newOrder));
  } catch (e) {
    console.error(e);
  }
}
// export async function addCourseToUser({params}:{params:any}){
//   try{
//     connectDB();
//     const 
//   }
// }
export async function getAllOrderCourseAdmin(
  params: TGetAllOrderParams
): Promise<IOder[] | undefined> {
  try {
    const { page, limit, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Order> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    connectDB();
    const orders = await Order.find(query)
      .populate({
        path: "course",
        select: "title",
        model: "Course",
      })
      .populate({
        path: "user",
        model: "User",
        select: "name",
      })
      .skip(skip)
      .limit(limit)
      .sort({create_at: -1 });
    return orders;
  } catch (e) {
    console.error(e);
  }
}
