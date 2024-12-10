'use client';
import { useState } from 'react';
import FeaturedRoomList from '@/components/RoomList';
import { Button, message } from "antd";
import { fetchPostByTypeRoomAndPage } from '@/service/Marketing'
import ButtonBack from './Button/ButtonBack';

type Props = {
    data: any;
    type: number;
    page: number;
    limit: number;
    title: string;
}

export default function MainRenderItemsPostByType({ data, type, page, limit, title }: Props) {
    const [dataPost, setDataPost] = useState<any>(data);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [isPage, setIsPage] = useState<number>(page);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const handleLoadMore = async () => {
        try {
            setIsLoadingMore(true);
            const newPage = isPage + 1;
            const data = await fetchPostByTypeRoomAndPage(type, newPage, limit);
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
        <>
            {dataPost?.length > 0 ?
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
                : <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-md shadow-md p-6">
                    <p className="text-gray-700 text-lg text-center mb-4">
                        Xin lỗi, hiện tại chưa có bài viết về <span className="font-semibold">{title.toLowerCase()}</span> mà bạn cần tìm.
                    </p>
                    <div className='flex justify-center items-center'>
                        <ButtonBack /> Quay lại
                    </div>
                </div>
            }
        </>
    )
}