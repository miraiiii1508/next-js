'use server'
import { TCreateCourse, TUpdateCourseParam } from "@/type/type";
import { connectDB } from "../moogose";
import Course, { ICourse } from "@/database/course.modal";
import { revalidatePath } from "next/cache";
export async function getAllCousre(): Promise<ICourse[] | undefined>{
    try{
        connectDB();
        const getAllCourse = await Course.find()
        return getAllCourse
    }
    catch(e){
        console.error(e);
        
    }
}
export async function getCourseBySlug({slug}:{slug:string}):Promise<ICourse | undefined>{
    try{
        connectDB();
        const findCourse = await Course.findOne({slug})
        return findCourse;
    }
    catch(e){
        console.error(e);
        
    }
}
export async function createCourse(param:TCreateCourse){
    try{
        connectDB()
        const exitCourse = await Course.findOne({slug:param.slug})
        if(exitCourse){
            return {
                success:false,
                message:'Khoá học đã tồn tại!'
            }
        }
        const course = await(Course.create(param))
        return {
            success:true,
            data:JSON.parse(JSON.stringify(course))
        }
    }
    catch(e){
        console.error(e);
        
    }
}

export async function updatecourse(param: TUpdateCourseParam) {
    try {
      connectDB();
      const findCourse = await Course.findOne({ slug: param.slug });
      if (!findCourse) {
        return {
          success: false,
          message: "Không tìm thấy khóa học",
        };
      }
      const updatedCourse = await Course.findOneAndUpdate(
        { slug: param.slug },
        param.updateData,
        { new: true } 
      );
      if (!updatedCourse) {
        return {
          success: false,
          message: "Cập nhật khóa học thất bại",
        };
      }
      revalidatePath(param.path || "/");
      return {
        success: true,
        message: "Cập nhật khóa học thành công!",
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: "Có lỗi xảy ra khi cập nhật khóa học",
      };
    }
  }
  