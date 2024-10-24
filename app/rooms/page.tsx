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

// Define types
interface FilterCriteria {
  minPrice?: number;
  maxPrice?: number;
  district?: string;
  type?: string;
  hasPromotion?: boolean;
  sortByPrice?: string;
  sortByCreated?: string;
}

const PAGE_SIZE = 8; // Adjust as necessary

const RoomsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria | undefined>(undefined); // Store filters
  const [isFiltered, setIsFiltered] = useState<boolean>(false); // Mark that filters are applied

  // Key function for pagination
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

    return `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/post-filter?${params.toString()}`;
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

  const rooms = data ? data.flatMap((page) => page.data) : []; // Flatten the room data from all pages
  const totalPages = data ? data[0]?.totalPages : 1;
  const currentPage = size;
  const isReachingEnd = currentPage >= totalPages;

  if (error) return <div>Error loading rooms: {error.message}</div>;

  // Apply filter function to pass to the FilterComponent
  const applyFilters = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
    setIsFiltered(true); // Mark that filters are applied
    setSize(1); // Reset to the first page of results
  };

  return (
    <div className="px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl mx-auto">
      <div>
        <Courasel />
        <Stats />
        <div className="sm:mb-8 mt-5">
          <TitleRoom title="Tất cả các phòng tại Next Room" />

          {/* FilterComponent */}
          <FilterComponent applyFilters={applyFilters} />

          {/* Show FeaturedRoomList with all rooms based on filters */}
          <FeaturedRoomList
            rooms={rooms}
            isLoadingMore={!data && !error}
            PAGE_SIZE={PAGE_SIZE}
          />

          {/* Load More Button */}
          <LoadMoreButton
            isLoadingInitialData={!data && !error}
            isReachingEnd={isReachingEnd}
            loadMore={() => setSize(size + 1)}
            reset={() => setFilters(undefined)} // Reset filters
            roomsLength={rooms.length}
            isLoadingMore={!data && !error}
          />
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
