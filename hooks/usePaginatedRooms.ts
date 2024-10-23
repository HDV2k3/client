import { useState, useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import {
  fetchPostsAllByPage,
  fetchPostsFeaturedByPage,
} from "../service/Marketing";

const PAGE_SIZE = 8;

const usePaginatedRooms = () => {
  const [totalElements, setTotalElements] = useState<number | null>(null);

  const getKey = (pageIndex: number, previousPageData: ApiResponse | null) => {
    if (previousPageData && !previousPageData.data.data.length) return null; // Reached the end
    return `/marketing/post/all?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
  };

  const fetcher = async (url: string) => {
    const [, params] = url.split("?");
    const urlParams = new URLSearchParams(params);
    const page = Number(urlParams.get("page"));
    const pageSize = Number(urlParams.get("pageSize"));

    // Gọi API và kiểm tra response
    const response: ApiResponse = await fetchPostsAllByPage(page, pageSize);
    console.log("API Response:", response);

    if (totalElements === null) {
      console.log("Total elements from API:", response.data.totalElements);
      setTotalElements(response.data.totalElements);
    }

    return response;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
      persistSize: true,
    }
  );

  // Lấy danh sách phòng từ dữ liệu API đã tải
  const rooms = useMemo(() => {
    return data ? data.flatMap((page) => page.data.data) : [];
  }, [data]);

  // Kiểm tra trạng thái tải
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  // Kiểm tra khi nào không còn dữ liệu để tải thêm dựa trên tổng số phần tử
  const isReachingEnd = totalElements !== null && rooms.length >= totalElements;

  // Hàm tải thêm dữ liệu
  const loadMore = useCallback(() => {
    if (!isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [isReachingEnd, isLoadingMore, setSize, size]);

  // Hàm reset lại dữ liệu
  const reset = useCallback(() => {
    setSize(1);
    setTotalElements(null);
  }, [setSize]);

  return {
    rooms,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    reset,
    error,
  };
};

export default usePaginatedRooms;
