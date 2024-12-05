import React from "react";
import { Card, Avatar, Typography, Descriptions, Button, Upload } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Title, Text } = Typography;

interface UserProfileCardProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    dayOfBirth: string;
    avatar: string | null;
  };
  onEdit: () => void;
  onUpload: UploadProps["onChange"];
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userData, onEdit, onUpload }) => (
  <Card>
    <div className="flex items-center mb-6">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader mr-6"
        showUploadList={false}
        onChange={onUpload}
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
      <Descriptions.Item label="Số Điện Thoại">{userData.phone}</Descriptions.Item>
      <Descriptions.Item label="Ngày Sinh">{userData.dayOfBirth}</Descriptions.Item>
    </Descriptions>
    <Button type="primary" icon={<EditOutlined />} onClick={onEdit} className="mt-4">
      Chỉnh Sửa Thông Tin
    </Button>
  </Card>
);

export default UserProfileCard;
