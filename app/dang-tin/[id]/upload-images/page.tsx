"use client";

import React, { useEffect, useState } from "react";
import { Button, notification, Spin } from "antd";
import axios from "axios";
import RoomListingForm from "../update/components/updatePost";
import { useParams, useRouter } from "next/navigation";
import RoomImageUpload from "../../component/UploadImages";

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
    <div>
      <RoomImageUpload postId={typeof id === "string" ? id : ""} />
      <Button
        type="primary"
        onClick={() => {
          router.push(`/dang-tin/${id}/update`);
        }}
      >
        {" "}
        Tro ve trang chu
      </Button>
    </div>
  );
};

export default UploadPage;
