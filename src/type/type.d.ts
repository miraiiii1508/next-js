import { ICourse } from "@/database/course.modal";

type TMenuItem = {
  url: string;
  title: string;
  icon?: React.ReactNode;
  OnlyIcon?:boolean
};
type ActiveLinkProps ={
    url: string,
    children: React.ReactNode,
}
type TCreateUserParam ={
  clerkId:string,
  username:string,
  email:string,
  name?:string,
  avatar?:string,
}
type TCreateCourse={
title:string,
slug:string,
author:string
}
type TUpdateCourseParam={
slug :string,
updateData:Partial<ICourse>
path?:string
}
export { TMenuItem ,ActiveLinkProps,TCreateUserParam,TCreateCourse,TUpdateCourseParam};
