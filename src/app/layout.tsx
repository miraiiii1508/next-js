import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "./ultils";
import SideBar from "./component/layout/SideBar";

export const metadata: Metadata = {
  title: "Lammm's Web Dev Blog",
  description: "Web Dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <div className="wrapper grid grid-cols-[300px,minmax(0,1fr)] h-screen">
       <SideBar/>
          <main>{children}</main>
        </div>
        
      </body>
    </html>
  );
}
