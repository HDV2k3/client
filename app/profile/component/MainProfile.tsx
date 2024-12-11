"use client";

import React, { useState } from "react";
import { Layout } from "antd";
import SidebarMenu from "./SidebarMenu";
import UserProfileCard from "./UserProfileCard";
import BalanceCard from "./BalanceCard";
import DepositHistoryTable from "./DepositHistoryTable";

const { Sider, Content } = Layout;

export default function MainProfilePage() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfileCard onEdit={() => setIsEditModalVisible(true)} />;
      case "balance":
        return <BalanceCard />;
      case "deposit-history":
        return <DepositHistoryTable />;
      default:
        return null;
    }
  };

  return (
    <Layout className="bg-gray-100 h-full min-h-[900px]">
      <Sider width={250} theme="light" className="shadow-md">
        <SidebarMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          avatar=""
          name=""
        />
      </Sider>
      <Content className="p-6">{renderContent()}</Content>
    </Layout>
  );
}
