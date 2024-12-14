"use client";

import React, { useEffect, useState } from "react";
import { Button, notification, Spin } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import RoomImageUpload from "../../component/UploadImages";
import TitleRoom from "@/components/TitleRoom";

const UploadPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
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

  return (
    <div className="h-[900px]">
      <TitleRoom title="Thêm ảnh để hoàn thành quá trình đăng bài" />
      <RoomImageUpload postId={typeof id === "string" ? id : ""} />
      <Button
        type="primary"
        onClick={() => {
          router.push(`/home`);
        }}
      >
        {" "}
        Tro ve trang chu
      </Button>
      <Button
        type="primary"
        onClick={() => {
          router.push(`/quan-ly-tin`);
        }}
      >
        {" "}
        Quản lý tin
      </Button>
    </div>
  );
};

export default UploadPage;
