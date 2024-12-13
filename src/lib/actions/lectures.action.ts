"use server";
import Course from "@/database/course.modal";
import { connectDB } from "../moogose";
import { TCreateLectureParams, TUpdateLectureParams } from "@/type/type";
import Lecture from "@/database/lecture.modal";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
  try {
    connectDB();
    const findCourse = await Course.findById(params.courseId);
    if (!findCourse) return null;
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    await findCourse.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
  }
}
export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectDB();
    await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
      new: true,
    })
    revalidatePath(params.updateData.path || "/");
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
  }
}
