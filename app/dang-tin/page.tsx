"use client";

import React from "react";
import { useRouter } from '@/hooks/useRouter';
import { Modal, notification } from "antd";
import axios from "axios";
import CreatePage from "./component/CreatePage";

const NewRoomPage: React.FC = () => {
  const router = useRouter();

  const handleCreatePost = async (token: string | null, roomData: RoomFinal) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/create`, // Replace with your API endpoint
      roomData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const createdRoomId = response.data.data.id; // Get room ID from response

      notification.success({
        message: "Room created successfully!",
      });
      localStorage.setItem("roomData", JSON.stringify(roomData));
      // Redirect to the image upload page for the newly created room
      router.push(`/dang-tin/${createdRoomId}/upload-images`);
    }
  }
  const handleAds = async (roomData: RoomFinal) => {
    const typePackage = roomData?.typePackage;
    const token = localStorage.getItem("token");
    Modal.confirm({
      title: 'Xác nhận sử dụng gói quảng cáo',
      content: 'Bạn đang chọn gói quảng cáo. Bạn có chắc chắn muốn tiếp tục không?',
      onOk: async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/userPayment/getUserPayment`
          const dataResponseBalance = await fetch(url,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          const dataBalance = await dataResponseBalance.json();
          const balance = dataBalance?.data?.balance;

          const price =
            typePackage === 1 ? 10000 :
              typePackage === 2 ? 500000 :
                typePackage === 3 ? 189000 :
                  0;

          if (balance < price) {
            Modal.confirm({
              title: 'Không đủ tiền thanh toán',
              content: 'Bạn có muốn nạp thêm tiền vào để tiếp tục?',
              onOk() {
                router.push('/payment');
              },
              onCancel() {
                notification.info({
                  message: "Kết thúc quá trình đăng bài",
                });
                return;
              },
            });
            return;
          }

          console.log('bat dau dang baif');
          await handleCreatePost(token, roomData);
        } catch (error) {
          console.error("Tạo bài viết thất bại:", error);
          notification.error({
            message: "Lỗi quá trình thêm bài",
          });
        }
      },
      onCancel() {
        notification.info({ message: "Đã huỷ quá trình thêm bài", });
        return;
      },
    });
  }
  const handleSubmit = async (roomData: RoomFinal) => {
    const token = localStorage.getItem("token");
    console.log("createData", roomData);
    try {
      const typePackage = roomData?.typePackage;
      if (typePackage && typePackage !== 0) {
        await handleAds(roomData);
      } else {
        await handleCreatePost(token, roomData);
        console.log('dang bai khong quang cao');
      }
    } catch (error) {
      console.error("Room creation failed:", error);
      notification.error({
        message: "Failed to create room.",
      });
    }
  };

  return (
    <div>
      <CreatePage onSubmit={handleSubmit} />
    </div>
  );
};

export default NewRoomPage;
