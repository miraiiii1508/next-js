import CourseManage from "@/app/component/course/CourseManage";
import { getAllCousre } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const course = await getAllCousre();
  if (!course) return null;
  const parseCourse = JSON.parse(JSON.stringify(course));

  return (
    <div>
      <CourseManage data={parseCourse}></CourseManage>
    </div>
  );
};

export default page;
