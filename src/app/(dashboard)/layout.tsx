import React from "react";
import SideBar from "../component/layout/SideBar";

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="wrapper grid grid-cols-[300px,minmax(0,1fr)] h-screen">
      <SideBar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
