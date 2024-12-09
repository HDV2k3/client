'use client';
import FeaturedRoomList from '@/components/RoomList';
import TitleRoom from '@/components/TitleRoom';

type Props = {
    data: any;

}

export default function MainCanHoPage({ data }: Props) {
    return (
        <div className='mt-[20px] mb-[20px]'>
            <TitleRoom title="Danh sách căn hộ" />
            <FeaturedRoomList
                rooms={data}
                isLoadingMore={false}
                PAGE_SIZE={8}
            />
        </div>
    )
}