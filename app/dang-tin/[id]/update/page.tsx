// /app/rooms/[id]/edit.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Spin, notification } from "antd";
import RoomListingFormUpdate from "./components/updatePost";

const EditRoomPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Lấy thông tin phòng từ API
  useEffect(() => {
    const fetchRoomData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-by-id/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/${id}`,
        updatedRoomData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        notification.success({ message: "Room updated successfully!" });
        router.push(`/`); // Chuyển hướng về trang chi tiết phòng
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

  return (
    <div className="p-6">
      <RoomListingFormUpdate roomData={roomData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditRoomPage;
