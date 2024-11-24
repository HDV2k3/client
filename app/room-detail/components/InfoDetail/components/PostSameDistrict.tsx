import React from "react";
import RoomCardProminent from "../../../../../components/RoomCard";
import { SkeletonCard } from "../../../../../components/SkeletonCard";
import Link from "next/link";

interface RoomListProps {
  rooms: Room[];
  isLoadingMore: boolean;
  PAGE_SIZE: number;
}

const SameDistrictRoomList: React.FC<RoomListProps> = ({
  rooms,
  isLoadingMore,
  PAGE_SIZE,
}) => {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {rooms.map((room) => {
        const imageUrls = room.roomInfo.postImages.map(
          (img: { urlImagePost: string }) =>
            img.urlImagePost || "/default-image.jpg"
        );
        return (
          <Link key={room.id} href={`/room-detail/${room.id}`}>
            <RoomCardProminent
              id={room.id}
              name={room.roomInfo.name}
              price={room.pricingDetails.basePrice}
              fixPrice={room.fixPrice}
              imageUrls={imageUrls}
              totalArea={room.roomInfo.totalArea}
              address={room.roomInfo.address}
              createdDate={new Date(room.createdDate * 1000).toLocaleString()}
              description={room.description}
              status={room.status}
              type={room.roomInfo.type}
              capacity={room.roomInfo.capacity}
              createdBy={room.createdBy}
              contactInfo={room.contactInfo}
            />
          </Link>
        );
      })}
      {isLoadingMore &&
        Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
    </div>
  );
};

export default SameDistrictRoomList;
