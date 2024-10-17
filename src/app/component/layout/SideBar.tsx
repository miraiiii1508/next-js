import { menuItem } from "@/constants";
import React from "react";
import { TMenuItem } from "../../../type/type";
import ActiveLink from "../common/ActiveLink";
const SideBar = () => {
  return (
    <div className=" p-5 border-r border-r-gray-200">
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
    </div>
  );
};
function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
    <ActiveLink url={url} >{icon} {title}</ActiveLink>
  </li>
  );
}
export default SideBar;
