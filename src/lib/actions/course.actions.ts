"use server";
import {
  TCourseUpdateLecture,
  TCreateCourse,
  TGetAllCodeParams,
  TUpdateCourseParam,
} from "@/type/type";
import { connectDB } from "../moogose";
import Course, { ICourse } from "@/database/course.modal";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.modal";
import Lesson from "@/database/lesson.modal";
import { FilterQuery } from "mongoose";
import { ECourseStatus } from "@/type/enum";
export async function getAllCousreHomePage(
  params: TGetAllCodeParams
): Promise<ICourse[] | undefined> {
  try {
    connectDB();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    query.status = status || ECourseStatus.APPROVED;

    const getAllCourse = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });
    return getAllCourse;
  } catch (e) {
    console.error(e);
  }
}
export async function getAllCousreAdmin(
  params: TGetAllCodeParams
): Promise<ICourse[] | undefined> {
  try {
    connectDB();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }

    const getAllCourse = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });
    return getAllCourse;
  } catch (e) {
    console.error(e);
  }
}
export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateLecture | undefined> {
  try {
    connectDB();
    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      model: Lecture,
      select: "_id , title",
      match: {
        _destroy: false,
      },
      populate: {
        path: "lesson",
        model: Lesson,
        match: {
          _destroy: false,
        },
      },
    });
    return findCourse;
  } catch (e) {
    console.error(e);
  }
}
export async function createCourse(param: TCreateCourse) {
  try {
    connectDB();
    const exitCourse = await Course.findOne({ slug: param.slug });
    if (exitCourse) {
      return {
        success: false,
        message: "Khoá học đã tồn tại!",
      };
    }
    const course = await Course.create(param);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (e) {
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
