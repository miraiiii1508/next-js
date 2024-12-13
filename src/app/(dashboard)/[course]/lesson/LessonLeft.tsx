"use client";
import React, { useEffect } from "react";
import LessonNavigation from "./LessonNavigation";
import Heading from "@/app/component/typography/Heading";
import VideoPlayer from "./@player/VideoPlayer";

const LessonLeft = ({
  video,
  nextLesson,
  prevLesson,
  course,
  title,
  content,
  url,
}: {
  video: string;
  nextLesson: any;
  prevLesson: any;
  course: string;
  title: string | undefined;
  content: string | undefined;
  url: string;
}) => {
  useEffect(() => {
    let results: any[] =
      JSON.parse(localStorage?.getItem("LastLesson") || "[]") || [];
    const item = {
      course,
      lesson: url,
    };
    results = results.filter((el) => el.course !== course);
    results.push(item);
    localStorage.setItem("LastLesson", JSON.stringify(results));
  }, [url, course]);
  return (
    <div>
      <VideoPlayer
        video={video}
        nextLesson={
          !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
        }
        prevLesson={
          !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
        }
      />
      <Heading className="mb-10 line-clamp-1">{title}</Heading>
      <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
        <div dangerouslySetInnerHTML={{ __html: content || "" }}></div>
      </div>
    </div>
  );
};

export default LessonLeft;
