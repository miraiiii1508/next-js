"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { commonClassName, couponFormSchema, courseStatus, typeCoupon } from "@/constants";
import { ICourse } from "@/database/course.modal";
import { updateCoupon } from "@/lib/actions/coupon.actions";
import { getCourseBySearch } from "@/lib/actions/course.actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StatusBadge } from "../common";
import IconNext from "../icons/IconNext";
import IconPrev from "../icons/IconPrev";
import InputReactFormat from "@/components/ui/inputReactFormat";
import { ECouponType } from "@/type/enum";
import { toast } from "react-toastify";
import { ICoupon } from "@/database/coupon.modal";

const CouponUpdate = ({ data }: { data: ICoupon }) => {
  const router = useRouter();
  const [findCourse, setFindCourse] = useState<ICourse[] | undefined>([]);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [searchCourse, setSearchCourse] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    data.courses.map((course) => course.toString())
  );
  const form = useForm<z.infer<typeof couponFormSchema>>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      title: data.title,
      code: data.code,
      dateStart: data.dateStart ? new Date(data.dateStart) : undefined,
      dateEnd: data.dateEnd ? new Date(data.dateEnd) : undefined,
      value: data.value,
      maxNumber: data.maxNumber,
      status: data.status,
      type: data.type,
    },
  });
  const getAllCourse = async (searchString: string) => {
    const courses = await getCourseBySearch({
      params: {
        page: page,
        limit: 10,
        search: searchString ? searchCourse : "",
      },
    });
    setFindCourse(courses);
  };

  const [page, setPage] = useState(1);
  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((next) => next + 1);
  };
  const debouncedSearch = useCallback(
    debounce(() => getAllCourse(searchCourse), 250),
    [searchCourse, page]
  );
  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  useEffect(() => {
    form.setValue("courses", selectedCourses);
  }, [selectedCourses, form.setValue]);
  const couponTypeWatch = form.watch("type");
  async function onSubmit(value: z.infer<typeof couponFormSchema>) {
    setIsSubmiting(true);
    try {
      if (!value) return;
      const couponType = value.type;
      if (
        (couponType === ECouponType.PERCENT &&
          value?.value &&
          value.value > 100) ||
        (value?.value && value.value < 0)
      ) {
        form.setError("value", { message: "giá trị không hợp lệ" });
        return;
      }
      if (value.dateStart > value.dateEnd) {
        form.setError("dateEnd", {
          message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
        });
        return;
      }
      setIsSubmiting(false);
      const couponUpdated = await updateCoupon({
        _id: data._id,
        updateData: { ...value },
      });
      if (couponUpdated?.success) {
        router.push("/manage/coupon");
      } else {
        toast.error("Cập nhật mã khuyến mãi thất bại thất bại!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmiting(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề coupon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã code</FormLabel>
                <FormControl>
                  <Input placeholder="Mã code" {...field} disabled/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-center text-center font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-center text-center font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-5"
                  >
                    {typeCoupon.map((type) => (
                      <div
                        className="flex items-center space-x-2"
                        key={type.value}
                      >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value}>{type.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  <>
                    {couponTypeWatch === ECouponType.PERCENT ? (
                      <Input
                        type="number"
                        placeholder="Số lượng tối đa"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    ) : (
                      <InputReactFormat
                        placeholder="Giá trị"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="status-id"
                    />
                    <Label htmlFor="status-id">Trạng thái</Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số lượng tối đa"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khoá học</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Tìm kiếm khoá học"
                      onChange={(e) => {
                        setSearchCourse(e.target.value);
                      }}
                    />
                    <div className="flex flex-col gap-2 !mt-5 bgDarkMode h-[200px] p-2">
                      {findCourse?.map((course) => {
                        const courseStatusItem = courseStatus.find(
                          (stt) => stt.value === course.status
                        );

                        return (
                          <Label
                            key={course._id}
                            className="flex items-center gap-2 font-medium text-sm cursor-pointer mx-2"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              checked={selectedCourses.includes(course._id)}
                              disabled={course.status !== "APPROVED"}
                              onCheckedChange={() => {
                                setSelectedCourses((prev) => {
                                  if (prev.includes(course._id)) {
                                    return prev.filter(
                                      (id) => id !== course._id
                                    );
                                  } else {
                                    return [...prev, course._id];
                                  }
                                });
                              }}
                            />
                            <div className="flex justify-between gap-10 w-full">
                              <span>{course.title}</span>
                              <StatusBadge status={courseStatusItem} />
                            </div>
                          </Label>
                        );
                      })}

                      <div className="flex justify-center gap-3 mt-auto p-2">
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
                    </div>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          isLoading={isSubmiting}
          variant="primary"
          type="submit"
          className="w-[120px]"
          disabled={isSubmiting}
        >
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default CouponUpdate;
