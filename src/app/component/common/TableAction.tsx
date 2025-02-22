import React from "react";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import { IconEye } from "../icons";
import Link from "next/link";
import { commonClassName } from "@/constants";
type TTableActionIcon = "edit" | "delete" | "view";
const TableAction = ({
  onClick,
  type,
  url,
}: {
  onClick?: () => void;
  type: TTableActionIcon;
  url?: string;
}) => {
  const icon: Record<TTableActionIcon, JSX.Element> = {
    edit: <IconEdit className="size-5" />,
    delete: <IconDelete className="size-5" />,
    view: <IconEye className="size-5" />,
  };
  if (url) {
    return (
      <Link href={url} className={commonClassName.action}>
        {icon[type]}
      </Link>
    );
  }
  return (
    <button className={commonClassName.action} onClick={onClick}>
      {icon[type]}
    </button>
  );
};

export default TableAction;
