
"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { SkeletonCard } from "./SkeletonCard";
import "../styles/RoomCardProminent.css";
import RoomCardProminent from "./RoomCard"; // Import the RoomCardProminent component

interface CarouselSpacingProps {
  rooms: Room[];
  isLoadingMore: boolean;
  PAGE_SIZE: number;
}

const CarouselSpacing: React.FC<CarouselSpacingProps> = ({
  rooms,
  isLoadingMore,
  PAGE_SIZE,
}) => {
  return (
    <Carousel>
      <CarouselContent>
        {rooms.map((room, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <RoomCardProminent
              id={room.id}
              name={room.roomInfo.name}
              price={room.pricingDetails.basePrice}
              fixPrice={room.fixPrice}
              imageUrls={room.roomInfo.postImages.map((img) => img.urlImagePost) || []}
              address={room.roomInfo.address}
              type={room.roomInfo.type}
              capacity={room.roomInfo.capacity}
              totalArea={0}
              createdDate={""}
              description={""}
              status={""} 
              createdBy={room.createdBy} 
              contactInfo={room.contactInfo}            />
          </CarouselItem>
        ))}

        {/* Skeleton Loader */}
        {isLoadingMore &&
          Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <CarouselItem
              key={`skeleton-${index}`}
              className="md:basis-1/2 lg:basis-1/4"
            >
              <SkeletonCard />
            </CarouselItem>
          ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselSpacing;
