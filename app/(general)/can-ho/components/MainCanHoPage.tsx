'use client';

import { useState } from 'react';
import FeaturedRoomList from '@/components/RoomList';
import { Button, message } from "antd";
import { fetchPostsFeaturedByPage } from '@/service/Marketing'

type Props = {
    data: any;
}

export default function MainCanHoPage({ data }: Props) {
    const [dataPost, setDataPost] = useState<any>(data);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [isPage, setIsPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const handleLoadMore = async () => {
        try {
            setIsLoadingMore(true);
            const newPage = isPage + 1;
            const data = await fetchPostsFeaturedByPage(newPage, 5);
            const rooms = data?.data?.data;
            if (rooms && rooms.length > 0) {
                setDataPost((prevData: any) => [...prevData, ...rooms]);
                setIsPage(newPage);
            } else {
                setHasMore(false);
            }
        } catch (e) {
            console.error('Error loading data:', e);
            message.error('Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setIsLoadingMore(false);
        }
    }

    return (
        <div className='mt-[20px] mb-[20px]'>
            <FeaturedRoomList rooms={dataPost} isLoadingMore={false} PAGE_SIZE={8} />
            <div className='flex justify-center'>
                {hasMore && (
                    <Button onClick={handleLoadMore} disabled={isLoadingMore} loading={isLoadingMore} className="mt-4" type="primary" >
                        {isLoadingMore ? "Đang tải..." : "Xem thêm"}
                    </Button>
                )}
            </div>

            {!hasMore && <p className="text-center text-gray-500 mt-4"> Không còn dữ liệu để hiển thị. </p>}
        </div>
    )
}