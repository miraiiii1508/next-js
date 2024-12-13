"use server";

import Course from "@/database/course.modal";
import Lecture from "@/database/lecture.modal";
import Lesson, { ILesson } from "@/database/lesson.modal";
import { TCReateLessonParams, TLessonUpdateParams } from "@/type/type";
import { revalidatePath } from "next/cache";
import { connectDB } from "../moogose";
export async function getLessonBySlug({
  slug,
  course,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    connectDB();
    const findLesson = await Lesson.findOne({ slug, course }).select(
      "title video_url content"
    );
    if (!findLesson) return;
    return findLesson;
  } catch (e) {
    console.error(e);
  }
}
export async function findAllLesson({
  course,
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    connectDB();
    const getListLesson = await Lesson.find({ course }).select("title video_url content slug")
    if (!getListLesson) return;
    return getListLesson;
  } catch (e) {
    console.error(e);
  }
}
export async function coutLessonByCourse({
  courseId,
}: {
  courseId: string;
}): Promise<number | undefined> {
  try {
    connectDB();
    const getListLesson = await Lesson.countDocuments({ course:courseId })
    if (!getListLesson) return;
    return getListLesson || 0;
  } catch (e) {
    console.error(e);
  }
}
export async function createLesson(params: TCReateLessonParams) {
  try {
    connectDB();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture) return;
    const newLesson = await Lesson.create(params);
    findLecture.lesson.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || "/");
    if (!newLesson) return;
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
  }
}
export async function updateLesson(params: TLessonUpdateParams) {
  try {
    connectDB();

    const newLesson = await Lesson.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true }
    );
    revalidatePath(params.path || "/");
    if (!newLesson) return;
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
  }
}
