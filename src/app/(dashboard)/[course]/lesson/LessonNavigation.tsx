"use client";
import IconNext from "@/app/component/icons/IconNext";
import IconPrev from "@/app/component/icons/IconPrev";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: {
  nextLesson: string;
  prevLesson: string;
}) => {
  const route = useRouter();
  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3"
        onClick={() => (!prevLesson ? null : route.push(prevLesson))}
        disabled={!prevLesson}
      >
        <IconPrev />
      </Button>
      <Button
        className="size-10 p-3"
        onClick={() => (!nextLesson ? null : route.push(nextLesson))}
        disabled={!nextLesson}
      >
        <IconNext />
      </Button>
    </div>
  );
};

export default LessonNavigation;
