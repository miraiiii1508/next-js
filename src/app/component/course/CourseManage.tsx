"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../typography/Heading";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import IconEdit from "../icons/IconEdit";
import { IconEye, IconStudy } from "../icons";
import IconDelete from "../icons/IconDelete";
import Link from "next/link";
import Swal from "sweetalert2";
import { ICourse } from "@/database/course.modal";
import { updatecourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/type/enum";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const CourseManage = ({ data }: { data: ICourse[] }) => {
  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
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
          await updatecourse({
            slug,
            updateData: {
              status:
                status === ECourseStatus.PENDING
                  ? ECourseStatus.APPROVED
                  : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Thay đổi trạng thái thành công!");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleDeleteCourse = (slug: string) => {
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
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updatecourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING,
              _destroy: true,
            },
            path: "/manage/course",
          });
          toast.success("Xoá thành công!");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Link href={"/manage/course/new"} className="flexCenter bg-primary text-white fixed right-5 bottom-5 rounded-full size-10 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10 ">
        <Heading>Quản lý khoá học</Heading>
        <div className="w-full lg:w-[300px]">
          <Input placeholder="Tìm kiếm khoá học..." />
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map((item) => (
              <TableRow key={item.slug}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      alt=""
                      src={item?.img}
                      width={80}
                      height={80}
                      className="shrink-0 flex size-16 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-sm lg:text-base line-clamp-2 whitespace-normal">
                        {item?.title}
                      </h3>
                      <h4 className="lg:text-sm textxs text-slate-500">
                        {new Date(item?.create_at).toLocaleDateString("vi-VI")}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="">
                  <span className="font-bold text-sm lg:text-base">
                    {item?.price.toLocaleString("de-DE")}đ
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => {
                      handleChangeStatus(item.slug, item.status);
                    }}
                    className={cn(
                      commonClassName.status,
                      courseStatus.find((stt) => stt.value === item.status)
                        ?.className
                    )}
                  >
                    {
                      courseStatus.find((stt) => stt.value === item.status)
                        ?.title
                    }
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Link
                      href={`/course/${item?.slug}`}
                      target="_blank"
                      className={commonClassName.action}
                    >
                      <IconEye />
                    </Link>
                    <Link
                      href={`/manage/course/update-content?slug=${item?.slug}`}
                      className={commonClassName.action}
                    >
                      <IconStudy />
                    </Link>
                    <Link
                      href={`/manage/course/update?slug=${item?.slug}`}
                      className={commonClassName.action}
                    >
                      <IconEdit />
                    </Link>
                    <button
                      onClick={() => {
                        handleDeleteCourse(item?.slug);
                      }}
                      className={commonClassName.action}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <Button className={commonClassName.paginationButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </Button>
        <Button className={commonClassName.paginationButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </Button>
      </div>
    </>
  );
};

export default CourseManage;
