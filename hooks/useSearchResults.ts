import useSWRInfinite from "swr/infinite";
import axios from "axios";

const PAGE_SIZE = 8;

// Custom hook for fetching search results
const useSearchResults = (keyword: string) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data.data.length) return null;
    return `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/search/${keyword}?page=${pageIndex + 1}&size=${PAGE_SIZE}`;
  };

  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    persistSize: true,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.data.length < PAGE_SIZE);

  const rooms = data ? data.flatMap((page) => page.data.data) : [];

  return {
    rooms,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
  };
};

export default useSearchResults;
