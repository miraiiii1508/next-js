import { Manrope, Roboto } from "next/font/google";
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
export const createOrderCode = () =>
  `DH-${new Date().getTime().toString().slice(-6)}`;
