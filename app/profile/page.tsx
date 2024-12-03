"use client";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Avatar,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Table,
  Tag,
  Descriptions,
  Upload,
  message,
} from "antd";
import {
  UserOutlined,
  WalletOutlined,
  HistoryOutlined,
  EditOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

// Types for user data and deposit history
interface UserData {
  name: string;
  email: string;
  phone: string;
  balance: number;
  avatar: string | null;
}

interface DepositRecord {
  id: number;
  method: string;
  amount: number;
  date: string;
  status: "success" | "processing";
}

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "balance" | "deposit-history">("profile");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock user data
  const userData: UserData = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    balance: 50000000,
    avatar: null,
  };

  // Mock deposit history
  const depositHistory: DepositRecord[] = [
    { id: 1, method: "Momo", amount: 10000000, date: "2024-03-15", status: "success" },
    { id: 2, method: "VNPay", amount: 20000000, date: "2024-04-20", status: "processing" },
    { id: 3, method: "VietcomBank", amount: 15000000, date: "2024-05-10", status: "success" },
  ];

  const depositColumns = [
    {
      title: "Phương Thức",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Số Tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status: "success" | "processing") => (
        <Tag color={status === "success" ? "green" : "orange"}>
          {status === "success" ? "Thành Công" : "Đang Xử Lý"}
        </Tag>
      ),
    },
  ];

  const handleProfileEdit = (values: UserData) => {
    console.log("Profile update:", values);
    message.success("Cập nhật thông tin thành công!");
    setIsEditModalVisible(false);
  };

  const handleUpload: UploadProps["onChange"] = (info) => {
    if (info.file.status === "done") {
      message.success(`Tải ảnh ${info.file.name} thành công`);
    } else if (info.file.status === "error") {
      message.error(`Tải ảnh ${info.file.name} thất bại`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <Card>
            <div className="flex items-center mb-6">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader mr-6"
                showUploadList={false}
                onChange={handleUpload}
              >
                <Avatar size={120} icon={<UserOutlined />} src={userData.avatar} />
              </Upload>
              <div>
                <Title level={4}>{userData.name}</Title>
                <Text type="secondary">{userData.email}</Text>
              </div>
            </div>
            <Descriptions bordered>
              <Descriptions.Item label="Họ và Tên">{userData.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
              <Descriptions.Item label="Số Điện Thoại">{userData.phone}</Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditModalVisible(true)}
              className="mt-4"
            >
              Chỉnh Sửa Thông Tin
            </Button>
          </Card>
        );
      case "balance":
        return (
          <Card>
            <div className="text-center">
              <Title level={3}>Số Dư Tài Khoản</Title>
              <Title level={2} className="text-green-600">
                {userData.balance.toLocaleString()} VND
              </Title>
            </div>
          </Card>
        );
      case "deposit-history":
        return (
          <Card>
            <Table columns={depositColumns} dataSource={depositHistory} rowKey="id" />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Sider width={250} theme="light" className="shadow-md">
        <div className="p-4 text-center">
          <Avatar size={80} icon={<UserOutlined />} src={userData.avatar} />
          <Title level={4} className="mt-2">
            {userData.name}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          onSelect={({ key }) => setActiveTab(key as "profile" | "balance" | "deposit-history")}
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
      </Sider>
      <Content className="p-6">{renderContent()}</Content>

      <Modal
        title="Chỉnh Sửa Thông Tin Cá Nhân"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsEditModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} className="bg-blue-500">
            Lưu Thay Đổi
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" initialValues={userData} onFinish={handleProfileEdit}>
          <Form.Item
            name="name"
            label="Họ và Tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số Điện Thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default UserProfile;
