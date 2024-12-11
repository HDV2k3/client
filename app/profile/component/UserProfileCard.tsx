"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Avatar,
  Typography,
  Descriptions,
  Button,
  Upload,
  message,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dayOfBirth: string;
  avatar: string | null;
}

const UserProfileCard: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    dayOfBirth: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string>("");

  const fetchUserData = async () => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          message.error("No authentication token found");
          setLoading(false);
          return;
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

  if (loading) {
    return (
      <Card>
        <div className="text-center">Loading user information...</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center mb-6">
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader mr-6"
          showUploadList={false}
        >
          <Avatar size={120} icon={<UserOutlined />} src={userData.avatar} />
        </Upload>
        <div>
          <Title level={4}>{fullName}</Title>
          <Text type="secondary">{userData.email}</Text>
        </div>
      </div>
      <Descriptions bordered>
        <Descriptions.Item label="Họ và Tên">{fullName}</Descriptions.Item>
        <Descriptions.Item label="Ngày Sinh">
          {userData.dayOfBirth}
        </Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={onEdit}
        className="mt-4"
      >
        Chỉnh Sửa Thông Tin
      </Button>
    </Card>
  );
};

export default UserProfileCard;
