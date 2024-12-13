// hooks/useRoomDetail.ts

import { fetchExpById } from "@/service/ExperienceService";
import useSWR from "swr";

const fetcher = (id: string) => fetchExpById(id).then((res) => res.data);


export const useExperienceDetail = (id: string | null) => {
  const { data, error } = useSWR(id ? (id as string) : null, fetcher);

  return {
    newData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

