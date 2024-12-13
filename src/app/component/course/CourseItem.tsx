import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconEye, IconStar } from "../icons";
import { ICourse } from "@/database/course.modal";

const CourseItem = ({ data,cta ,url=''}: { data: ICourse,cta?:string ,url?:string}) => {
  const courseInfor = [
    {
      title: data.views ? data.views.toLocaleString("de-DE") : "0",
      icon: (className?: string) => <IconEye className={className} aria-hidden="true" />,
    },
    {
      title: data.rating[0] || "N/A",
      icon: (className?: string) => <IconStar className={className} aria-hidden="true" />,
    },
  ];
  const urlCourse = url ?url :`/course/${data.slug}`
  return (
    <div className="bg-white dark:bg-grayDarker dark:border-opacity-10 border-gray-200 p-4 rounded-2xl h-full flex flex-col">
      <Link href={urlCourse} className="block h-[180px] relative">
        <Image
          alt=""
          src={data.img}
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width:640px) 300px 100vw"
        />
        <span className="inline-block px-3 rounded-full bg-primary text-white text-xs absolute top-3 right-3">
          new
        </span>
      </Link>
      <div className="pt-5 flex flex-1 flex-col">
        <h3 className="text-lg lg:text-xl font-bold mb-5 line-clamp-3 block">{data.title}</h3>
        
        <div className="mt-auto"> {/* Sử dụng mt-auto để đẩy xuống đáy */}
          <div className="flex items-center text-xs gap-3 mb-5 text-gray-500 dark:text-grayDark">
            {courseInfor.map((item, index) => (
              <div className="flex items-center gap-1" key={index}>
                {item.icon("w-4 h-4")}
                <span className="text-xs bg-gray-300 text-gray-500 bg-opacity-10 px-3 py-1 rounded-xl">
                  {item.title}
                </span>
              </div>
            ))}
            <span className="text-primary ml-auto text-base font-bold">
              {data.price.toLocaleString("de-DE")}đ
            </span>
          </div>
          <Link
            href={urlCourse}
            className="flex items-center justify-center w-full rounded-lg text-white bg-primary font-semibold h-12 button-primary"
          >
           {cta || 'Xem chi tiết'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
