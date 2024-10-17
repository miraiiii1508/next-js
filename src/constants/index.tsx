import {IconExplore,IconReplay} from "@/app/component/icons";
import { TMenuItem } from "@/type/type";

export const menuItem: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconReplay className="size-5" />,
  },
  {
    url: "/explore",
    title: "Khu vực học tập",
    icon: <IconExplore className="size-5" />,
  },
];
