// "use client";
// import React, { useState } from "react";
// import { Layout, message } from "antd";
// import SidebarMenu from "./component/SidebarMenu";
// import UserProfileCard from "./component/UserProfileCard";
// import BalanceCard from "./component/BalanceCard";
// import DepositHistoryTable from "./component/DepositHistoryTable";
// import EditProfileModal from "./component/EditProfileModal";

// const { Sider, Content } = Layout;

// interface UserProfileCardProps {
//   // userData: UserData;
//   // onEdit: () => void;
//   // onUpload: (info: any) => void;
// }

// const UserProfile: React.FC<UserProfileCardProps> = ({
//   // userData,
//   // onEdit,
//   // onUpload,
// }) => {
//   const [activeTab, setActiveTab] = useState<string>("profile");
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const fullName = localStorage.getItem("fullName");

//   const handleProfileEdit = (values: any) => {
//     console.log("Profile update:", values);
//     message.success("Cập nhật thông tin thành công!");
//     setIsEditModalVisible(false);
//   };

//   const handleUpload = (info: any) => {
//     if (info.file.status === "done") {
//       message.success(`Tải ảnh ${info.file.name} thành công`);
//     } else if (info.file.status === "error") {
//       message.error(`Tải ảnh ${info.file.name} thất bại`);
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return <UserProfileCard onEdit={() => setIsEditModalVisible(true)} />;
//       case "balance":
//         return <BalanceCard />;
//       case "deposit-history":
//         return <DepositHistoryTable />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Layout className="min-h-screen bg-gray-100">
//       <Sider width={250} theme="light" className="shadow-md">
//         <SidebarMenu
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           // avatar={userData?.avatar || ""}
//           avatar={''}
//           name={fullName || ""}
//         />
//       </Sider>
//       <Content className="p-6">{renderContent()}</Content>
//       {/* <EditProfileModal
//         visible={isEditModalVisible}
//         onCancel={() => setIsEditModalVisible(false)}
//         onSubmit={handleProfileEdit}
//         initialValues={userData}
//       /> */}
//     </Layout>
//   );
// };

// export default UserProfile;


import MainProfilePage from "./component/MainProfile";
export default function ProfilePage() {
  // return <MainProfilePage />
  return <></>
}