import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "./ultils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./component/common/ThemeProvider";

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
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
