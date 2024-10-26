import Heading from "@/app/component/typography/Heading";
import React from "react";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import CourseUpdate from "@/app/component/course/CourseUpdate";
const page = async ({ searchParams }: { searchParams: { slug: string } }) => {

  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  const parseCource = JSON.parse(JSON.stringify(findCourse))
  if(!findCourse) return null
  return (
    <div>
      <Heading className="mb-8">Cập nhật khoá học</Heading>
      <CourseUpdate data = {parseCource} />
    </div>
  );
};

export default page;
