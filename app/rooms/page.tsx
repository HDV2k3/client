// "use client";
// import React, { useState } from "react";
// import FeaturedRoomList from "../../components/RoomList";
// import LoadMoreButton from "../../components/LoadMoreButton";
// import TitleRoom from "../../components/TitleRoom";
// import Stats from "./component/Stats";
// import Courasel from "../../app/home/component/Courasel";
// import PromotionSection from "./component/PromotionSection";
// import RealEstateExperience from "./component/RealEstateExperience";
// import axios from "axios";
// import useSWRInfinite from "swr/infinite";
// import FilterComponent from "./component/Filter";


// interface FilterCriteria {
//   minPrice?: string;
//   maxPrice?: string;
//   district?: string;
//   type?: string;
//   hasPromotion?: boolean;
//   sortByPrice?: string;
//   sortByCreated?: string;
//   ward?: string;
// }

// const PAGE_SIZE = 8; // Adjust as necessary
// const RoomsPage: React.FC = () => {
//   const [filters, setFilters] = useState<FilterCriteria | undefined>(undefined);
//   const [isFiltered, setIsFiltered] = useState<boolean>(false);
//   const getKey = (pageIndex: number, previousPageData: any) => {
//     if (previousPageData && !previousPageData.data.length) return null;

//     const params = new URLSearchParams();

//     if (filters) {
//       if (filters.minPrice)
//         params.append("minPrice", filters.minPrice.toString());
//       if (filters.maxPrice)
//         params.append("maxPrice", filters.maxPrice.toString());
//       if (filters.district) params.append("district", filters.district);
//       if (filters.ward) params.append("ward", filters.ward);
//       if (filters.type) params.append("type", filters.type);
//       if (filters.hasPromotion)
//         params.append("hasPromotion", filters.hasPromotion.toString());
//       if (filters.sortByPrice)
//         params.append("sortByPrice", filters.sortByPrice);
//       if (filters.sortByCreated)
//         params.append("sortByCreated", filters.sortByCreated);
//     }

//     // Append pagination info
//     params.append("page", (pageIndex + 1).toString());
//     params.append("size", PAGE_SIZE.toString());
//     console.log(params.toString());
//     return `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-filter?${params.toString()}`;
//   };

//   // Fetcher function for SWR
//   const fetcher = async (url: string) => {
//     // console.log('check url: ',)
//     const response = await axios.get(url);
//     console.log("URL", url);
//     if (response.data.responseCode === 101000) {
//       return response.data.data; // Assuming data contains the rooms list and pagination info
//     } else {
//       throw new Error("Failed to fetch rooms");
//     }
//   };

//   const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
//     revalidateFirstPage: false,
//     revalidateAll: false,
//     persistSize: true,
//   });

//   const rooms = data ? data.flatMap((page) => page.data) : [];
//   const totalPages = data ? data[0]?.totalPages : 1;
//   const currentPage = size;
//   const isReachingEnd = currentPage >= totalPages;
//   const isLoadingInitialData = !data && !error;
//   const isLoadingMore =
//     isLoadingInitialData ||
//     (size > 0 && data && typeof data[size - 1] === "undefined");
//   const isEmpty = data?.[0]?.data.length === 0;

//   if (error) return <div>Error loading rooms: {error.message}</div>;

//   const applyFilters = (newFilters: FilterCriteria) => {
//     setFilters(newFilters);
//     setIsFiltered(true);
//     setSize(1);
//   };

//   const resetFilters = () => {
//     setFilters(undefined);
//     setIsFiltered(false);
//     setSize(1);
//   };

//   return (
//     <>
//       <FilterComponent applyFilters={applyFilters} />
//       {/* {isEmpty && isFiltered ? (
//         <div className="text-center py-10">
//           <h3 className="text-lg font-medium text-gray-900">
//             Không tìm thấy kết quả phù hợp
//           </h3>
//           <p className="mt-1 text-sm text-gray-500">
//             Vui lòng thử lại với các tiêu chí khác.
//           </p>
//           <button
//             onClick={resetFilters}
//             className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Đặt lại bộ lọc
//           </button>
//         </div>
//       ) : (
//         <>
//           <FeaturedRoomList
//             rooms={rooms}
//             isLoadingMore={isLoadingMore ?? false}
//             PAGE_SIZE={PAGE_SIZE}
//           />

//           <LoadMoreButton
//             isLoadingInitialData={isLoadingInitialData}
//             isReachingEnd={isReachingEnd}
//             loadMore={() => setSize(size + 1)} // Tải thêm trang tiếp theo
//             reset={resetFilters} // Đặt lại bộ lọc
//             roomsLength={rooms.length} // Tổng số phòng đã tải
//             isLoadingMore={isLoadingMore ?? false} // Trạng thái đang tải thêm
//           />
//         </>
//       )} */}
//     </>
//   );
// };

// export default RoomsPage;



import { SearchParams } from "./type";
import queryString from "query-string";
import { fetchPostsAllByPage } from "@/service/Marketing";
import MainRoomList from "./component/MainRoomsList";
import TitleRoom from "@/components/TitleRoom";
import NotFoundData from "./component/NotFoundData";

export default async function RoomsPage({ searchParams }: SearchParams) {
  const minPrice = Number(searchParams["minPrice"] || -1);
  const maxPrice = Number(searchParams["maxPrice"] || -1);
  const district = Number(searchParams["district"] || -1);
  const commune = Number(searchParams["commune"] || -1);
  const type = Number(searchParams["type"] || -1);
  const hasPromotion = searchParams["hasPromotion"];
  const sortByPrice = searchParams["sortByPrice"];
  const sortByCreated = searchParams["minPrice"];

  const page = 1;
  const size = 8;
  let data = [];
  let typeGet = 0; // 0: all, 1: fillter

  if (minPrice || maxPrice || district || commune || type || hasPromotion || sortByCreated || sortByPrice) {
    const queryParams = {
      district: district !== -1 ? district : undefined,
      commune: commune !== -1 ? commune : undefined,
      type: type !== -1 ? type : undefined,
      minPrice: minPrice !== -1 ? minPrice : undefined,
      maxPrice: maxPrice !== -1 ? maxPrice : undefined,
      hasPromotion: hasPromotion ? true : undefined,
      sortByPrice,
      sortByCreated,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== "NaN")
    );
    const searchParams = queryString.stringify(filteredParams);
    // const query = queryString.stringify({
    //   page: page ?? undefined,
    //   size: size ?? undefined,
    //   minPrice: minPrice ?? undefined,
    //   maxPrice: maxPrice ?? undefined,
    //   district: district ?? undefined,
    //   commune: commune ?? undefined,
    //   type: type ?? undefined,
    //   hasPromotion: hasPromotion ?? undefined,
    //   sortByCreated: sortByCreated ?? undefined,
    //   sortByPrice: sortByPrice ?? undefined
    // })
    console.log('check searchParams: ', searchParams);
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-filter?${searchParams}`;
    const res = await fetch(url);
    const response = await res.json();
    data = response?.data?.data;
    typeGet = 1;
    console.log('check query', response);
  } else {
    const res = await fetchPostsAllByPage(page, size);
    data = res?.data?.data;
    console.log('check no query data:')
  }

  return (
    <>
      {data.length > 0
        ?
        <>
          <TitleRoom title="Phòng bạn tìm kiếm" />
          <MainRoomList data={data} page={page} size={size} type={typeGet} />
        </>
        : <NotFoundData />
      }
    </>
  )
}