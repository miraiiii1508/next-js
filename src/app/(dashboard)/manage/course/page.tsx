import CourseManage from "@/app/component/course/CourseManage";
import { getAllCousreAdmin } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/type/enum";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { page: number; search: string; status: ECourseStatus };
}) => {
  console.log(searchParams);

  const course = await getAllCousreAdmin({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search, 
    status: searchParams.status 
  });
  if (!course) return null;
  const parseCourse = JSON.parse(JSON.stringify(course));

  return (
    <div>
      <CourseManage data={parseCourse}></CourseManage>
    </div>
  );
};

export default page;
