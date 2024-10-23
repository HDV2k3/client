import { useState, useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import {
  fetchPostsFeaturedByPage,
  fetchPostsPromotionalByPage,
} from "../service/Marketing";

const PAGE_SIZE = 10;

const usePaginatedPromotionalRooms = () => {
  const [totalElements, setTotalElements] = useState<number | null>(null);
  const getKey = (pageIndex: number, previousPageData: ApiResponse | null) => {
    if (previousPageData && !previousPageData.data.data.length) return null; // reached the end
    return `/marketing/post/list-post-promotional?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
  };

  const fetcher = async (url: string) => {
    const [, params] = url.split("?");
    const urlParams = new URLSearchParams(params);
    const page = Number(urlParams.get("page"));
    const pageSize = Number(urlParams.get("pageSize"));

    const response: ApiResponse = await fetchPostsPromotionalByPage(
      page,
      pageSize
    );
    if (totalElements === null) {
      setTotalElements(response.data.totalElements);
    }
    return response;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    persistSize: true,
  });

  const rooms = useMemo(() => {
    return data ? data.flatMap((page) => page.data.data) : [];
  }, [data]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.data.length < PAGE_SIZE);

  const loadMore = useCallback(() => {
    if (!isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [isReachingEnd, isLoadingMore, setSize, size]);

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

export default usePaginatedPromotionalRooms;
