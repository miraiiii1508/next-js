import { ECourseLevel, ECourseStatus } from "@/type/enum";
import { model, models, Schema } from "mongoose";

export interface ICourse extends Document {
  _id: string;
  title: string;
  img:string;
  intro_url: string;
  description: string;
  price: number;
  sale_price: number;
  slug: string;
  status: ECourseStatus;
  create_at: Date;
  author: Schema.Types.ObjectId;
  level: ECourseLevel;
  views: number;
  rating: number[];
  infor: {
    requirement: string[];
    benifit: string[];
    qa: {
      question: string;
      answer: string;
    }[];
  };
  lectures: Schema.Types.ObjectId[];
  _destroy?:boolean
}
const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  img:{
    type:String
  },
  intro_url: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  sale_price: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(ECourseStatus),
    default: ECourseStatus.PENDING,
  },
  level: {
    type: String,
    enum: Object.values(ECourseLevel),
    default: ECourseLevel.BEGINNER,
  },
  create_at: {
    type: Date,
    default:Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lecture",

    },
  ],
  rating: {
    type: [Number],
    default: [5],
  },
  views: {
    type: Number,
    default: 0,
  },
  infor: {
    requirement: { type: [String] },
    benifit: { type: [String] },
    qa: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
  },
  _destroy:{
    type:Boolean,
    default:false
  }
});
const Course = models.Course || model<ICourse>("Course" ,courseSchema)
export default Course;
