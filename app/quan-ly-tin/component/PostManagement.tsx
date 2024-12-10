import React, { useState, useEffect } from "react";
import { Tabs, message } from "antd";
import axios from "axios";
import { useRouter } from '@/hooks/useRouter';
import TabContent from "./TabContent";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const PostManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [posts, setPosts] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("Bạn cần đăng nhập.");
          router.push("/login");
          setLoading(false);
          return;
        }

        const statusMap: { [key: string]: string } = {
          "1": "ACTIVE",
          "2": "EXPIRED",
          "3": "REJECTED",
          "4": "PENDING",
        };
        const status = statusMap[activeTab] || "ACTIVE";

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/byUser?page=${page}&size=5&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setPosts(data.data.data);
        setTotalPosts(data.data.totalElements);
      } catch (error) {
        message.error("Không thể tải dữ liệu bài đăng.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(currentPage);
  }, [currentPage, activeTab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1); // Reset lại trang khi thay đổi tab
  };

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleTabChange}
      className="bg-white p-6 rounded-lg shadow"
    >
      {/* Tab 1 - Active Posts */}
      <Tabs.TabPane
        key="1"
        tab={
          <span className="flex items-center gap-2">
            <CheckCircleOutlined /> Tin đang hiển thị
          </span>
        }
      >
        <TabContent
          activeTab={activeTab}
          posts={posts}
          loading={loading}
          onPageChange={(page) => setCurrentPage(page)}
          total={totalPosts}
        />
      </Tabs.TabPane>

      {/* Tab 2 - Expired Posts */}
      <Tabs.TabPane
        key="2"
        tab={
          <span className="flex items-center gap-2">
            <CalendarOutlined /> Tin hết hạn
          </span>
        }
      >
        <TabContent
          activeTab={activeTab}
          posts={posts}
          loading={loading}
          onPageChange={(page) => setCurrentPage(page)}
          total={totalPosts}
        />
      </Tabs.TabPane>

      {/* Tab 3 - Rejected Posts */}
      <Tabs.TabPane
        key="3"
        tab={
          <span className="flex items-center gap-2">
            <CloseCircleOutlined /> Tin bị từ chối
          </span>
        }
      >
        <TabContent
          activeTab={activeTab}
          posts={posts}
          loading={loading}
          onPageChange={(page) => setCurrentPage(page)}
          total={totalPosts}
        />
      </Tabs.TabPane>

      {/* Tab 4 - Pending Posts */}
      <Tabs.TabPane
        key="4"
        tab={
          <span className="flex items-center gap-2">
            <ClockCircleOutlined /> Tin chờ duyệt
          </span>
        }
      >
        <TabContent
          activeTab={activeTab}
          posts={posts}
          loading={loading}
          onPageChange={(page) => setCurrentPage(page)}
          total={totalPosts}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PostManagement;
