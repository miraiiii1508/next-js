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
import { commonClassName, couponStatus } from "@/constants";
import { ICoupon } from "@/database/coupon.modal";
import useQueryString from "@/hooks/useQueryString";
import { ECouponType } from "@/type/enum";
import { debounce } from "lodash";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { StatusBadge } from "../common";
import TableAction from "../common/TableAction";
import IconNext from "../icons/IconNext";
import IconPrev from "../icons/IconPrev";
import Heading from "../typography/Heading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteCoupon } from "@/lib/actions/coupon.actions";

const CouponManage = ({ data }: { data: ICoupon[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();
  const handleOnChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
  }, 500);
  const handleSelectStatus = (status: ECouponType) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleDeleteCoupon = (id: string) => {
    try {
      Swal.fire({
        title: "Bạn có chắc chắn xoá ?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Huỷ",
        confirmButtonText: "Xác nhận",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCoupon(id);
          toast.success("Xoá thành công!");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const [page, setPage] = useState(1);
  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) {
      return;
    }
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((next) => next + 1);
  };
  useEffect(() => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  }, [page, pathname, router, createQueryString]);
  return (
    <>
      <Link
        href={"/manage/coupon/new"}
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
        <Heading>Quản lý Coupon</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm khoá học..."
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as ECouponType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {couponStatus.map((status) => (
                  <SelectItem
                    value={String(status.value)}
                    key={String(status.value)}
                  >
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
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Ngày sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((coupon) => {
            const couponStatusItem = couponStatus.find(
              (stt) => stt.value === coupon.status
            );
            return (
              <TableRow key={coupon._id}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>{coupon.title}</TableCell>
                <TableCell>
                  {coupon.type === ECouponType.PERCENT ? (
                    <strong>{coupon.value}%</strong>
                  ) : (
                    <strong>{coupon.value.toLocaleString("de-DE")}đ</strong>
                  )}
                </TableCell>
                <TableCell>
                  {coupon.used}/{coupon.maxNumber}
                </TableCell>
                <TableCell>
                  {(new Date(coupon.dateEnd).getTime() -
                    new Date(coupon.dateStart).getTime()) /
                    (1000 * 60 * 60 * 24)}{" "}
                  ngày
                </TableCell>
                <TableCell>
                  <StatusBadge status={couponStatusItem} />
                </TableCell>
                <TableCell className="flex gap-3">
                  <TableAction type="edit"  url={`/manage/coupon/update?code=${coupon?.code}`}/>
                  <TableAction type="view" />
                  <TableAction
                    type="delete"
                    onClick={() => {
                      handleDeleteCoupon(coupon?._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          type="button"
          className={commonClassName.paginationButton}
          onClick={() => handleChangePage("prev")}
        >
          <IconPrev />
        </button>
        <button
          type="button"
          className={commonClassName.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconNext />
        </button>
      </div>
    </>
  );
};

export default CouponManage;
