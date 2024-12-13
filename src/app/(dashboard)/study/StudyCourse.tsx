"use client";
import { CourseGrid } from "@/app/component/common";
import CourseItem from "@/app/component/course/CourseItem";
import { lastLessonKey } from "@/constants";
import { ICourse } from "@/database/course.modal";
import React from "react";

const StudyCourse = ({
  courseList,
}: {
  courseList: ICourse[] | undefined | null;
}) => {
  if (!courseList || courseList.length <= 0) return null;
  const lastLesson =
    JSON.parse(localStorage.getItem(lastLessonKey) || "[]") || [];
    
  return (
    <CourseGrid>
      {courseList &&
        courseList.length > 0 &&
        courseList?.map((item) => {
            const url =
            lastLesson.find((el: any) => el.course === item.slug)?.lesson || "";
          return (
            <CourseItem
              key={item.slug}
              data={item}
              cta={"Tiếp tục học"}
              url={url}
            ></CourseItem>
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourse;
