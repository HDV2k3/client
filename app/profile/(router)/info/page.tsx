"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image";
import axios from "axios";
import { redirect } from "next/navigation";
import { Card, Typography, Descriptions, Button, Upload, message, Image, Avatar } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
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
    const [editing, setEditing] = useState(false); // Editing mode

    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null); // Temporary avatar preview
    const [uploadedFile, setUploadedFile] = useState<File | null>(null); // File to be uploaded on save
    const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);

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

    const handleAvatarChange = (file: File) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
            return false;
        }
        setPreviewAvatar(URL.createObjectURL(file)); // Temporary preview
        setUploadedFile(file); // Save file for upload on save
        setEditing(true); // Enable editing mode
        return false; // Prevent auto-upload
    };

    const handleSave = async () => {

        if (!uploadedFile) { message.error("No file to upload."); return; }
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) { message.error("No authentication token found"); return; }

        const formData = new FormData();
        formData.append("file", uploadedFile);

        try {
            setIsLoadingUpload(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL_USER}/users/upload-avatar?userId=${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setUserData((prev) => ({ ...prev, avatar: response.data.avatar }));
            message.success("Avatar updated successfully!");
            setEditing(false);
            setPreviewAvatar(null);
            setUploadedFile(null);
            setIsLoadingUpload(false);
        } catch (error) {
            console.error("Error uploading avatar:", error);
            message.error("Failed to upload avatar");
            setIsLoadingUpload(false);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setPreviewAvatar(null);
        setUploadedFile(null);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading)
        return (
            <Card>
                <div className="text-center">Loading user information...</div>
            </Card>
        );

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <div className="flex justify-center items-center">
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader mr-6"
                        showUploadList={false}
                        accept="image/png"
                        beforeUpload={handleAvatarChange}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            alt="avatar"
                            style={{ borderRadius: "50%", cursor: 'pointer', objectFit: 'cover', width: '100%', height: '100%' }}
                            src={previewAvatar || userData.avatar || "/assets/images/avt.png"}
                        />
                    </Upload>
                    <div className="ml-5">
                        <Title level={4}>{fullName}</Title>
                        <Text type="secondary">{userData.email}</Text>
                    </div>
                </div>

                {editing &&
                    <div className="flex gap-2 mt-4">
                        <Button type="primary" loading={isLoadingUpload} icon={<SaveOutlined />} onClick={handleSave}>
                            Lưu
                        </Button>
                        <Button disabled={isLoadingUpload} onClick={handleCancel}>Hủy</Button>
                    </div>
                }
            </div>

            <Descriptions
                bordered
                column={1}
                contentStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
                <Descriptions.Item label="Họ và Tên">{fullName}</Descriptions.Item>
                <Descriptions.Item label="Ngày Sinh">
                    {formatFullDate(userData.dayOfBirth)}
                </Descriptions.Item>
            </Descriptions>

            <Button
                type="primary"
                disabled={isLoadingUpload}
                icon={<EditOutlined />}
                onClick={() => setEditing(true)}
                className="mt-4"
            >
                Chỉnh Sửa Thông Tin
            </Button>
        </Card>
    );
}
