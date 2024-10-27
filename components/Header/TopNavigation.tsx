import Link from "next/link";
import { Button } from "antd";

const TopNavigation = () => {
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
        <Button
          type="link"
          className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
        >
          <span style={{ color: "#FBBF24" }}>Next Jobs</span>
        </Button>
        <Button
          type="link"
          className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
        >
          <span style={{ color: "#FBBF24" }}>Next Products</span>
        </Button>
      </div>
      <div className="flex space-x-4">
        <Button
          type="link"
          className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
        >
          <span style={{ color: "#FBBF24" }}>Đóng góp ý kiến</span>
        </Button>
        <Button
          type="link"
          className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
        >
          <span style={{ color: "#FBBF24" }}>Tải ứng dụng</span>
        </Button>
        <Button
          type="link"
          className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
        >
          <span style={{ color: "#FBBF24" }}>Trợ giúp</span>
        </Button>
      </div>
    </div>
  );
};

export default TopNavigation;
