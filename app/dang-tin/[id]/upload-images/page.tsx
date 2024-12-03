"use client";

import React, { useEffect, useState } from "react";
import { notification, Spin } from "antd";
import axios from "axios";
import RoomListingForm from "../update/components/updatePost";
import { useParams, useRouter } from "next/navigation";

const UploadPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  // Lấy thông tin phòng từ API
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-by-id/${id}`
        );
        setRoomData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomData();
    }
  }, [id]);

  const handleSubmit = async (updatedRoomData: RoomFinal) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/${id}`,
        updatedRoomData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        notification.success({ message: "Room updated successfully!" });
        router.push(`/dang-tin/${id}/update`); // Chuyển hướng về trang chi tiết phòng
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: "Failed to update room." });
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!roomData) {
    return <div>Room not found</div>;
  }

  return <RoomListingForm onSubmit={handleSubmit} />;
};

export default UploadPage;
