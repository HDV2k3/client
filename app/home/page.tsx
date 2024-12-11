"use client";
import React from "react";
import TitleRoom from "../../components/TitleRoom";
import usePaginatedFeatureRooms from "../../hooks/usePaginatedFeaturedRooms";
import usePaginatedPromotionalRooms from "../../hooks/usePaginatedPromotionalRooms";
import CarouselSpacing from "../../components/CarouselSpacingRoomList";
import FeaturedRoomList from "../../components/RoomList";
import LoadMoreButton from "../../components/LoadMoreButton";

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
    <>
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
    </>
  );
};

export default HomePage;
