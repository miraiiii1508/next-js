"use server";
import User, { IUser } from "@/database/user.modal";
import { TCreateUserParam } from "@/type/type";
import { connectDB } from "../moogose";

export  async function createUser(params: TCreateUserParam) {
  try {
    connectDB();
    const newUser = await User.create(params);
    return newUser;
  } catch (e) {
    console.error(e);
  }
}
export  async function getUserId({userId}: { userId: string }):Promise<IUser | null |undefined > {
  try {
    connectDB()
    const findUser = await User.findOne({clerkId :userId})
    if(!findUser){
        return null
    }
    return findUser
  } catch (e) {
    console.error(e);
  }
}