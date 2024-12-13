"use client";
import React from "react";
import { IconReplay } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { createHistory } from "@/lib/actions/history.actions";

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        path: url || "/",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 text-sm font-medium"
      )}
    >
      {url && (
        <Checkbox
          defaultChecked={isChecked}
          className="size-4 flex-shrink-0"
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}
      <IconReplay className="size-5 flex-shrink-0" />
      {url ? (
        <Link
          href={url}
          className={cn("line-clamp-1", {
            "text-primary font-semibold": isActive,
          })}
        >
          {lesson.title}
        </Link>
      ) : (
        <h4>{lesson.title}</h4>
      )}

      <span className="ml-auto text-xs font-semibold flex-shrink-0">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
