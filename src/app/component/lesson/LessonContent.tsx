import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { IHistory } from "@/database/history.modal";
import { TUpdateCourseLecture } from "@/type/type";
import LessonItem from "./LessonItem";

const LessonContent = ({
  lectures,
  course,
  slug,
  histories=[]
}: {
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
  histories?:IHistory[]
}) => {
  return (
    <div className="grid grid-cols gap-5 mb-10">
      {lectures.map((item: TUpdateCourseLecture) => (
        <Accordion type="single" collapsible key={item._id}>
          <AccordionItem value={item._id.toString()}>
            <AccordionTrigger>
              <div className="flex items-center justify-between gap-3 w-full pr-5">
                <div className="line-clamp-1">{item.title}</div>
                <div className="flex gap-2"></div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="!bg-transparent border-0">
              <div className="flex flex-col gap-3">
                {item.lesson.map((lesson) => (
                  <LessonItem
                    key={lesson._id}
                    lesson={lesson ?JSON.parse(JSON.stringify(lesson)):{}}
                    url={!course?'':`/${course}/lesson?slug=${lesson.slug}`}
                    isActive={!slug? false : lesson.slug === slug}
                    isChecked={histories.some(el => el.lesson.toString()===lesson._id.toString())}
                  ></LessonItem>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonContent;
