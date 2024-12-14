// 'use client';

import Link from "next/link";
import { Button } from "antd";
// import useLanguge from "@/hooks/useLanguge";

const TopNavigation = () => {
  // const { lang, LangugeOptions } = useLanguge();

  return (
    <div className="hidden sm:flex justify-between items-center text-sm mb-2">
      <div className="flex space-x-4">
        <Link href="/rooms">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span className="text-white font-semibold">Next Sản phẩm</span>
          </Button>
        </Link>
        <Link href="/news">
          {" "}
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span className="text-white font-semibold">Next Tin Tức</span>
          </Button>
        </Link>
        {/* <Link href="/rooms">
          {" "}
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span className="text-white font-semibold">Next Other</span>
          </Button>{" "}
        </Link> */}
        <Link href="/products">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span className="text-white font-semibold">Next Dịch Vụ</span>
          </Button>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="dong-gop-y-kien">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span className="text-white font-semibold">Đóng góp ý kiến</span>
          </Button>
        </Link>
        <Link href="error">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span className="text-white font-semibold">Tải ứng dụng</span>
          </Button>
        </Link>
        <Link href="tro-giup">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span className="text-white font-semibold">Trợ giúp</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopNavigation;
