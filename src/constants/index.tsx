import {
  IconComment,
  IconCoupon,
  IconMange,
  IconMember,
  IconReplay,
  IconStudy,
} from "@/app/component/icons";
import IconOrder from "@/app/component/icons/IconOrder";
import {
  ECouponType,
  ECourseLevel,
  ECourseStatus,
  EOrderStatus,
  EPaymentType,
} from "@/type/enum";
import { TMenuItem } from "@/type/type";
import { z } from "zod";

export const menuItem: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconReplay className="size-5" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconStudy className="size-5" />,
  },
  {
    url: "/manage/course",
    title: "Quản lý khoá học",
    icon: <IconMange className="size-5" />,
  },
  {
    url: "/manage/member",
    title: "Quản lý thành viên",
    icon: <IconMember className="size-5" />,
  },
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <IconOrder className="size-5" />,
  },
  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-5" />,
  },
  {
    url: "/manage/coupon",
    title: "Quản lý Coupon",
    icon: <IconCoupon className="size-5" />,
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

export const editorOptions = (
  field: {
    onBlur: () => void;
    onChange: (content: string) => void;
  },
  theme: "light" | "dark"
) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: string) => field.onChange(content),
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
export const lastLessonKey = "LastLesson";
export const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
  className_price?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: EOrderStatus.COMPLETE,
    className: "text-green-500 border bg-green-500 ",
    className_price: "text-green-500 font-bold",
  },
  {
    title: "Chờ duyệt",
    value: EOrderStatus.PENDING,
    className: "text-orange-500 border bg-orange-500",
    className_price: "text-orange-500",
  },
  {
    title: "Từ chối",
    value: EOrderStatus.CANCELED,
    className: "text-red-500 border bg-red-500",
    className_price: "text-red-500",
  },
];
export const typeCoupon: {
  title: string;
  value: ECouponType;
}[] = [
  {
    title: `Phần trăm`,
    value: ECouponType.PERCENT,
  },
  {
    title: `Giá tiền`,
    value: ECouponType.MONEY,
  },
];
export const typePayment: {
  title: string;
  value: EPaymentType;
  className: string;
  img: string;
}[] = [
  {
    title: "Thanh toán bằng ví Momo",
    value: EPaymentType.MOMO,
    className: "flex items-center gap-4 bg-[#a50064] py-6 px-5 text-white font-semibold  rounded-md shadow-md  transition-all duration-300 w-full h-[36px]",
    img: "/assets/png/momo.png",
  },
  {
    title: "Thanh toán bằng ví VNPay",
    value: EPaymentType.VNPay,
    className: "flex items-center gap-4 bg-[#005BAC]  py-6 px-5 text-white font-semibold  rounded-md shadow-md  transition-all duration-300 w-full h-[36px]",
    img: "/assets/png/VnPay.png",
  },
  {
    title: "Thanh toán ngân hàng MBBank",
    value: EPaymentType.MBBANK,
    className: "flex items-center gap-4 bg-[#0033A0] py-6 px-5 text-white font-semibold  rounded-md shadow-md  transition-all duration-300 w-full h-[36px] ",
    img: "/assets/png/LogoMBBank.png",
  },
  {
    title: "Thanh toán ngân hàng ViettinBank",
    value: EPaymentType.VIETTINBANK,
    className: "flex items-center gap-4 bg-[#0071BA] py-6 px-5 text-white font-semibold  rounded-md shadow-md  transition-all duration-300 w-full h-[36px]",
    img: "/assets/png/VietinBank.png",
  },
];
export const couponStatus: {
  title: string;
  value: boolean;
  className: string;
}[] = [
  {
    title: `Hoạt động`,
    value: true,
    className: "text-green-500 border bg-green-500 ",
  },
  {
    title: `Đã ngừng`,
    value: false,
    className: "text-red-500 border bg-red-500",
  },
];
export const couponFormSchema = z.object({
  title: z
    .string({
      message: "Tiêu đề không được để trống",
    })
    .min(3, "Tiêu đề phải lớn hơn 3 ký tự")
    .max(100, "Tiêu đề không quá 100 kí tự!"),
  code: z
    .string({ message: "Mã code không được để trống" })
    .min(3, "Mã code phải lớn hơn 3 ký tự")
    .max(10, "Mã code phải nhỏ hơn 10 ký tự")
    .regex(/^[A-Z0-9]+$/, { message: "Mã code chỉ được chứa chữ hoa và số" }),
  dateStart: z.date({
    required_error: "Ngày bắt đầu không được để trống",
  }),
  dateEnd: z.date({
    required_error: "Ngày kết thúc không được để trống",
  }),
  value: z.number(),
  maxNumber: z.number().int(),
  status: z.boolean(),
  type: z.string(),
  courses: z.array(z.string()),
});
