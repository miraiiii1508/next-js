import { model, models, Schema } from "mongoose"

export interface ILecture extends Document{
    _id:string,
    title:string,
    created_at :Date,
    course:Schema.Types.ObjectId,
    lesson:Schema.Types.ObjectId[],
    _destroy:boolean

}
const LectureSchema = new Schema<ILecture>({
    title:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    _destroy:{
        type:Boolean,
        defaule:false
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:'Course'
    },
    lesson:[
        {
            type:Schema.Types.ObjectId,
            ref:'Lesson'
        }
    ]
})

const Lecture = models.Course || model<ILecture>("Lecture" ,LectureSchema)
export default Lecture;