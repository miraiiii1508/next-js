import { getCourseBySlug } from '@/lib/actions/course.actions';
import { findAllLesson } from '@/lib/actions/lesson.action';
import { getUserId } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import LessonLeft from '../LessonLeft';

const page = async ({
    params,
    searchParams,
  }: {
    params: { course: string };
    searchParams: { slug: string };
  }) => {
    const {userId}= auth();
    if(!userId) return null
    const findUser = await getUserId({userId})
    if(!findUser) return null
    const course = params.course;
  const slug = searchParams.slug;
  if (!course || !slug) return null;
  const getCourse = await getCourseBySlug({ slug: course });
  if (!getCourse) return null;
  const courseId = getCourse?._id.toString();
  if (!findUser.course.some((id) => id.toString() === courseId)) return null;
  const lessonList = await findAllLesson({ course: courseId || "" });
  const lessonDetail = lessonList?.find(el =>el.slug === slug)
  const currentIndex =
    lessonList?.findIndex((item) => item.slug === slug) || 0;
  const nextLesson = lessonList?.[currentIndex + 1];
  const prevLesson = lessonList?.[currentIndex - 1];
  const video = lessonDetail?.video_url?.split("v=")[1]?.split("&")[0];
    const url = `/${course}/lesson?slug=${slug}`
  return (
    <div>
       <LessonLeft 
      video={video ||""}
      nextLesson={nextLesson}
      prevLesson={prevLesson}
      course={course}
      title={lessonDetail?.title}
      content={lessonDetail?.content}
      url ={url}
     />
    </div>
  )
}

export default page
