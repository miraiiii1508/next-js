import { IconReplay } from "@/app/component/icons";
import { Button } from "@/components/ui/button";
import { courseLevelTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ECourseLevel, ECourseStatus } from "@/type/enum";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getCourseBySlug({ slug: params.slug });
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <></>;
  const videoId = data?.intro_url?.split("v=")[1]?.split("&")[0];
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {data?.intro_url ? (
            <>
              <iframe
                width="929"
                height="522"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Black Myth: Wukong - Bajie and Violet Spider Love Song「Listen Not 勿听」Ru&#39;s Piano Cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full object-fill"
              ></iframe>
            </>
          ) : (
            <Image
              src={data?.img || ""}
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
            ></Image>
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
        <BoxSection title="Mô tả">{data?.description}</BoxSection>
        <h2 className="font-bold text-xl mb-2">Thông tin</h2>
        <div className="grid grid-cols-4 gap-5 mb-10">
          <BoxInfor title="Bài học">{100}</BoxInfor>
          <BoxInfor title="Lượt xem">{1000000}</BoxInfor>
          <BoxInfor title="Trình độ">
            {courseLevelTitle[data?.level ?? ECourseLevel.BEGINNER]}
          </BoxInfor>
          <BoxInfor title="Thời lượng">{`45 phút`}</BoxInfor>
        </div>
        <BoxSection title="Yêu cầu">
          {data?.infor.requirement.map((item, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="flex items-center size-5 justify-center p-1 shrink-0 rounded bg-primary text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <span>{item}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Lợi ích">
          {data?.infor.benifit.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </BoxSection>
        <BoxSection title="Q&A">
          {data?.infor.qa.map((item, index) => (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                  {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </BoxSection>
      </div>
      <div className="responsiveSellCourse ">
        <div className="bg-white rounded-lg p-5 ">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-primary text-xl font-bold">
              {data?.sale_price.toLocaleString('de-DE')}đ
            </strong>
            <span className="text-slate-400 line-through text-sm">
              {data?.price.toLocaleString('de-DE')}đ
            </span>
            <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
              {data?.price && data?.sale_price
                ? Math.floor(100 - (data.sale_price / data.price) * 100)
                : 0}
              %
            </span>
          </div>
          <h3 className="font-bold mb-3 text-sm">Khoá học bao gồm có:</h3>
          <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <IconReplay className="size-4" />
              <span>30h học</span>
            </li>
            <li className="flex items-center gap-2">
              <IconReplay className="size-4" />
              <span>Video full Hd</span>
            </li>
            <li className="flex items-center gap-2">
              <IconReplay className="size-4" />
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className="flex items-center gap-2">
              <IconReplay className="size-4" />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button variant="primary" className="w-full">
            Mua khoá học
          </Button>
        </div>
      </div>
    </div>
  );
};
function BoxInfor({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-5 ">
      <span className="text-sm text-slate-400 font-normal">{title}</span>
      <h4 className="font-bold">{children}</h4>
    </div>
  );
}
function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="leading-normal mb-10">{children}</div>
    </>
  );
}
export default page;
