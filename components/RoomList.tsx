import React from "react";
import RoomCardProminent from "../components/RoomCard";
import { SkeletonCard } from "../components/SkeletonCard";
interface FeaturedRoomListProps {
  rooms: Room[];
  isLoadingMore: boolean;
  PAGE_SIZE: number;
}
const FeaturedRoomList: React.FC<FeaturedRoomListProps> = ({
  rooms,
  isLoadingMore,
  PAGE_SIZE,
}) => {
  console.log('check data rooms: ', rooms);
  return (
    <div className="featured-room-list mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {rooms.map((room) => {
        const imageUrls = room.roomInfo.postImages.map(
          (img: { urlImagePost: string }) =>
            img.urlImagePost || "/default-image.jpg"
        );
        return (
          <RoomCardProminent
            key={room.id}
            id={room.id}
            name={room.roomInfo.name}
            price={room.pricingDetails.basePrice}
            fixPrice={room.fixPrice}
            imageUrls={imageUrls}
            address={room.roomInfo.address}
            type={room.roomInfo.type}
            capacity={room.roomInfo.capacity}
            totalArea={0}
            createdDate={""}
            description={""}
            status={""}
            createdBy={room.createdBy}
            contactInfo={room.contactInfo}
            title={room?.title}
          />
        );
      })}
      {/* Hiển thị Skeleton khi đang tải thêm */}
      {isLoadingMore &&
        Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
    </div>
  );
};

export default FeaturedRoomList;
