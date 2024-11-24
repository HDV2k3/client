"use client";
import React, { useState } from "react";
import FeaturedRoomList from "../../components/RoomList";
import LoadMoreButton from "../../components/LoadMoreButton";
import TitleRoom from "../../components/TitleRoom";
import Stats from "./component/Stats";
import Courasel from "../../app/home/component/Courasel";
import PromotionSection from "./component/PromotionSection";
import RealEstateExperience from "./component/RealEstateExperience";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import FilterComponent from "./component/Filter";
import { API_MARKETING } from "@/service/constants";

// ... (giữ nguyên các định nghĩa interface và hằng số)
interface FilterCriteria {
  minPrice?: string;
  maxPrice?: string;
  district?: string;
  type?: string;
  hasPromotion?: boolean;
  sortByPrice?: string;
  sortByCreated?: string;
}

const PAGE_SIZE = 8; // Adjust as necessary
const RoomsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria | undefined>(undefined);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data.length) return null;

    const params = new URLSearchParams();

    if (filters) {
      if (filters.minPrice)
        params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice)
        params.append("maxPrice", filters.maxPrice.toString());
      if (filters.district) params.append("district", filters.district);
      if (filters.type) params.append("type", filters.type);
      if (filters.hasPromotion)
        params.append("hasPromotion", filters.hasPromotion.toString());
      if (filters.sortByPrice)
        params.append("sortByPrice", filters.sortByPrice);
      if (filters.sortByCreated)
        params.append("sortByCreated", filters.sortByCreated);
    }

    // Append pagination info
    params.append("page", (pageIndex + 1).toString());
    params.append("size", PAGE_SIZE.toString());

    return `${API_MARKETING}/post/post-filter?${params.toString()}`;
  };

  // Fetcher function for SWR
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    if (response.data.responseCode === 101000) {
      return response.data.data; // Assuming data contains the rooms list and pagination info
    } else {
      throw new Error("Failed to fetch rooms");
    }
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    persistSize: true,
  });

  const rooms = data ? data.flatMap((page) => page.data) : [];
  const totalPages = data ? data[0]?.totalPages : 1;
  const currentPage = size;
  const isReachingEnd = currentPage >= totalPages;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data.length === 0;

  if (error) return <div>Error loading rooms: {error.message}</div>;

  const applyFilters = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
    setIsFiltered(true);
    setSize(1);
  };

  const resetFilters = () => {
    setFilters(undefined);
    setIsFiltered(false);
    setSize(1);
  };

  return (
    <div className="px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl mx-auto">
      <div>
        <Courasel />
        <Stats />
        <div className="sm:mb-8 mt-5">
          <TitleRoom title="Tất cả các phòng tại Next Room" />

          <FilterComponent applyFilters={applyFilters} />

          {isEmpty && isFiltered ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium text-gray-900">
                Không tìm thấy kết quả phù hợp
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Vui lòng thử lại với các tiêu chí khác.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <>
              <FeaturedRoomList
                rooms={rooms}
                isLoadingMore={isLoadingMore ?? false}
                PAGE_SIZE={PAGE_SIZE}
              />

              <LoadMoreButton
                isLoadingInitialData={isLoadingInitialData}
                isReachingEnd={isReachingEnd}
                loadMore={() => setSize(size + 1)}
                reset={resetFilters}
                roomsLength={rooms.length}
                isLoadingMore={isLoadingMore ?? false}
              />
            </>
          )}
        </div>

        <PromotionSection />
        <div className="bg-white rounded-lg">
          <RealEstateExperience />
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
