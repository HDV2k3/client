"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import axios from "axios";
import RoomListingForm from "./component/createPosts";


const NewRoomPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (roomData: RoomFinal) => {
    const token = localStorage.getItem("token");

    try {
      // Submit the new room details (without images)
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

        // Redirect to the image upload page for the newly created room
        router.push(`/managementRoom/${createdRoomId}/upload-images`);
      }
    } catch (error) {
      console.error("Room creation failed:", error);
      notification.error({
        message: "Failed to create room.",
      });
    }
  };

  return (

    <RoomListingForm onSubmit={handleSubmit}/>
  );
};

export default NewRoomPage;
