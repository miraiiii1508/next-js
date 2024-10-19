import {IconExplore,IconReplay} from "@/app/component/icons";
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
