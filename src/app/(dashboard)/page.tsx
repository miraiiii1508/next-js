import React from "react";
import Heading from "../component/typography/Heading";
import CourseItem from "../component/course/CourseItem";
import { CourseGrid } from "../component/common";
import createUser from "@/lib/actions/user.actions";

const page = async() => {
   await createUser({
    cleckId:'133',
    email_address:'hehe@.com',
    userName:'dcm'
  })
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
