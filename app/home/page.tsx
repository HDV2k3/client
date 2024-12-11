import React from "react";
import TitleRoom from "../../components/TitleRoom";
import { fetchPostsFeaturedByPage, fetchPostsPromotionalByPage } from "@/service/Marketing";
import MainRoomList from "./component/MainRoomList";
import MainPromotions from "./component/MainRoomListPromotion";

const HomePage = async () => {
  const page = 1;
  const size = 8;

  const dataResponseRooms = await fetchPostsFeaturedByPage(page, size);
  const dataRooms = dataResponseRooms?.data?.data;
  const dataResponsePromotion = await fetchPostsPromotionalByPage(page, size);
  const dataRoomsPromotions = dataResponsePromotion?.data?.data;
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
