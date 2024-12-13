"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ILesson } from "@/database/lesson.modal";
import { updateLesson } from "@/lib/actions/lesson.action";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useRef } from "react";
import { editorOptions } from "@/constants";
import { useTheme } from "next-themes";
const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});
const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id,
        updateData: values,
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công!");
        return;
      }
      toast.error("cập nhật thất bại!");
    } catch (e) {
      console.error(e);
    }
  }
  const theme = useTheme()
  const currentTheme = theme.theme === "dark" ? "dark" : "light";
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input placeholder="duong-dan" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng</FormLabel>
                <FormControl>
                  <Input
                    placeholder="30p"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn video</FormLabel>
                <FormControl>
                  <Input placeholder="youtube.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                    onInit={(_evt, editor) => {
                      (editorRef.current = editor).setContent(
                        lesson.content || ""
                      );
                    }}
                    value={field.value}
                    {...editorOptions(field, currentTheme)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-5 items-center">
          <Button type="submit">Submit</Button>
          <Link className="text-sm text-slate-600" href="/">
            Xem trước
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LessonItemUpdate;
