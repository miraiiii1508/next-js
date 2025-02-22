import Heading from "@/app/component/typography/Heading";
import { getCourseByUser } from "@/lib/actions/user.actions";
import StudyCourse from "./StudyCourse";

const page = async () => {
  const courseList = await getCourseByUser();
 
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse
        courseList={courseList ? JSON.parse(JSON.stringify(courseList)) : null}
      />
    </>
  );
};

export default page;
