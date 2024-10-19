import { menuItem } from "@/constants";
import React from "react";
import { TMenuItem } from "../../../type/type";
import { ActiveLink } from "../common";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";

const SideBar = () => {
  return (
    <div className="bg-white dark:bg-grayDarkNest dark:border-opacity-10 p-5 border-r border-r-gray-200 flex flex-col">
      <a href="/" className="logo font-bold text-3xl inline-block mb-4">
        Web Dev
      </a>
      <ul className="flex flex-col gap-2">
        {menuItem.map((item, index) => {
          return (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
            />
          );
        })}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};
function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon} {title}
      </ActiveLink>
    </li>
  );
}
export default SideBar;
