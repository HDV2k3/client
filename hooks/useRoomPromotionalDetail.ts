// hooks/useRoomPromotionalDetail.ts
import useSWR from "swr";
import { fetchPostPromotionalById, fetchPostsById } from "@/service/Marketing";

const fetcher = (id: string) =>
  fetchPostPromotionalById(id).then((res) => res.data);

export const useRoomPromotionalDetail = (id: string | null) => {
  const { data, error } = useSWR(id ? (id as string) : null, fetcher);

  return {
    roomData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
