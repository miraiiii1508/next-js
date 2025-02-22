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
import { commonClassName, orderStatus } from "@/constants";
import useQueryString from "@/hooks/useQueryString";
import { cn } from "@/lib/utils";
import { EOrderStatus } from "@/type/enum";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { StatusBadge } from "../common";
import IconDelete from "../icons/IconDelete";
import IconNext from "../icons/IconNext";
import IconPrev from "../icons/IconPrev";
import Heading from "../typography/Heading";
interface IOrderProps {
  code: string;
  course: { title: string };
  user: { name: string };
  total: number;
  amount: number;
  status: string;
}
const OrderCourse = ({ data }: { data: IOrderProps[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
  };
  const handleSelectStatus = (status: EOrderStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const [page, setPage] = useState(1);
  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((next) => next + 1);
  };
  useEffect(() => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  }, [page]);
  const handleDeleteCourse = (slug?: string) => {
    try {
      Swal.fire({
        title: "Bạn có chắc chắn xoá ?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Huỷ",
        confirmButtonText: "Xác nhận",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // await updatecourse({
          //   slug,
          //   updateData: {
          //     status: ECourseStatus.PENDING,
          //     _destroy: true,
          //   },
          //   path: "/manage/course",
          // });
          toast.success("Xoá thành công!");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mb-10">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatus.map((status) => (
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
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khoá học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data?.map((order) => {
              const orderStatusItem = orderStatus.find(
                (stt) => stt.value === order.status
              );
              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>
                    <p>{order.course.title}</p>
                  </TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <del>{order.amount.toLocaleString('de-DE')}đ</del>
                      <span
                        className={cn(
                          orderStatusItem?.className_price
                        )}
                      >
                        {order.total.toLocaleString('de-DE')}đ
                      </span>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <StatusBadge status={orderStatusItem} />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        handleDeleteCourse();
                      }}
                      className={commonClassName.action}
                    >
                      <IconDelete />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          className={commonClassName.paginationButton}
          onClick={() => {
            handleChangePage("prev");
          }}
        >
          <IconPrev />
        </button>
        <button
          className={commonClassName.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconNext />
        </button>
      </div>
    </>
  );
};

export default OrderCourse;
