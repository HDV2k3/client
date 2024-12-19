// import React from "react";
// import TitleRoom from "../../components/TitleRoom";
// import { fetchPostsFeaturedByPage, fetchPostsPromotionalByPage } from "@/service/Marketing";
// import MainRoomList from "./component/MainRoomList";
// import MainPromotions from "./component/MainRoomListPromotion";

// const HomePage = async () => {
//   const page = 1;
//   const size = 8;

//   const dataResponseRooms = await fetchPostsFeaturedByPage(page, size);
//   const dataRooms = dataResponseRooms?.data?.data;
//   const dataResponsePromotion = await fetchPostsPromotionalByPage(page, size);
//   const dataRoomsPromotions = dataResponsePromotion?.data?.data;
//   return (
//     <>
//       <div className="mb-6 sm:mb-8">
//         <TitleRoom title="Phòng trọ nổi bật" />
//         <MainRoomList data={dataRooms} page={page} size={size} />
//       </div>

//       <div className="mb-6 sm:mb-8">
//         <TitleRoom title="Phòng ưu đãi" />
//         <MainPromotions data={dataRoomsPromotions} page={page} size={size} />
//       </div>
//     </>
//   );
// };

// export default HomePage;
"use client";
import React, { useEffect, useState } from "react";
import TitleRoom from "../../components/TitleRoom";
import {
  fetchPostsFeaturedByPage,
  fetchPostsPromotionalByPage,
} from "@/service/Marketing";
import MainRoomList from "./component/MainRoomList";
import MainPromotions from "./component/MainRoomListPromotion";

const HomePage = () => {
  const [dataRooms, setDataRooms] = useState(null);
  const [dataRoomsPromotions, setDataRoomsPromotions] = useState(null);
  const page = 1;
  const size = 8;

  // Fetch featured rooms every 2 seconds
  useEffect(() => {
    // Initial fetch
    fetchFeaturedRooms();
    fetchPromotionalRooms();

    // Set up interval for featured rooms
    const intervalId = setInterval(() => {
      fetchFeaturedRooms();
    }, 2000); // 2000ms = 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  const fetchFeaturedRooms = async () => {
    try {
      const response = await fetchPostsFeaturedByPage(page, size);
      setDataRooms(response?.data?.data);
    } catch (error) {
      console.error("Error fetching featured rooms:", error);
    }
  };

  const fetchPromotionalRooms = async () => {
    try {
      const response = await fetchPostsPromotionalByPage(page, size);
      setDataRoomsPromotions(response?.data?.data);
    } catch (error) {
      console.error("Error fetching promotional rooms:", error);
    }
  };

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng trọ nổi bật" />
        <MainRoomList data={dataRooms} page={page} size={size} />
      </div>

      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng ưu đãi" />
        <MainPromotions data={dataRoomsPromotions} page={page} size={size} />
      </div>
    </>
  );
};

export default HomePage;
