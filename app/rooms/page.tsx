// import { SearchParams } from "./type";
// import queryString from "query-string";
// import { fetchPostsAllByPage } from "@/service/Marketing";
// import MainRoomList from "./component/MainRoomsList";
// import TitleRoom from "@/components/TitleRoom";
// import NotFoundData from "./component/NotFoundData";

// export default async function RoomsPage({ searchParams }: SearchParams) {
//   const minPrice = Number(searchParams["minPrice"] || -1);
//   const maxPrice = Number(searchParams["maxPrice"] || -1);
//   const district = Number(searchParams["district"] || -1);
//   const commune = Number(searchParams["commune"] || -1);
//   const type = Number(searchParams["type"] || -1);
//   const hasPromotion = searchParams["hasPromotion"];
//   const sortByPrice = searchParams["sortByPrice"];
//   const sortByCreated = searchParams["minPrice"];

//   const page = 1;
//   const size = 8;
//   let data = [];
//   let typeGet = 0; // 0: all, 1: fillter
//   let searchParam = "";

//   if (
//     minPrice ||
//     maxPrice ||
//     district ||
//     commune ||
//     type ||
//     hasPromotion ||
//     sortByCreated ||
//     sortByPrice
//   ) {
//     const queryParams = {
//       district: district !== -1 ? district : undefined,
//       commune: commune !== -1 ? commune : undefined,
//       type: type !== -1 ? type : undefined,
//       minPrice: minPrice !== -1 ? minPrice : undefined,
//       maxPrice: maxPrice !== -1 ? maxPrice : undefined,
//       hasPromotion: hasPromotion ? true : undefined,
//       sortByPrice,
//       sortByCreated,
//     };
//     const filteredParams = Object.fromEntries(
//       Object.entries(queryParams).filter(([_, value]) => value !== "NaN")
//     );
//     searchParam = queryString.stringify(filteredParams);
//     const query = `${searchParam}&page=${page}&size=${size}`;
//     const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-filter?${query}`;
//     const res = await fetch(url);
//     const response = await res.json();
//     data = response?.data?.data;
//     typeGet = 1;
//   } else {
//     const res = await fetchPostsAllByPage(page, size);
//     data = res?.data?.data;
//   }

//   return (
//     <>
//       {data.length > 0 ? (
//         <>
//           <TitleRoom title="Phòng Nổi Bậc Tại Next Life" />
//           <MainRoomList
//             data={data}
//             page={page}
//             size={size}
//             type={typeGet}
//             searchParam={searchParam}
//           />
//         </>
//       ) : (
//         <NotFoundData />
//       )}
//     </>
//   );
// }
import { SearchParams } from "./type";
import queryString from "query-string";
import { fetchPostsAllByPage } from "@/service/Marketing";
import MainRoomList from "./component/MainRoomsList";
import TitleRoom from "@/components/TitleRoom";
import NotFoundData from "./component/NotFoundData";

async function fetchWithTimeout(url: string, timeout = 5000) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: { data: [] } }; // Return empty data on error
  }
}

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
  let typeGet = 0; // 0: all, 1: filter
  let searchParam = "";

  try {
    if (
      minPrice !== -1 ||
      maxPrice !== -1 ||
      district !== -1 ||
      commune !== -1 ||
      type !== -1 ||
      hasPromotion ||
      sortByCreated ||
      sortByPrice
    ) {
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

      // Remove any NaN values
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          ([_, value]) =>
            value !== undefined && value !== "NaN" && !isNaN(value as number)
        )
      );

      searchParam = queryString.stringify(filteredParams);
      const query = `${searchParam}&page=${page}&size=${size}`;
      const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-filter?${query}`;

      const response = await fetchWithTimeout(url);
      data = response?.data?.data || [];
      typeGet = 1;
    } else {
      try {
        const res = await fetchPostsAllByPage(page, size);
        data = res?.data?.data || [];
      } catch (error) {
        console.error("Error fetching all posts:", error);
        data = [];
      }
    }
  } catch (error) {
    console.error("Error in RoomsPage:", error);
    data = [];
  }

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <TitleRoom title="Phòng Nổi Bậc Tại Next Life" />
          <MainRoomList
            data={data}
            page={page}
            size={size}
            type={typeGet}
            searchParam={searchParam}
          />
        </>
      ) : (
        <NotFoundData />
      )}
    </>
  );
}
