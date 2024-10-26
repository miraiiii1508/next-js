import { EUserRole, userStatus } from "@/type/enum";
import { Document, model, models, Schema } from "mongoose";
export interface IUser extends Document {
  _id:string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  course: Schema.Types.ObjectId[];
  status: userStatus;
  role: EUserRole;
  created_at: Date;
}
const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique:true,
    require:true
  },
  email: {
    type: String,
    unique:true,
    require:true
  },
  avatar: {
    type: String,
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  created_at: {
    type: Date,
    default:Date.now
  },
  role: {
    type: String,
    enum:Object.values(EUserRole),
    default:EUserRole.USER
  },
  status: {
    type: String,
    enum:Object.values(userStatus),
    default:userStatus.ACTIVE
  },
});
const User = models.User || model("User" ,userSchema)
export default User