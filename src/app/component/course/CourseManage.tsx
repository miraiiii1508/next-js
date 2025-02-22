"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassName, courseStatus } from "@/constants";
import { ICourse } from "@/database/course.modal";
import useQueryString from "@/hooks/useQueryString";
import { updatecourse } from "@/lib/actions/course.actions";
import { cn } from "@/lib/utils";
import { ECourseStatus } from "@/type/enum";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IconEye, IconStudy } from "../icons";
import IconEdit from "../icons/IconEdit";
import IconNext from "../icons/IconNext";
import IconPrev from "../icons/IconPrev";
import Heading from "../typography/Heading";
import TableAction from "../common/TableAction";
const CourseManage = ({ data }: { data: ICourse[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();
  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: "Bạn có muốn cập nhật trạng thái ?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Huỷ",
        confirmButtonText: "Đồng ý",
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
          router.push(`${pathname}?${createQueryString("status", "")}`);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleDeleteCourse = (slug: string) => {
    try {
      Swal.fire({
        title: "Bạn có chắc chắn xoá ?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Huỷ",
        confirmButtonText: "Xác nhận",
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
  const handleSelectStatus = (status: ECourseStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleOnChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
  }, 500);
  const [page, setPage] = useState(1);
  const handleChangePage = (
    type: "prev" | "next",
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((next) => next + 1);
  };
  useEffect(() => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  }, [page]);
  return (
    <>
      <Link
        href={"/manage/course/new"}
        className="flexCenter bg-primary text-white fixed right-5 bottom-5 rounded-full size-10 animate-bounce"
      >
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
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm khoá học..."
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <Select
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseStatus.map((status) => (
                  <SelectItem value={status.value} key={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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

                    <TableAction
                      type="delete"
                      onClick={() => {
                        handleDeleteCourse(item?.slug);
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          type="button"
          className={commonClassName.paginationButton}
          onClick={(e) => handleChangePage("prev", e)}
        >
          <IconPrev />
        </button>
        <button
          type="button"
          className={commonClassName.paginationButton}
          onClick={(e) => handleChangePage("next", e)}
        >
          <IconNext />
        </button>
      </div>
    </>
  );
};

export default CourseManage;
