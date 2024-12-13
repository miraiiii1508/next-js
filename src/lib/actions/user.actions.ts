"use server";
import Course, { ICourse } from "@/database/course.modal";
import User, { IUser } from "@/database/user.modal";
import { ECourseStatus } from "@/type/enum";
import { TCreateUserParam } from "@/type/type";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "../moogose";

export async function createUser(params: TCreateUserParam) {
  try {
    connectDB();
    const newUser = await User.create(params);
    return newUser;
  } catch (e) {
    console.error(e);
  }
}
export async function getUserId({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectDB();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) {
      return null;
    }
    return findUser;
  } catch (e) {
    console.error(e);
  }
}
export async function getCourseByUser(): Promise<ICourse[] | undefined | null> {
  try {
    connectDB();
    const { userId } = auth();
    if (!userId) return null;
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path:"course",
      model:Course,
      match:{
       status: ECourseStatus.APPROVED
      }
    });
    if (!findUser) return null;
    return findUser.course;
  } catch (e) {
    console.error(e);
  }
}
