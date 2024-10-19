'use server'
import User from "@/database/user.modal";
import { TCreateUserParam } from "@/type/type";
import { connectDB } from "../moogose";

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