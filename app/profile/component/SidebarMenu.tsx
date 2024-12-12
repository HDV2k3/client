import React from "react";
import { Avatar, Menu, Typography } from "antd";
import {
  UserOutlined,
  WalletOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface SidebarMenuProps {
  // activeTab: string;
  // setActiveTab: (tab: string) => void;
  avatar?: string | null;
  name: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  // activeTab,
  // setActiveTab,
  avatar,
  name,
}) => (
  <div>
    <div className="p-4 text-center">
      <Avatar size={80} icon={<UserOutlined />} src={avatar} />
      <Title level={4} className="mt-2">
        {name}
      </Title>
    </div>
    <Menu
      mode="inline"
    // selectedKeys={[activeTab]}
    // onSelect={({ key }) => setActiveTab(key)}
    >
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Thông Tin Cá Nhân
      </Menu.Item>
      <Menu.Item key="balance" icon={<WalletOutlined />}>
        Số Dư
      </Menu.Item>
      <Menu.Item key="deposit-history" icon={<HistoryOutlined />}>
        Lịch Sử Nạp Tiền
      </Menu.Item>
    </Menu>
  </div>
);

export default SidebarMenu;
