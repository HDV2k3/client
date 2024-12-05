"use client";
import React, { useState } from "react";
import { Layout, message } from "antd";
import SidebarMenu from "./component/SidebarMenu";
import UserProfileCard from "./component/UserProfileCard";
import BalanceCard from "./component/BalanceCard";
import DepositHistoryTable from "./component/DepositHistoryTable";
import EditProfileModal from "./component/EditProfileModal";

const { Sider, Content } = Layout;

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const userData: UserData = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    dayOfBirth: "2003-02-08",
    balance: 50000000,
    avatar: null,
  };

  const depositHistory: DepositRecord[] = [
    {
      id: 1,
      method: "Momo",
      amount: 10000000,
      date: "2024-03-15",
      status: "success",
    },
    {
      id: 2,
      method: "VNPay",
      amount: 20000000,
      date: "2024-04-20",
      status: "processing",
    },
  ];

  const handleProfileEdit = (values: any) => {
    console.log("Profile update:", values);
    message.success("Cập nhật thông tin thành công!");
    setIsEditModalVisible(false);
  };

  const handleUpload = (info: any) => {
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
          <UserProfileCard
            userData={userData}
            onEdit={() => setIsEditModalVisible(true)}
            onUpload={handleUpload}
          />
        );
      case "balance":
        return <BalanceCard />;
      case "deposit-history":
        return <DepositHistoryTable />;
      default:
        return null;
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Sider width={250} theme="light" className="shadow-md">
        <SidebarMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          avatar={userData.avatar}
          name={userData.name}
        />
      </Sider>
      <Content className="p-6">{renderContent()}</Content>
      <EditProfileModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleProfileEdit}
        initialValues={userData}
      />
    </Layout>
  );
};

export default UserProfile;
