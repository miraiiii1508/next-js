"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  IconComment,
  IconCredit,
  IconDate,
  IconIdentification,
  IconVoucher,
} from "@/app/component/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { typePayment } from "@/constants";
import { ECouponType, EPaymentType } from "@/type/enum";
import { PaymentWithMomo, paymentWithVnPay } from "@/app/ultils/payment";
import { ICoupon } from "@/database/coupon.modal";
const ButtonEnroll = ({
  slug,
  price,
  courseId,
  userId,
  sale_price,
  orginal_price,
  coupon,
}: {
  slug: string;
  price: number;
  sale_price: number;
  orginal_price: number;
  courseId: string;
  userId: string | null;
  coupon: ICoupon | undefined;
}) => {
  const [capcha, setCapcha] = useState<string | null>();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const formSchema = z.object({
    type: z.string({ required_error: "Vui lòng chọn phương thức thanh toán" }),
  });
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleEnrollCourse = () => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để mua khoá học");
      return;
    }
  };
  async function onSubmit(value: z.infer<typeof formSchema>) {
    setIsSubmiting(true);
    try {
      if (!capcha) {
        setCaptchaError(true);
        return;
      }

      switch (value.type) {
        case EPaymentType.MOMO:
          PaymentWithMomo({
            _id: courseId,
            amount: price,
            url: `${process.env.NEXT_PUBLIC_DEV_BLOG_REDIRECT_URI}/course/${slug}`,
          });

          break;
        case EPaymentType.VNPay:
          paymentWithVnPay({
            amount: price,
            url: `${process.env.NEXT_PUBLIC_DEV_BLOG_REDIRECT_URI}/course/${slug}`,
          });
          break;
        case EPaymentType.MBBANK:
          toast.warning("Chức năng đang phát triển");
          break;
        case EPaymentType.VIETTINBANK:
          toast.warning("Chức năng đang phát triển");
          break;
        default:
          form.setError("type", {
            message: "Vui lòng chọn phương thức thanh toán",
          });
          break;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmiting(false);
    }
  }
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          form.reset();
          setCapcha(null);
          setCaptchaError(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="w-full flex justify-center text-center">
          <Button
            className="w-full bg-primary py-2 rounded-2xl text-lg text-white button-primary"
            onClick={handleEnrollCourse}
          >
            Mua khoá học
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] flex gap-0 ">
        <div className="w-[50%] h-[600px]  rounded-lg bg-primary relative">
          <div className="absolute top-14 right-0 w-[300px] h-[480px]  shadow-[-20px_0_30px_rgba(0,0,0,0.2)] rounded-lg bg-primary">
            <div className="pl-10 sm:flex flex-col gap-5 text-white h-full">
              <div className="text-sm pr-5 flex flex-col gap-6 pt-7 ">
                <span className=" font-bold text-xl">
                  Giá gốc :{orginal_price.toLocaleString("de-DE")}đ
                </span>
                <div className="flex justify-between items-center w-full">
                  <span>Khuyến mãi</span>
                  <span className="flex-1 border-b-4 border-dotted border-white mx-4 "></span>
                  <span>
                    {(orginal_price - sale_price).toLocaleString("de-DE")}đ
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span>Mã giảm giá</span>
                  <span className="flex-1 border-b-4 border-dotted border-white mx-4 "></span>
                  <span>
                    {coupon
                      ? coupon.type === ECouponType.PERCENT
                        ? `${((coupon.value * sale_price) / 100).toLocaleString(
                            "de-DE"
                          )}đ`
                        : `${coupon.value.toLocaleString("de-DE")}đ`
                      : "0đ"}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full font-bold ">
                  <span>Thành tiền</span>
                  <span className="flex-1 border-b-4 border-dotted border-white mx-4 "></span>

                  <span>{price.toLocaleString("de-DE")}đ</span>
                </div>
              </div>
              <Separator />
              <div className="text-sm pr-5 flex flex-col gap-4">
                <div className="flex items-center w-full gap-2">
                  <IconIdentification className="size-5" />
                  <div className="flex justify-between items-center w-full gap-2">
                    <span>Mã đơn:</span>
                    <span className="flex-1 border-b-4 border-dotted border-white"></span>
                    <span className="font-bold">DH-0123</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-2">
                  <IconDate className="size-5" />
                  <div className="flex justify-between items-center w-full gap-2">
                    <span>Ngày:</span>
                    <span className="flex-1 border-b-4 border-dotted border-white"></span>
                    <span className="font-bold">{formattedDate}</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-2">
                  <IconVoucher className="size-5" />
                  <div className="flex justify-between items-center w-full gap-2">
                    <span>Khuyến mãi:</span>
                    <span className="flex-1 border-b-4 border-dotted border-white"></span>
                    <span className="font-bold">
                      {orginal_price && sale_price
                        ? Math.floor(100 - (sale_price / orginal_price) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-2">
                  <IconCredit className="size-5" />
                  <div className="flex justify-between items-center w-full gap-2">
                    <span>Coupon:</span>
                    <span className="flex-1 border-b-4 border-dotted border-white"></span>
                    <span className="font-bold">{coupon?.code}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full gap-2 my-auto pr-5">
                <div>
                  <div>Chăm sóc khách hàng</div>
                  <div>Hotline:012345678</div>
                </div>
                <IconComment className="size-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-[600px] rounded-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col h-full"
            >
              <div className="p-5 mt-10 flex flex-col gap-5 h-full">
                <fieldset className="border border-primary rounded-lg p-5 relative">
                  <legend className="px-0 text-primary font-semibold text-lg bg-white dark:bg-gray-800 absolute -top-4 left-3">
                    Các phương thức thanh toán
                  </legend>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-col gap-5"
                          >
                            {typePayment.map((type) => (
                              <div
                                className={`flex items-center gap-3 p-4 border rounded-lg ${type.className}`}
                                key={type.value}
                              >
                                <RadioGroupItem
                                  value={type.value}
                                  id={type.value}
                                  className="border-slate-200 text-white"
                                />
                                <Image
                                  src={type.img}
                                  alt={type.title}
                                  width={36}
                                  height={36}
                                  className="object-contain"
                                />
                                <Label
                                  htmlFor={type.value}
                                  className="font-medium"
                                >
                                  {type.title}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </fieldset>

                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_KEY || ""}
                  onChange={(value) => {
                    setCapcha(value);
                    setCaptchaError(false); // Xóa lỗi khi tick
                  }}
                  className={`mx-auto ${
                    captchaError ? "border border-red-500" : ""
                  }`}
                />

                <Button
                  isLoading={isSubmiting}
                  variant="primary"
                  type="submit"
                  className="w-full h-14 text-xl font-semibold"
                  disabled={isSubmiting}
                >
                  Thanh Toán
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* <DialogFooter>
      
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default ButtonEnroll;
