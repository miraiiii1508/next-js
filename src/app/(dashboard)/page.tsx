import React from "react";
import Heading from "../component/typography/Heading";
import CourseItem from "../component/course/CourseItem";
import { CourseGrid } from "../component/common";

const page = () => {
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </div>
  );
};

export default page;
