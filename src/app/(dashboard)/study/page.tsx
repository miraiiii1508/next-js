import { CourseGrid } from "@/app/component/common";
import CourseItem from "@/app/component/course/CourseItem";
import Heading from "@/app/component/typography/Heading";
import React from "react";

const page = () => {
  return(
    <>
    <Heading>Khu vực học tập</Heading>
    <CourseGrid>
      <CourseItem></CourseItem>
      <CourseItem></CourseItem>
      <CourseItem></CourseItem>
    </CourseGrid>
  </>
  )

};

export default page;
