"use server";

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "../moogose";
import User from "@/database/user.modal";
import History, { IHistory } from "@/database/history.modal";
import { TCreateHistoryParams } from "@/type/type";
import { revalidatePath } from "next/cache";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectDB();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.path)
  } catch (e) {
    console.error(e);
  }
}
export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    connectDB();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    const histories = await History.find({
      course: params.course,
      user:findUser._id
    });
    return histories;
  } catch (e) {
    console.error(e);
  }
}
