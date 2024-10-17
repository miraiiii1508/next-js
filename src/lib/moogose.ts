"use server";
import mongoose from "mongoose";
export const connectDB = async () => {
    if(!process.env.MONGODB_URL){
        throw new Error("MongoDB URI not found")
    }
    if (mongoose.connection.readyState === 1) {
        console.log("MONGOOSE ALREADY CONNECTED");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'DevBlog'
        });
        console.log("Using new Database");
    }
    catch(error){
        console.log("connect Error")
    }
}