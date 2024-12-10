import { fetchPostByTypeRoomAndPage } from '@/service/Marketing'
import TitleRoom from '@/components/TitleRoom';
import ButtonBack from '@/components/Button/ButtonBack';
import MainRenderItemsPostByType from '../../../components/MainRenderItemsPostByType';

export async function generateMetadata() {
    const str = 'NextLife: Căn hộ từ cao cấp đến bình dân giá tốt';
    const url = '/phong-tro';
    return {
        title: str,
        description: str,
        openGraph: {
            title: str,
            description: str,
            url: url,
            type: 'article',
        }
    }
}

export default async function CanHoPage() {
    const page = 1;
    const limit = 5;
    const type = 6;
    const title = "Danh sách căn hộ";
    const data = await fetchPostByTypeRoomAndPage(type, page, limit);
    const rooms = data?.data?.data;
    return (
        <div className='mt-[20px]'>
            <div className='flex'>
                <ButtonBack />
                <div className='ml-[10px]'>
                    <TitleRoom title={title} />
                </div>
            </div>
            <MainRenderItemsPostByType data={rooms} type={type} page={page} limit={limit} title={title} />
        </div>
    )
}