"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { commonClassName } from "@/constants";
import { createLecture, updateLecture } from "@/lib/actions/lectures.action";
import { createLesson, updateLesson } from "@/lib/actions/lesson.action";
import { cn } from "@/lib/utils";
import { TCourseUpdateLecture, TUpdateCourseLecture } from "@/type/type";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import { IconCancel, IconCheck } from "../icons";
import IconDelete from "../icons/IconDelete";
import IconEdit from "../icons/IconEdit";
import LessonItemUpdate from "../lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateLecture }) => {
  const lecture = course.lectures;
  const [lectureIdIndex, setLectureIdIndex] = useState("");
  const [lectureEdit, setLectureEdit] = useState("");
  const [lessonIdIndex, setLessonIdIndex] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const handleAddNewLecture = async () => {
    try {
      const response = await createLecture({
        title: "Chương mới",
        courseId: course._id,
        order: lecture.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (response?.success) {
        toast.success("Thêm chương mới thành công !");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: "Tiêu đề bài học mới",
        slug: `Tieu-de-bai-hoc-moi${new Date().getTime().toString().slice(-3)}`,
      });
      if (res?.success) {
        toast.success("Thêm bài học mới thành công!");
        return;
      }
      toast.error("Thêm bài học mới thất bại!");
    } catch (e) {
      console.error(e);
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      Swal.fire({
        customClass: {
          confirmButton:
            "text-[#3085d6] bg-[#3085d6] bg-opacity-30 p-3 rounded-lg mr-2",
          cancelButton: "text-[#d33] bg-[#d33] bg-opacity-30 p-3 rounded-lg",
        },
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateLecture({
            lectureId,
            updateData: {
              path: `manage/course/update-content?slug=${course.slug}`,
              _destroy: true,
            },
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật thành công!");
        setLectureEdit("");
        setLectureIdIndex("");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit,
          slug:slugify(lessonEdit, {
            lower:true,
            locale:'vi',
            remove:/[*+~.()'"!@:]/g,
          })
        },
      });
      if (res?.success) {
        toast.success("Cập nhật thành công!");
        setLessonEdit("");
        setLessonIdIndex("");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lecture.map((item: TUpdateCourseLecture) => (
          <div key={item._id}>
            <Accordion type="single" collapsible={!lectureEdit}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {lectureIdIndex === item._id ? (
                    <div className="flex items-center justify-between gap-3 w-full pr-5">
                      <div className="w-full">
                        <Input
                          placeholder="Tên chương"
                          defaultValue={item.title}
                          onChange={(e) => {
                            setLectureEdit(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            commonClassName.action,
                            "text-green-500"
                          )}
                          onClick={(e) => handleUpdateLecture(e, item._id)}
                        >
                          <IconCheck />
                        </span>
                        <span
                          className={cn(commonClassName.action, "text-red-500")}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdIndex("");
                          }}
                        >
                          <IconCancel />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 w-full pr-5">
                      <div className="">{item.title}</div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            commonClassName.action,
                            "text-blue-500"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdIndex(item._id);
                          }}
                        >
                          <IconEdit />
                        </span>
                        <span
                          className={cn(commonClassName.action, "text-red-500")}
                          onClick={(e) => handleDeleteLecture(e, item._id)}
                        >
                          <IconDelete />
                        </span>
                      </div>
                    </div>
                  )}
                </AccordionTrigger>
                <AccordionContent className="border-none !bg-transparent">
                  <div className="flex flex-col gap-5">
                    {item.lesson.map((lesson) => (
                      <Accordion type="single" collapsible key={lesson._id}>
                        <AccordionItem value={lesson._id}>
                          <AccordionTrigger>
                            {lessonIdIndex === lesson._id ? (
                              <div className="flex items-center justify-between gap-3 w-full pr-5">
                                <div className="w-full">
                                  <Input
                                    placeholder="Tên chương"
                                    defaultValue={lesson.title}
                                    onChange={(e) => {
                                      setLessonEdit(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-green-500"
                                    )}
                                    onClick={(e) =>
                                      handleUpdateLesson(e, lesson._id)
                                    }
                                  >
                                    <IconCheck />
                                  </span>
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-red-500"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLessonIdIndex("");
                                    }}
                                  >
                                    <IconCancel />
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between gap-3 w-full pr-5">
                                <div className="">{lesson.title}</div>
                                <div className="flex gap-2">
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-blue-500"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLessonIdIndex(lesson._id);
                                    }}
                                  >
                                    <IconEdit />
                                  </span>
                                  <span
                                    className={cn(
                                      commonClassName.action,
                                      "text-red-500"
                                    )}
                                    onClick={(e) =>
                                      handleDeleteLecture(e, item._id)
                                    }
                                  >
                                    <IconDelete />
                                  </span>
                                </div>
                              </div>
                            )}
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate lesson={lesson}></LessonItemUpdate>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              onClick={() => handleAddNewLesson(item._id, course._id)}
              className="mt-5 ml-auto w-fit block"
            >
              Thêm bài học mới
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
