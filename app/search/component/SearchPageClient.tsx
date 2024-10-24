import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FeaturedRoomList from "../../../components/RoomList";
import LoadMoreButton from "../../../components/LoadMoreButton";
import useSearchResults from "../../../hooks/useSearchResults";
// Spinner component for loading effect
const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const PAGE_SIZE = 8;
  const {
    rooms,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
  } = useSearchResults(keyword);

  const loadMore = () => setSize(size + 1);
  const reset = () => setSize(1);

  // Handle error
  if (error) {
    return (
      <div className="error-message">
        <p>Failed to load search results. Please try again later.</p>
      </div>
    );
  }

  // Handle initial loading
  if (isLoadingInitialData) {
    return (
      <div className="loading-message">
        <Spinner />
        <p>Loading search results...</p>
      </div>
    );
  }

  // Handle no results found
  if (!rooms || rooms.length === 0) {
    return (
      <div className="no-results">
        <p>No results found for &quot;{keyword}&quot;.</p>
        <p>Please try searching with different keywords.</p>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Search Results for &quot;{keyword}&quot;
        </h1>
        <FeaturedRoomList
          rooms={rooms}
          isLoadingMore={isLoadingMore ?? false}
          PAGE_SIZE={PAGE_SIZE}
        />
        <LoadMoreButton
          isLoadingInitialData={isLoadingInitialData}
          isReachingEnd={isReachingEnd ?? false}
          loadMore={loadMore}
          reset={reset}
          roomsLength={rooms.length}
          isLoadingMore={isLoadingMore ?? false}
        />
      </div>
    </div>
  );
}
