import { EUserRole, userStatus } from "@/type/enum";
import { Document, model, models, Schema } from "mongoose";
export interface IUser extends Document {
  cleckId: string;
  name: string;
  userName: string;
  email_address: string;
  avatar: string;
  course: Schema.Types.ObjectId[];
  status: userStatus;
  role: EUserRole;
  createdAt: Date;
}
const userSchema = new Schema<IUser>({
  cleckId: {
    type: String,
  },
  name: {
    type: String,
  },
  userName: {
    type: String,
    unique:true,
    require:true
  },
  email_address: {
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
  createdAt: {
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