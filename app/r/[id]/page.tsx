// "use client";
// import "antd/dist/reset.css";
// import { useParams, useSearchParams } from "next/navigation";
// import { useRoomDetail } from "../../../hooks/useRoomDetail";
// import { useRoomPromotionalDetail } from "../../../hooks/useRoomPromotionalDetail";
// import SquareAndRectanglesImageDetail from "../components/ImageDetail/SquareAndRectanglesImageDetail";
// import MapDetail from "../components/map-detail/map-detail";
// import InfoDetail from "../components/InfoDetail/InfoDetail";
// import usePostsSamePriceRooms from "../../../hooks/usePostsSamePrice";
// import SamePriceRoomList from "../components/InfoDetail/components/PostsSamePrice";
// import TitleRoom from "../../../components/TitleRoom";
// import usePostsSameDistrictRooms from "../../../hooks/usePostSameDistrict";
// import SameDistrictRoomList from "../components/InfoDetail/components/PostSameDistrict";
// import { useMemo } from "react";
// import "../styles/info-detail-wrapper.css";
// import { getIdBySlug } from "@/utils/converStringToSlug";
// // Loading and Error States
// function Loading() {
//   return <div className="text-center py-10">Loading...</div>;
// }

// function ErrorMessage({ message }: { readonly message: string }) {
//   return <div className="text-center py-10">{message}</div>;
// }

// // Room Detail Content Component
// function RoomDetailContent({ roomData }: { readonly roomData: any }) {
//   const basePrice = roomData?.pricingDetails?.basePrice ?? 0;
//   const address = roomData?.roomInfo?.address ?? "";

//   const { rooms: postsSamePrice } = usePostsSamePriceRooms(basePrice);
//   const { rooms: sameDistrictRooms } = usePostsSameDistrictRooms(address);

//   const samePriceRoomList = useMemo(
//     () => (
//       <SamePriceRoomList
//         rooms={postsSamePrice}
//         isLoadingMore={false}
//         PAGE_SIZE={4}
//       />
//     ),
//     [postsSamePrice]
//   );

//   const sameDistrictRoomList = useMemo(
//     () => (
//       <SameDistrictRoomList
//         rooms={sameDistrictRooms}
//         isLoadingMore={false}
//         PAGE_SIZE={4}
//       />
//     ),
//     [sameDistrictRooms]
//   );

//   return (
//     <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-[20px]">
//       <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8">
//         <div className="w-full md:w-1/2 lg:w-2/3 mb-2">
//           <SquareAndRectanglesImageDetail room={roomData} />
//         </div>
//         <div className="w-full md:w-1/2 lg:w-1/3 mb-6 info-detail-wrapper">
//           <InfoDetail room={roomData} />
//         </div>
//       </div>
//       <div className="w-full mb-6">
//         <TitleRoom title="Phòng cùng quận" />
//         {sameDistrictRoomList}
//       </div>
//       <div className="w-full mb-6">
//         <TitleRoom title="Phòng cùng tầm giá" />
//         {samePriceRoomList}
//       </div>

//       <div className="w-full mb-6">
//         <MapDetail room={roomData} />
//       </div>
//     </div>
//   );
// }

// // Detail Fetching Components
// function RegularRoomDetail({ id }: { readonly id: string }) {
//   const { roomData, isLoading, isError } = useRoomDetail(id);
//   if (isLoading) return <Loading />;
//   if (isError) return <ErrorMessage message="Error loading room details" />;
//   if (!roomData) return <ErrorMessage message="Room details not available" />;

//   return <RoomDetailContent roomData={roomData} />;
// }

// function PromotionalRoomDetail({ id }: { readonly id: string }) {
//   const { roomData, isLoading, isError } = useRoomPromotionalDetail(id);

//   if (isLoading) return <Loading />;
//   if (isError)
//     return <ErrorMessage message="Error loading promotional room details" />;
//   if (!roomData)
//     return <ErrorMessage message="Promotional room details not available" />;

//   return <RoomDetailContent roomData={roomData} />;
// }

// // Main Component
// function RoomDetail() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const id = getIdBySlug(params?.id as string);
//   const roomType = searchParams?.get("type");

//   if (!id) return <ErrorMessage message="Invalid room ID" />;

//   return roomType === "promotional" ? (
//     <PromotionalRoomDetail id={id} />
//   ) : (
//     <RegularRoomDetail id={id} />
//   );
// }

// export default RoomDetail;
"use client";
import "antd/dist/reset.css";
import { useParams, useSearchParams } from "next/navigation";
import { useRoomDetail } from "../../../hooks/useRoomDetail";
import { useRoomPromotionalDetail } from "../../../hooks/useRoomPromotionalDetail";
import SquareAndRectanglesImageDetail from "../components/ImageDetail/SquareAndRectanglesImageDetail";
import MapDetail from "../components/map-detail/map-detail";
import InfoDetail from "../components/InfoDetail/InfoDetail";
import usePostsSamePriceRooms from "../../../hooks/usePostsSamePrice";
import SamePriceRoomList from "../components/InfoDetail/components/PostsSamePrice";
import TitleRoom from "../../../components/TitleRoom";
import usePostsSameDistrictRooms from "../../../hooks/usePostSameDistrict";
import SameDistrictRoomList from "../components/InfoDetail/components/PostSameDistrict";
import { useMemo } from "react";
import "../styles/info-detail-wrapper.css";
import { getIdBySlug } from "@/utils/converStringToSlug";

// Loading Component with responsive spacing
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
      <div className="text-center py-6 sm:py-10">Loading...</div>
    </div>
  );
}

// Error Message Component with responsive design
function ErrorMessage({ message }: { readonly message: string }) {
  return (
    <div className="flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
      <div className="text-center py-6 sm:py-10 px-4 max-w-md mx-auto">
        <p className="text-base sm:text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
}

// Room Detail Content Component with improved responsive layout
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Image Gallery Section */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <SquareAndRectanglesImageDetail room={roomData} />
          </div>
        </div>

        {/* Room Info Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 info-detail-wrapper sticky top-4">
            <InfoDetail room={roomData} />
          </div>
        </div>
      </div>

      {/* Similar Rooms Sections */}
      <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
        {/* Same District Rooms */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="mb-4">
            <TitleRoom title="Phòng cùng quận" />
          </div>
          <div className="overflow-x-auto">{sameDistrictRoomList}</div>
        </section>

        {/* Same Price Rooms */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="mb-4">
            <TitleRoom title="Phòng cùng tầm giá" />
          </div>
          <div className="overflow-x-auto">{samePriceRoomList}</div>
        </section>
      </div>

      {/* Map Section */}
      <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="aspect-video w-full">
          <MapDetail room={roomData} />
        </div>
      </section>
    </div>
  );
}

// Detail Fetching Components with improved error handling
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

// Main Component with better error handling
function RoomDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = getIdBySlug(params?.id as string);
  const roomType = searchParams?.get("type");

  if (!id) return <ErrorMessage message="Invalid room ID" />;

  return (
    <main className="min-h-screen bg-gray-50">
      {roomType === "promotional" ? (
        <PromotionalRoomDetail id={id} />
      ) : (
        <RegularRoomDetail id={id} />
      )}
    </main>
  );
}

export default RoomDetail;
