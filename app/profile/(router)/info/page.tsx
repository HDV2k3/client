"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { redirect } from "next/navigation";
import { Card, Typography, Descriptions, Button, Upload, message, } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { formatFullDate } from "../../helper";
import { DataUser } from "../../types/UserData";
const { Title, Text } = Typography;

export default function InfoUserPage() {
    const [userData, setUserData] = useState<DataUser>({
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
                    redirect('/login');
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
                    style={{ width: 120, height: 120 }}
                >
                    <Image
                        width={120}
                        height={120}
                        alt="avatar"
                        objectFit="cover"
                        style={{ borderRadius: '50%' }}
                        src={userData.avatar || '/assets/images/avt.png'}
                    />
                </Upload>
                <div className="ml-5">
                    <Title level={4}>{fullName}</Title>
                    <Text type="secondary">{userData.email}</Text>
                </div>
            </div>

            <Descriptions
                bordered
                column={1}
                contentStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
                <Descriptions.Item label="Họ và Tên">
                    {fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày Sinh">
                    {formatFullDate(userData.dayOfBirth)}
                </Descriptions.Item>
            </Descriptions>

            <Button
                type="primary"
                icon={<EditOutlined />}
                //   onClick={onEdit}
                className="mt-4"
            >
                Chỉnh Sửa Thông Tin
            </Button>
        </Card>
    )
}