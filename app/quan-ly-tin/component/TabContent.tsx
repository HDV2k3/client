import React from "react";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import PostList from "./PostList";

interface TabContentProps {
  activeTab: string;
  posts: Room[];
  loading: boolean;
  onPageChange: (page: number) => void;
  total: number;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  posts,
  loading,
  onPageChange,
  total,
}) => {
  let status = "";
  switch (activeTab) {
    case "1":
      status = "ACTIVE";
      break;
    case "2":
      status = "EXPIRED";
      break;
    case "3":
      status = "REJECTED";
      break;
    case "4":
      status = "PENDING";
      break;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Quản lý tin đăng</h2>
        <PostList
          posts={posts}
          loading={loading}
          onPageChange={onPageChange}
          total={total}
        />
      </div>
    </div>
  );
};

export default TabContent;
