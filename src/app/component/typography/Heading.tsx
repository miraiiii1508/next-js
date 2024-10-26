import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("lg:text-3xl text-2xl font-bold",className)}>{children}</div>;
};

export default Heading;
