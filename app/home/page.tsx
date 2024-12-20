// "use client";
// import React, { useEffect, useState } from "react";
// import TitleRoom from "../../components/TitleRoom";
// import {
//   fetchPostsFeaturedByPage,
//   fetchPostsPromotionalByPage,
// } from "@/service/Marketing";
// import MainRoomList from "./component/MainRoomList";
// import MainPromotions from "./component/MainRoomListPromotion";

// const HomePage = () => {
//   const [dataRooms, setDataRooms] = useState([]); // Khởi tạo state với mảng rỗng
//   const [dataRoomsPromotions, setDataRoomsPromotions] = useState([]); // Khởi tạo state với mảng rỗng
//   const page = 1;
//   const size = 8;

//   // Fetch featured rooms every 2 seconds
//   useEffect(() => {
//     // Initial fetch
//     fetchFeaturedRooms();
//     fetchPromotionalRooms();

//     // Set up interval for featured rooms
//     const intervalId = setInterval(() => {
//       fetchFeaturedRooms();
//     }, 2000); // 2000ms = 2 seconds

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []); // Empty dependency array means this runs once on mount

//   const fetchFeaturedRooms = async () => {
//     try {
//       const response = await fetchPostsFeaturedByPage(page, size);
//       setDataRooms(response?.data?.data || []); // Đảm bảo gán giá trị mặc định là mảng rỗng
//     } catch (error) {
//       console.error("Error fetching featured rooms:", error);
//       setDataRooms([]); // Gán giá trị mặc định nếu có lỗi
//     }
//   };

//   const fetchPromotionalRooms = async () => {
//     try {
//       const response = await fetchPostsPromotionalByPage(page, size);
//       setDataRoomsPromotions(response?.data?.data || []); // Đảm bảo gán giá trị mặc định là mảng rỗng
//     } catch (error) {
//       console.error("Error fetching promotional rooms:", error);
//       setDataRoomsPromotions([]); // Gán giá trị mặc định nếu có lỗi
//     }
//   };

//   return (
//     <>
//       <div className="mb-6 sm:mb-8">
//         <TitleRoom title="Phòng trọ nổi bật" />
//         {dataRooms.length > 0 ? ( // Kiểm tra dữ liệu trước khi render
//           <MainRoomList data={dataRooms} page={page} size={size} />
//         ) : (
//           <div>Loading featured rooms...</div> // Hiển thị thông báo khi chưa có dữ liệu
//         )}
//       </div>

//       <div className="mb-6 sm:mb-8">
//         <TitleRoom title="Phòng ưu đãi" />
//         {dataRoomsPromotions.length > 0 ? ( // Kiểm tra dữ liệu trước khi render
//           <MainPromotions data={dataRoomsPromotions} page={page} size={size} />
//         ) : (
//           <div>Loading promotional rooms...</div> // Hiển thị thông báo khi chưa có dữ liệu
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;
// import React from "react";
// import TitleRoom from "../../components/TitleRoom";
// import MainRoomList from "./component/MainRoomList";
// import MainPromotions from "./component/MainRoomListPromotion";

// const HomePage = ({
//   featuredRooms,
//   promotionalRooms,
// }: {
//   featuredRooms: any[];
//   promotionalRooms: any[];
// }) => {
//   const page = 1;
//   const size = 8;

//   return (
//     <>
//       <div className="mb-6 sm:mb-8">
//         <TitleRoom title="Phòng trọ nổi bật" />
//         {featuredRooms.length > 0 ? (
//           <MainRoomList data={featuredRooms} page={page} size={size} />
//         ) : (
//           <div>Loading featured rooms...</div>
//         )}
//       </div>

//       <div className="mb-6 sm:mb-8">
//         <TitleRoom title="Phòng ưu đãi" />
//         {promotionalRooms.length > 0 ? (
//           <MainPromotions data={promotionalRooms} page={page} size={size} />
//         ) : (
//           <div>Loading promotional rooms...</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;

// export async function getServerSideProps() {
//   const page = 1;
//   const size = 8;

//   try {
//     const [featuredResponse, promotionalResponse] = await Promise.all([
//       fetch(
//         `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/list-post-featured?page=${page}&size=${size}`,
//         {
//           headers: {
//             "Cache-Control": "no-cache",
//           },
//         }
//       ),
//       fetch(
//         `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/list-post-promotional?page=${page}&size=${size}`,
//         {
//           headers: {
//             "Cache-Control": "no-cache",
//           },
//         }
//       ),
//     ]);

//     const [featuredData, promotionalData] = await Promise.all([
//       featuredResponse.json(),
//       promotionalResponse.json(),
//     ]);

//     return {
//       props: {
//         featuredRooms: featuredData?.data?.data || [],
//         promotionalRooms: promotionalData?.data?.data || [],
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     return {
//       props: {
//         featuredRooms: [],
//         promotionalRooms: [],
//       },
//     };
//   }
// }
import React from "react";
import TitleRoom from "../../components/TitleRoom";
import MainRoomList from "./component/MainRoomList";
import MainPromotions from "./component/MainRoomListPromotion";

export default async function HomePage() {
  const page = 1;
  const size = 8;

  // Fetch data directly in the server-side component
  try {
    const [featuredResponse, promotionalResponse] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/list-post-featured?page=${page}&size=${size}`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/list-post-promotional?page=${page}&size=${size}`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      ),
    ]);

    const [featuredData, promotionalData] = await Promise.all([
      featuredResponse.json(),
      promotionalResponse.json(),
    ]);

    return (
      <>
        <div className="mb-6 sm:mb-8">
          <TitleRoom title="Phòng trọ nổi bật" />
          {featuredData?.data?.data?.length > 0 ? (
            <MainRoomList data={featuredData.data.data} page={page} size={size} />
          ) : (
            <div>Loading featured rooms...</div>
          )}
        </div>

        <div className="mb-6 sm:mb-8">
          <TitleRoom title="Phòng ưu đãi" />
          {promotionalData?.data?.data?.length > 0 ? (
            <MainPromotions data={promotionalData.data.data} page={page} size={size} />
          ) : (
            <div>Loading promotional rooms...</div>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return (
      <div>
        <TitleRoom title="Phòng trọ nổi bật" />
        <div>Loading featured rooms...</div>

        <TitleRoom title="Phòng ưu đãi" />
        <div>Loading promotional rooms...</div>
      </div>
    );
  }
}
