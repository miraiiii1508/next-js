'use server'

import User, { IUser } from "@/database/user.modal";
import { connectDB } from "../moogose"
import { TCreateUserParam } from "@/type/type";

export default async function createUser(params:TCreateUserParam){
    try{
        connectDB()
        const newUser = await User.create(params)
        return newUser
        
    }
    catch(e){
        console.error(e);
        
    }
}