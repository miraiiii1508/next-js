import React from "react";
import SideBar, { MenuItem } from "../component/layout/SideBar";
import { menuItem } from "@/constants";

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="wrapper block pb-20 lg:pb-0 lg:grid grid-cols-[300px,minmax(0,1fr)] h-screen">
      <SideBar />
      <ul className="flex justify-center gap-5 p-3 bgDarkMode border-t borderDarkMode fixed bottom-0 left-0 w-full h-16 lg:hidden">
        {menuItem.map((item, index) => {
          return (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
              OnlyIcon
            />
          );
        })}
      </ul>
      <div className="hidden lg:block course-slider"></div>
      <main className="pb-20 p-5 lg:pb-0">{children}</main>
    </div>
  );
};

export default layout;
