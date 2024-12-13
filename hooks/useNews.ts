// hooks/useRoomDetail.ts

import { fetchNewById } from "@/service/NewsService";
import useSWR from "swr";

const fetcher = (id: string) => fetchNewById(id).then((res) => res.data);


export const useNewsDetail = (id: string | null) => {
  const { data, error } = useSWR(id ? (id as string) : null, fetcher);

  return {
    newData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

