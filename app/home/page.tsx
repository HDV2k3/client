"use client";
import React from "react";
import { Button } from "antd";
import TitleRoom from "../../components/TitleRoom";
import PromotionBanner from "./component/PromotionBanner";
import usePaginatedFeatureRooms from "../../hooks/usePaginatedFeaturedRooms";
import usePaginatedPromotionalRooms from "../../hooks/usePaginatedPromotionalRooms";
import CarouselSpacing from "../../components/CarouselSpacingRoomList";
import FeaturedRoomList from "../../components/RoomList";
import LoadMoreButton from "../../components/LoadMoreButton";
import SquareAndRectangles from "../../app/home/component/SquareAndRectangles";
import Courasel from "../../app/home/component/Courasel";
import IconRow from "../../app/home/component/IconRow";
import Content from "./component/News";
import Chat from "../../components/Chat";
import { FiArrowUp } from "react-icons/fi";

const HomePage: React.FC = () => {
  const {
    rooms: featureRooms,
    isLoadingInitialData: isLoadingFeatureInitialData,
    isLoadingMore: isLoadingFeatureMore,
    isReachingEnd: isFeatureReachingEnd,
    loadMore: loadMoreFeature,
    reset: resetFeature,
    error: featureError,
  } = usePaginatedFeatureRooms();

  const {
    rooms: promotionalRooms,
    isLoadingMore: isLoadingPromoMore,
    error: promoError,
  } = usePaginatedPromotionalRooms();

  if (featureError || promoError) return <div>Failed to load rooms</div>;

  return (
    <div className="container mx-auto px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl">
      {/* Carousel and Icon Row Section */}
      <div className="m-0 p-0">
        {/* <Courasel /> */}
        <IconRow />
      </div>

      {/* Promotion Banner */}
      <div className="py-5">
        <PromotionBanner />
      </div>

      {/* Featured Rooms Section */}
      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng trọ nổi bật" />
        <FeaturedRoomList
          rooms={featureRooms}
          isLoadingMore={isLoadingFeatureMore || false}
          PAGE_SIZE={8}
        />
        <LoadMoreButton
          isLoadingInitialData={isLoadingFeatureInitialData}
          isReachingEnd={isFeatureReachingEnd || false}
          loadMore={loadMoreFeature}
          reset={resetFeature}
          roomsLength={featureRooms.length}
          isLoadingMore={isLoadingFeatureMore || false}
        />
      </div>

      {/* Promotional Rooms Section */}
      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng ưu đãi" />
        <CarouselSpacing
          rooms={promotionalRooms}
          PAGE_SIZE={10}
          isLoadingMore={isLoadingPromoMore || false}
        />
      </div>

      {/* Rooms by Location */}
      <div className="sm:mb-8">
        <TitleRoom title="Phòng theo địa điểm" />
        <SquareAndRectangles />
      </div>

      {/* News Section */}
      <div>
        <Content />
      </div>
    </div>
  );
};

export default HomePage;
