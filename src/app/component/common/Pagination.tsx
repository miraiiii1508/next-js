import React from "react";
import IconPrev from "../icons/IconPrev";
import IconNext from "../icons/IconNext";

const Pagination = ({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) => {
  return (
    <div className="flex justify-end gap-3 mt-5">
      <button className={className} onClick={onClick}>
        <IconPrev />
      </button>
      <button className={className} onClick={onClick}>
        <IconNext />
      </button>
    </div>
  );
};

export default Pagination;
