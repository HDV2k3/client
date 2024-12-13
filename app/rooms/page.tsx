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
  let searchParam = '';
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
      page,
      size,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== "NaN")
    );
    searchParam = queryString.stringify(filteredParams);
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-filter?${searchParam}`;
    const res = await fetch(url);
    const response = await res.json();
    data = response?.data?.data;
    console.log('data: ', response);
    typeGet = 1;
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
          <MainRoomList data={data} page={page} size={size} type={typeGet} searchParam={searchParam} />
        </>
        : <NotFoundData />
      }
    </>
  )
}