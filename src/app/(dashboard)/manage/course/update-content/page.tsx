import React from "react";
import { getCourseBySlug } from "../../../../../lib/actions/course.actions";
import Heading from "@/app/component/typography/Heading";
import CourseUpdateContent from "@/app/component/course/CourseUpdateContent";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  if (!findCourse) return <div>Không tìm thấy khoá học!</div>;
  return (
    <div>
      <Heading className="mb-10">
        Nội dung <strong className="text-primary">{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))}/>
    </div>
  );
};

export default page;
