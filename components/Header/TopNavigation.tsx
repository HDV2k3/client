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
            <span style={{ color: "#FBBF24" }}>Next Rooms</span>
          </Button>
        </Link>
        <Link href="/rooms">
          {" "}
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span style={{ color: "#FBBF24" }}>Next News</span>
          </Button>
        </Link>
        <Link href="/rooms">
          {" "}
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span style={{ color: "#FBBF24" }}>Next Other</span>
          </Button>{" "}
        </Link>
        <Link href="products">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span style={{ color: "#FBBF24" }}>Next Products</span>
          </Button>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="dong-gop-y-kien">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span style={{ color: "#FBBF24" }}>Đóng góp ý kiến</span>
          </Button>
        </Link>
        <Link href="error">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span style={{ color: "#FBBF24" }}>Tải ứng dụng</span>
          </Button>
        </Link>
        <Link href="tro-giup">
          <Button
            type="link"
            className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
          >
            <span style={{ color: "#FBBF24" }}>Trợ giúp</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopNavigation;
