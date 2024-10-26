"use client";

import { UploadButton } from "@/app/ultils/uploadthing";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { courseLevel, courseStatus } from "@/constants";
import { ICourse } from "@/database/course.modal";
import { updatecourse } from "@/lib/actions/course.actions";
import { ECourseLevel, ECourseStatus } from "@/type/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { z } from "zod";
import { IconAdd } from "../icons";
const formSchema = z.object({
  title: z.string().min(10, "Tên khoá học ít nhất 10 kí tự !"),
  slug: z.string().optional(),
  price: z.number().int().positive().optional(),
  sale_price: z.number().int().positive().optional(),
  intro_url: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  views: z.number().int().optional(),
  status: z
    .enum([
      ECourseStatus.APPROVED,
      ECourseStatus.PENDING,
      ECourseStatus.REJECTED,
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.ADVANCED,
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
    ])
    .optional(),
  infor: z.object({
    requirement: z.array(z.string()).optional(),
    benifit: z.array(z.string()).optional(),
    qa: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

const CourseUpdate = ({ data }: { data: ICourse }) => {
  const route = useRouter();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [courseInfo, setCourseInfor] = useImmer({
    requirement: data.infor.requirement,
    benifit: data.infor.benifit,
    qa: data.infor.qa,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      price: data.price,
      sale_price: data.sale_price,
      intro_url: data.intro_url,
      description: data.description,
      image: data.img,
      status: data.status,
      level: data.level,
      views: data.views,
      infor: {
        requirement: data.infor.requirement,
        benifit: data.infor.benifit,
        qa: data.infor.qa,
      },
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmiting(true);
    try {
      const res = await updatecourse({
        slug: data.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          views: values.views,
          description: values.description,
          level: values.level,
          status: values.status,
          img: values.image,
          intro_url: values.intro_url,
          infor: {
            requirement: courseInfo.requirement,
            benifit: courseInfo.benifit,
            qa: courseInfo.qa,
          },
        },
      });
      if (values.slug !== data.slug) {
        route.replace(`/manage/course/update?slug=${values.slug}`);
      }
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmiting(false);
    }
  }
  const imageWatch = form.watch("image");
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="999.999"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khuyễn mãi</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1.000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn video</FormLabel>
                <FormControl>
                  <Input placeholder="khoahoc.youtube.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1.000.000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatus.map((item) => (
                        <SelectItem value={item.value} key={item.value}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevel.map((item) => (
                        <SelectItem value={item.value} key={item.value}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <div className="h-[200px] bg-white rounded-md border border-gray-200 flex justify-center items-center relative">
                    {!imageWatch ? (
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url);                     
                        }}
                        onUploadError={(error: Error) => {
                          console.error(`ERROR! ${error.message}`);
                        }}
                      />
                    ) : (
                      <Image alt="" src={imageWatch} fill className="w-full h-full object-cover"/>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nội dung..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="infor.requirement"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Yêu cầu</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfor((draft) => {
                        draft.requirement.push("");
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.requirement.map((item, index) => (
                      <Input
                        value={item}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setCourseInfor((draft) => {
                            draft.requirement[index] = e.target.value;
                          });
                        }}
                        key={index}
                        placeholder={`Yêu cầu số ${index + 1}`}
                      ></Input>
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="infor.benifit"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Lợi ích</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfor((draft) => {
                        draft.benifit.push("");
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <>
                  {courseInfo.benifit.map((item, index) => (
                    <Input
                      value={item}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCourseInfor((draft) => {
                          draft.benifit[index] = e.target.value;
                        });
                      }}
                      key={index}
                      placeholder={`Lợi ích số ${index + 1}`}
                    ></Input>
                  ))}
                </>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="infor.qa"
            render={() => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Q&A</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfor((draft) => {
                        draft.qa.push({
                          question: "",
                          answer: "",
                        });
                      });
                    }}
                  >
                    <IconAdd className="size-5" />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.qa.map((item, index) => (
                      <div className="grid grid-cols-2 gap-5" key={index}>
                        <Input
                          value={item.question}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCourseInfor((draft) => {
                              draft.qa[index].question = e.target.value;
                            });
                          }}
                          placeholder={`Câu hỏi số ${index + 1}`}
                        ></Input>
                        <Input
                          value={item.answer}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCourseInfor((draft) => {
                              draft.qa[index].answer = e.target.value;
                            });
                          }}
                          placeholder={`Câu trả lời số ${index + 1}`}
                        ></Input>
                      </div>
                    ))}
                  </>
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
};

export default CourseUpdate;
