'use client';

import RoomCardProminent from "@/components/RoomCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { fetchPostsFeaturedByPage } from "@/service/Marketing";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "@/hooks/useRouter";
type Props = {
    data: any;
    page: number;
    size: number;
    type: number;
    searchParam: string;
}

export default function MainRoomList({ data, page, size, type, searchParam }: Props) {
    const router = useRouter();
    const [dataRooms, setDataRooms] = useState<any[]>(data);
    const [isPage, setIsPage] = useState<number>(page);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [isReachingEnd, setIsReachingEnd] = useState<boolean>(false);
    const [isEndMore, serIsEndMore] = useState<boolean>(false);

    const handleFetchData = async () => {
        try {
            setIsLoadingMore(true);
            const newPage = isPage + 1;
            const dataResponseRooms = await fetchPostsFeaturedByPage(newPage, size);
            const dataRooms = dataResponseRooms?.data?.data;
            console.log('check dataRooms: ', dataRooms);
            if (dataRooms.length > 0) {
                setDataRooms((prev: any) => [
                    ...prev,
                    ...dataRooms,
                ])
                setIsPage(newPage);
                setIsLoadingMore(false);
            } else {
                setIsReachingEnd(true);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoadingMore(false)
        }
    }
    const handleFetchDataSearch = async () => {
        try {
            setIsLoadingMore(true);
            const newPage = isPage + 1;
            const query = `${searchParam}&page=${newPage}&size=${size}`
            const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-filter?${query}`;
            const res = await fetch(url);
            const response = await res.json();
            const dataRooms = response?.data?.data;
            if (dataRooms.length > 0) {
                setDataRooms((prev: any) => [
                    ...prev,
                    ...dataRooms,
                ])
                setIsPage(newPage);
                setIsLoadingMore(false);
            } else {
                serIsEndMore(true);
                setIsReachingEnd(true);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoadingMore(false)
        }
    }
    useEffect(() => { if (page === 1) { setDataRooms(data); } }, [data, page])

    const loadMore = async () => {
        if (type === 0) await handleFetchData();
        if (type === 1) await handleFetchDataSearch();
    }
    const reset = () => {
        setDataRooms(data.slice(0, 8));
        setIsPage(1);
        setIsReachingEnd(false);
    }
    const handleRefesh = () => {
        serIsEndMore(false);
        router.push('/rooms');
    }
    return (
        <>
            <div className="featured-room-list mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {dataRooms.map((room: any) => {
                    const imageUrls = room.roomInfo.postImages.map(
                        (img: { urlImagePost: string }) =>
                            img.urlImagePost || "/default-image.jpg"
                    );
                    return (
                        <RoomCardProminent
                            roomId={room?.roomId}
                            key={room.id}
                            id={room.id}
                            name={room.roomInfo.name}
                            price={room.pricingDetails.basePrice}
                            fixPrice={room.fixPrice}
                            imageUrls={imageUrls}
                            address={room.roomInfo.address}
                            type={room.roomInfo.type}
                            capacity={room.roomInfo.capacity}
                            totalArea={0}
                            createdDate={""}
                            description={""}
                            status={""}
                            createdBy={room.createdBy}
                            contactInfo={room.contactInfo}
                            title={room?.title}
                        />
                    );
                })}
                {isLoadingMore && Array.from({ length: size }).map((_, index) => (<SkeletonCard key={`skeleton-${index}`} />))}
            </div>

            <div className="text-center mt-4">
                <>
                    {!isReachingEnd && !isEndMore &&
                        <Button onClick={loadMore} disabled={isLoadingMore}>
                            {isLoadingMore ? "Loading..." : "Xem thêm"}
                        </Button>
                    }
                    {isEndMore &&
                        <div className="mb-[20px] flex justify-center items-center bg-white rounded-xl shadow-lg text-center  w-full, h-[50px]" >
                            <span style={{ fontSize: 15, fontWeight: 700, color: 'red' }}>Đã hết bài viết</span>
                            <Button onClick={handleRefesh} style={{ marginLeft: '20px' }}>Làm mới</Button>
                        </div>
                    }
                    {isReachingEnd && !isEndMore && <Button onClick={reset}>Rút gọn</Button>}
                </>
            </div>
        </>
    )
}
