import { IconExplore, IconReplay } from "@/app/component/icons";
import { ECourseLevel, ECourseStatus } from "@/type/enum";
import { TMenuItem } from "@/type/type";

export const menuItem: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconReplay className="size-5" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/course",
    title: "Quản lý khoá học",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/member",
    title: "Quản lý thành viên",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconExplore className="size-5" />,
  },
];
export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 border bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 border bg-orange-500",
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 border bg-red-500",
  },
];
export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    title: "Nâng cao",
    value: ECourseLevel.ADVANCED,
  },
  {
    title: "Trung bình",
    value: ECourseLevel.INTERMEDIATE,
  },
];
export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Nâng cao",
};
export const commonClassName = {
  status:
    "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs whitespace-nowrap",
  action:
    "size-8 flex items-center justify-center rounded-md border p-2 hover:text-grayDarkNest dark:hover:text-white text-gray-500 hover:border-opacity-80 borderDarkMode dark:bg-transparent dark:hover:border:opacity-15 ",
  paginationButton:
    "size-10 flex items-center-jutify-center rounded-md borderDarkMode bgDarkMode border hover:border-primary transision-all hover:text-primary p-2.5",
};


export const editorOptions = (field: any, theme: any) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
  },
});
export const lastLessonKey ='LastLesson'