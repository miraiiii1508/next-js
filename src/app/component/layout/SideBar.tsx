import { menuItem } from "@/constants";
import React from "react";
import { TMenuItem } from "../../../type/type";
import { ActiveLink } from "../common";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";

const SideBar = () => {
  return (
    <div className="hidden lg:flex flex-col borderDarkMode bgDarkMode p-5 border-r border-r-gray-200 fixed bottom-0 left-0 top-0 w-[300px]">
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
export function MenuItem({ url = "/", title = "", icon ,OnlyIcon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon} {OnlyIcon ?null: title}
      </ActiveLink>
    </li>
  );
}
export default SideBar;
