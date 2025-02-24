import LessonContent from "@/app/component/lesson/LessonContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courseLevelTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getUserId } from "@/lib/actions/user.actions";
import { ECourseLevel, ECourseStatus } from "@/type/enum";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import CourseWidget from "../CourseWidget";
import AlrealdyEnroll from "../AlrealdyEnroll";
import { createResultMomo } from "@/lib/actions/PaymentMomoAction";
import { createOrder } from "@/lib/actions/order.actions";
import { createOrderCode } from "@/app/ultils";
import { createResultVPN } from "@/lib/paymentVNPay";
import { redirect } from "next/navigation";
const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const data = await getCourseBySlug({ slug: params.slug });
  const { userId } = auth();
  const lecture = data?.lectures || [];
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <></>;
  const videoId = data?.intro_url?.split("v=")[1]?.split("&")[0];
  const findUser = await getUserId({ userId: userId || "" });
  if (!findUser) return null;
  const userCourse = findUser?.course.map((c) => c.toString());
  const vnp_TxnRef = searchParams["vnp_TxnRef"];
  const vnp_TransactionNo = searchParams["vnp_PayDate"];
  const orderId = searchParams["orderId"];
  const vpn_responseCode = searchParams["vnp_ResponseCode"];
  const vnp_Amount = searchParams["vnp_Amount"];
  const amount = searchParams["amount"];
  if (orderId) {
    const response = await createResultMomo(orderId);
    if (response.resultCode === 0) {
      await createOrder({
        user: findUser._id,
        course: data._id,
        code: createOrderCode(),
        amount: data.price,
        total: amount ? parseInt(amount) : 0,
      });
      redirect(
        `${process.env.NEXT_PUBLIC_DEV_BLOG_REDIRECT_URI}/course/${data.slug}`
      );
    }
  }

  if (vpn_responseCode && vpn_responseCode === "00") {
    if (vnp_TxnRef && vnp_TransactionNo) {
      const response = await createResultVPN({
        orderId: vnp_TxnRef,
        transDate: vnp_TransactionNo,
      });
      if (
        response &&
        response.vnp_ResponseCode === "00" &&
        response.vnp_TransactionStatus === "00"
      ) {
        await createOrder({
          user: findUser._id,
          course: data._id,
          code: createOrderCode(),
          amount: data.price,
          total: vnp_Amount ? parseInt(vnp_Amount) / 100 : 0,
        });
        redirect(
          `${process.env.NEXT_PUBLIC_DEV_BLOG_REDIRECT_URI}/course/${data.slug}`
        );
      }
    }
  }
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
        <h2 className="font-bold text-xl mb-2">Nội dung khoá học</h2>
        <LessonContent lectures={lecture} course="" slug="" histories={[]} />
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
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </BoxSection>
      </div>
      {userCourse?.includes(data._id.toString()) ? (
        <AlrealdyEnroll />
      ) : (
        <CourseWidget data={data} userId={userId} />
      )}
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
    <div className="bg-white dark:bg-grayDarker rounded-lg p-5 ">
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
