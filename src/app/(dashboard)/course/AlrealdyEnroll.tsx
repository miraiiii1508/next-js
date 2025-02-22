import Link from "next/link";
import React from "react";

const AlrealdyEnroll = () => {
  return (
    <div className="responsiveSellCourse ">
      <div className="bgDarkMode border borderDarkMode rounded-lg p-5 ">
        <h3 className="font-bold mb-3 text-sm">Bạn đã sở hữu khoá học chuyển tới khu vực học tập để tiếp tục</h3>
        <div className="w-full flex justify-center text-center">
          <Link
            className="w-full bg-primary py-2 rounded-2xl text-sm text-white button-primary"
            href={`/study`}
          >
            Chuyển tới Khu vực học tập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlrealdyEnroll;
