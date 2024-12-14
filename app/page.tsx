import { fetchCarouselData, fetchHomeNewAction, fetchPromotionBannerAction } from "@/service/actions/HomeAction";
import IconRow from "@/app/home/component/IconRow";
import Content from "@/app/home/component/News";
import PromotionBanner from "@/app/home/component/PromotionBanner";
import Courasel from "@/app/home/component/Courasel";
import TitleRoom from "@/components/TitleRoom";
import SquareAndRectangles from "@/app/home/component/SquareAndRectangles";
import { fetchPostsFeaturedByPage, fetchPostsPromotionalByPage } from "@/service/Marketing";
import MainRoomList from "./home/component/MainRoomList";
import MainPromotions from "./home/component/MainRoomListPromotion";
import RoomsLocation from "@/components/RenderRoomLocation";

export default async function LayoutHomePage() {
  const page = 1;
  const size = 8;

  const dataCourasel = await fetchCarouselData();
  const dataPromotion = await fetchPromotionBannerAction();
  const dataNew = await fetchHomeNewAction();

  const dataResponseRooms = await fetchPostsFeaturedByPage(page, size);
  const dataRooms = dataResponseRooms?.data?.data;

  const dataResponsePromotion = await fetchPostsPromotionalByPage(page, size);
  const dataRoomsPromotions = dataResponsePromotion?.data?.data;

  return (
    <div className="container mx-auto px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl">
      {/* Carousel and Icon Row Section */}
      <div className="m-0 p-0">
        {dataCourasel && <Courasel data={dataCourasel} />}
        <IconRow />
      </div>

      {/* Promotion Banner */}
      <div className="py-5">
        {dataPromotion && <PromotionBanner data={dataPromotion} />}
      </div>

      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng trọ nổi bật" />
        {dataRooms && <MainRoomList data={dataRooms} page={page} size={size} />}
      </div>

      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng ưu đãi" />
        {dataRoomsPromotions && <MainPromotions data={dataRoomsPromotions} page={page} size={size} />}
      </div>

      <div className="sm:mb-8">
        <RoomsLocation />
      </div>

      {/* Rooms by Location */}
      <div className="sm:mb-8">
        <TitleRoom title="Phòng theo địa điểm" />
        <SquareAndRectangles />
      </div>
      {/* News Section */}
      <div>
        {dataNew && <Content data={dataNew} />}
      </div>
    </div>
  )
}