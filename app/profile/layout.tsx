'use client';

import React from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import { UserOutlined, WalletOutlined, HistoryOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Sider, Content } = Layout;
const { Title } = Typography;

type Props = {
  children: React.ReactNode;
};

export default function LayoutProfile({ children }: Props) {
  return (
    <Layout style={{ height: '80vh', backgroundColor: '#1e3a8a', display: 'flex', marginBottom: 20 }}>
      {/* Sider with a light blue background */}
      <Sider width={240} style={{ backgroundColor: '#1e3a8a', padding: '20px' }}>
        <div className="text-center mb-4">
          {/* Avatar with white border */}
          <Avatar
            size={80}
            icon={<UserOutlined />}
            src={'/assets/images/avt.png'}
            style={{ border: '2px solid white', backgroundColor: '#ffffff' }}
          />
          <Title level={4} className="mt-2" style={{ color: '#ffffff' }}>
            {'thaito'}
          </Title>
        </div>
        <Menu
          mode="inline"
          style={{
            backgroundColor: 'transparent',
            color: '#ffffff',
          }}
        >
          <Menu.Item key="profile" icon={<UserOutlined style={{ color: '#ffffff' }} />}>
            <Link href={'/profile/info'} style={{ color: '#ffffff' }}>
              Thông Tin Cá Nhân
            </Link>
          </Menu.Item>
          <Menu.Item key="balance" icon={<WalletOutlined style={{ color: '#ffffff' }} />}>
            <Link href={'/profile/balance'} style={{ color: '#ffffff' }}>
              Số Dư
            </Link>
          </Menu.Item>
          <Menu.Item key="deposit-history" icon={<HistoryOutlined style={{ color: '#ffffff' }} />}>
            <Link href={'/profile/history'} style={{ color: '#ffffff' }}>
              Lịch Sử Nạp Tiền
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      {/* Content with a white background */}
      <Content style={{ flex: 1, padding: '24px', backgroundColor: '#ffffff' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            color: '#333333',
            overflow: 'auto', // Handle overflow content
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}
