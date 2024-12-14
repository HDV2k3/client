'use client';

import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Typography, message } from "antd";
import { UserOutlined, WalletOutlined, HistoryOutlined } from "@ant-design/icons";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { DataUser } from "./types/UserData";
import axios from "axios";

const { Sider, Content } = Layout;
const { Title } = Typography;

type Props = {
  children: React.ReactNode;
};

export default function LayoutProfile({ children }: Props) {
  const [userData, setUserData] = useState<DataUser>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    dayOfBirth: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState<string>("");

  const path = usePathname();

  const fetchUserData = async () => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          message.error("No authentication token found");
          setLoading(false);
          redirect("/login");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_USER}/users/my-info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data.data);
        const fullName = `${response.data.data.firstName} ${response.data.data.lastName}`;
        setFullName(fullName);
        localStorage.setItem("fullName", fullName);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Layout style={{ marginTop: '20px', height: '80vh', backgroundColor: '#1e3a8a', display: 'flex', marginBottom: 20, borderRadius: '8px', overflow: 'hidden', }} >
      <Sider width={240} style={{ width: '100%', maxWidth: 240, minWidth: 100, backgroundColor: '#1e3a8a', padding: '20px', borderRight: '1px solid #ffffff33', }}       >
        <div className="text-center mb-4">
          <Avatar
            size={80}
            icon={<UserOutlined />}
            src={userData?.avatar || '/assets/images/avt.png'}
            style={{ border: '2px solid white', backgroundColor: '#ffffff', marginBottom: '10px', }}
          />
          <Title level={4} style={{ color: '#ffffff', marginBottom: '0' }}>
            {fullName}
          </Title>
        </div>
        <Menu mode="inline" defaultSelectedKeys={[path]} selectedKeys={[path]} style={{ backgroundColor: 'transparent', color: '#ffffff', }} >
          <Menu.Item
            key="/profile/info"
            icon={<UserOutlined style={{ color: path === '/profile/info' ? "black" : '#ffffff' }} />}
            style={{ borderRadius: '8px', marginBottom: '8px', }}
          >
            <Link href={'/profile/info'} style={{ color: path === '/profile/info' ? "black" : '#ffffff' }}>
              Thông Tin Cá Nhân
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/profile/balance"
            icon={<WalletOutlined style={{ color: path === '/profile/balance' ? "black" : '#ffffff' }} />}
            style={{ borderRadius: '8px', marginBottom: '8px', }}
          >
            <Link href={'/profile/balance'} style={{ color: path === '/profile/balance' ? "black" : '#ffffff' }}>
              Số Dư
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/profile/history"
            icon={<HistoryOutlined style={{ color: path === '/profile/history' ? "black" : '#ffffff' }} />}
            style={{ borderRadius: '8px', }}
          >
            <Link href={'/profile/history'} style={{ color: path === '/profile/history' ? "black" : '#ffffff' }}>
              Lịch sử giao dịch
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ flex: 1, padding: '24px', backgroundColor: '#ffffff', overflow: 'auto' }} >
        <div style={{ width: '100%', height: '100%', color: '#333333', }} >
          {children}
        </div>
      </Content>
    </Layout>
  );
}
