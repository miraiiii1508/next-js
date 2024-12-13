import { ICourse } from "@/database/course.modal";
import { ILesson } from "@/database/lesson.modal";

type TMenuItem = {
  url: string;
  title: string;
  icon?: React.ReactNode;
  OnlyIcon?: boolean;
};
type ActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
type TCreateUserParam = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};
type TCreateCourse = {
  title: string;
  slug: string;
  author: string;
};
type TUpdateCourseParam = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
};
export type TGetAllCodeParams={
  page:number,
  limit:number,
  search?:string,
  status?:string
}
export type TCreateLectureParams = {
  courseId: string;
  title?: string;
  order?: number;
  path?: string;
};
export type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};
export type TUpdateCourseLecture ={
  _id:string,
  title:string,
  lesson:ILesson[]
}
export interface TCourseUpdateLecture extends Omit<ICourse, "lectures"> {
  lectures: TUpdateCourseLecture[];
}
export interface ILastLesson {
  course:string,
  lesson:string
}

export type TCReateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: number;
  path?: string;
  slug:string
};
export type TLessonUpdateParams ={
  lecture?:string,
  course?:string,
  lessonId:string,
  path?: string;
  updateData:{
    title?:string,
    _destroy?:boolean,
    slug?:string,
    duration?:number,
    video_url?:string,
    content?:string,
  }
}
export type TCreateHistoryParams={
  course:string,
  lesson:string,
  checked:boolean |string,
  path:string
}

export {
  TMenuItem,
  ActiveLinkProps,
  TCreateUserParam,
  TCreateCourse,
  TUpdateCourseParam,
};
