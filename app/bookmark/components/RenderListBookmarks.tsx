'use client';
import { fetchFavoritePost } from "@/service/FavoriteService";
import { useEffect, useState } from "react";

export default function RenderListBookmarks() {
    const [dataRooms, setDataRooms] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const size = 5;
    const [hasMore, setHasMore] = useState<boolean>(true); // Tracks if there are more pages to fetch
    const [isLoading, setIsLoading] = useState<boolean>(false); // Tracks loading state

    // const fetchDataBookmark = async (page: number) => {
    //     setIsLoading(true);
    //     try {
    //         const data = await fetchFavoritePost(page, size);
    //         const { currentPage, pageSize, totalElements, totalPages, data: dataBookmarks } = data?.data;
    //         setDataRooms((prev: any) => [...prev, ...dataBookmarks]);
    //         setHasMore(page < totalPages); // Determine if more pages are available
    //     } catch (error) {
    //         console.error("Error fetching bookmarks:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    // useEffect(() => {
    //     fetchDataBookmark(page);
    // }, [page])

    return (
        <div>
            {dataRooms.length > 0 ? (
                <div>
                    {dataRooms.map((item: any, index: number) => {
                        console.log('check item: ', item);
                        return (
                            <>

                            </>
                        )
                    })}
                </div>
            ) : (
                <p>No data</p>
            )}
        </div>
    );
}
