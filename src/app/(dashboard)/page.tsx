import React from "react";
import Heading from "../component/typography/Heading";
import CourseItem from "../component/course/CourseItem";
import { CourseGrid } from "../component/common";
import { getAllCousre } from "@/lib/actions/course.actions";

const page = async () => {
  const course = (await getAllCousre()) || [];
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {course.length > 0 && course?.map((item)=><CourseItem key = {item.slug} data ={item}></CourseItem> )}
      </CourseGrid>
    </div>
  );
};

export default page;
