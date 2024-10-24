// hooks/useRoomDetail.ts

import useSWR from 'swr';
import { fetchPostsById } from '../service/Marketing';

const fetcher = (id: string) => fetchPostsById(id).then(res => res.data);

export const useRoomDetail = (id: string | null) => {
  const { data, error } = useSWR(id ? id as string : null, fetcher);

  return {
    roomData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
