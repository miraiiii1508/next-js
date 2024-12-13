import { getAllCousreHomePage } from "@/lib/actions/course.actions";
import { CourseGrid } from "../component/common";
import CourseItem from "../component/course/CourseItem";
import Heading from "../component/typography/Heading";

const page = async () => {
  const course = (await getAllCousreHomePage({
    page:  1,
    limit: 10,
  })) || [];
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
