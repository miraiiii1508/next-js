"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import slugify from "slugify";
import { createCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.modal";

const formSchema = z.object({
  title: z.string().min(10, "Tên khoá học ít nhất 10 kí tự !"),
  slug: z.string().optional(),
});

function CourseAddNew({ user }: { user: IUser }) {
  const route = useRouter();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmiting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: "vi",
          }),
        author: user._id,
      };
      const res = await createCourse(data);
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }
      if (res?.success) {
        toast.success("Thêm khoá học thành công!");
      }
      if (res?.data) {
        route.push(`/manage/course/update?slug=${data.slug}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên Khoá học(*)</FormLabel>
                <FormControl>
                  <Input placeholder="Tên khoá học" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
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
          Tạo khoá học
        </Button>
      </form>
    </Form>
  );
}
export default CourseAddNew;
