"use client";
import "antd/dist/reset.css";
import { useParams, useSearchParams } from "next/navigation";
import { useRoomDetail } from "@/hooks/useRoomDetail";
import { useRoomPromotionalDetail } from "@/hooks/useRoomPromotionalDetail";
import SquareAndRectanglesImageDetail from "../components/ImageDetail/SquareAndRectanglesImageDetail";
import MapDetail from "@/app/room-detail/components/map-detail/map-detail";
import InfoDetail from "../components/InfoDetail/InfoDetail";
import usePostsSamePriceRooms from "@/hooks/usePostsSamePrice";
import SamePriceRoomList from "../components/InfoDetail/components/PostsSamePrice";
import TitleRoom from "@/components/TitleRoom";
import usePostsSameDistrictRooms from "@/hooks/usePostSameDistrict";
import SameDistrictRoomList from "../components/InfoDetail/components/PostSameDistrict";
import { useMemo } from "react";
import "../styles/info-detail-wrapper.css";
// Loading and Error States
function Loading() {
  return <div className="text-center py-10">Loading...</div>;
}

function ErrorMessage({ message }: { readonly message: string }) {
  return <div className="text-center py-10">{message}</div>;
}

// Room Detail Content Component
function RoomDetailContent({ roomData }: { readonly roomData: any }) {
  const basePrice = roomData?.pricingDetails?.basePrice ?? 0;
  const address = roomData?.roomInfo?.address ?? "";

  const { rooms: postsSamePrice } = usePostsSamePriceRooms(basePrice);
  const { rooms: sameDistrictRooms } = usePostsSameDistrictRooms(address);

  const samePriceRoomList = useMemo(
    () => (
      <SamePriceRoomList
        rooms={postsSamePrice}
        isLoadingMore={false}
        PAGE_SIZE={4}
      />
    ),
    [postsSamePrice]
  );

  const sameDistrictRoomList = useMemo(
    () => (
      <SameDistrictRoomList
        rooms={sameDistrictRooms}
        isLoadingMore={false}
        PAGE_SIZE={4}
      />
    ),
    [sameDistrictRooms]
  );

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8">
        <div className="w-full md:w-1/2 lg:w-2/3 mb-2">
          <SquareAndRectanglesImageDetail room={roomData} />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-6 info-detail-wrapper">
          <InfoDetail room={roomData} />
        </div>
      </div>
      <div className="w-full mb-6">
        <TitleRoom title="Phòng cùng quận" />
        {sameDistrictRoomList}
      </div>
      <div className="w-full mb-6">
        <TitleRoom title="Phòng cùng tầm giá" />
        {samePriceRoomList}
      </div>

      <div className="w-full mb-6">
        <MapDetail room={roomData} />
      </div>
    </div>
  );
}

// Detail Fetching Components
function RegularRoomDetail({ id }: { readonly id: string }) {
  const { roomData, isLoading, isError } = useRoomDetail(id);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message="Error loading room details" />;
  if (!roomData) return <ErrorMessage message="Room details not available" />;

  return <RoomDetailContent roomData={roomData} />;
}

function PromotionalRoomDetail({ id }: { readonly id: string }) {
  const { roomData, isLoading, isError } = useRoomPromotionalDetail(id);

  if (isLoading) return <Loading />;
  if (isError)
    return <ErrorMessage message="Error loading promotional room details" />;
  if (!roomData)
    return <ErrorMessage message="Promotional room details not available" />;

  return <RoomDetailContent roomData={roomData} />;
}

// Main Component
function RoomDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string | undefined;
  const roomType = searchParams?.get("type");

  if (!id) return <ErrorMessage message="Invalid room ID" />;

  return roomType === "promotional" ? (
    <PromotionalRoomDetail id={id} />
  ) : (
    <RegularRoomDetail id={id} />
  );
}

export default RoomDetail;
