import { commonClassName } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";

const StatusBadge = ({
  status,
  onClick,
}: {
  status?: { title: string; className?: string };
  onClick?: () => void;
}) => {
  return (
    <span
      className={cn(commonClassName.status, status?.className)}
      onClick={onClick}
    >
      {status?.title}
    </span>
  );
};

export default StatusBadge;
