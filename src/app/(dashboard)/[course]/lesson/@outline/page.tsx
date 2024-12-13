import LessonContent from "@/app/component/lesson/LessonContent";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getHistory } from "@/lib/actions/history.actions";
import { coutLessonByCourse } from "@/lib/actions/lesson.action";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  if (!course || !slug) return null;
  const getCourse = await getCourseBySlug({ slug: course });
  if (!getCourse) return null;
  const courseId = getCourse?._id.toString();
  const lectures = getCourse.lectures || [];
  const getHistories = await getHistory({ course: courseId });
  const lessonCount = await coutLessonByCourse({courseId})
  const lessonCompletePercen =
    ((getHistories?.length || 0) / (lessonCount || 0)) * 100;
  return (
    <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="h-2 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
        <div
          className="w-0 h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${lessonCompletePercen}%` }}
        ></div>
      </div>
      <LessonContent
        lectures={lectures}
        course={course}
        slug={slug}
        histories={getHistories ? JSON.parse(JSON.stringify(getHistories)) : {}}
      />
    </div>
  );
};

export default page;
