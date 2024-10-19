import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconEye, IconStar } from "../icons";
import IconClock from "../icons/IconClock";
const courseInfor = [
  {
    title: 3000,
    icon: (className?: string) => <IconEye className={className} />,
  },
  {
    title: 4.7,
    icon: (className?: string) => <IconStar className={className} />,
  },
  {
    title: "30h25m",
    icon: (className?: string) => <IconClock className={className} />,
  },
];

const CourseItem = () => {
  return (
    <div className="bg-white dark:bg-grayDarker dark:border-opacity-10 border-gray-200 p-4 rounded-2xl">
      <Link href="#" className="block h-[180px] relative">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width:640px) 300px 100vw"
        ></Image>
        <span className="inline-block px-3 rounded-full bg-primary text-white text-xs absolute top-3 right-3">
          new
        </span>
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">
          Khoá học NextJs-pro Xây dựng E-Learning system hoàn chỉnh{" "}
        </h3>
        <div className="flex items-center text-xs gap-3 mb-5 text-gray-500 dark:text-grayDark">
          {courseInfor.map((item, index) => (
            <div className="flex items-center gap-1" key={index}>
              {item.icon('w-4 h-4')}
              <span className="text-xs bg-gray-300 text-gray-500 bg-opacity-10 px-3 py-1 rounded-xl">
                {item.title}
              </span>
            </div>
          ))}

          <span className=" text-primary ml-auto text-base font-bold">
            {" "}
            799.000đ
          </span>
        </div>

        <Link
          href="#"
          className=" flex items-center justify-center w-full mt-10 rounded-lg text-white bg-primary font-semibold h-12"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
