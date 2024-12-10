import { fetchPostsFeaturedByPage } from '@/service/Marketing'
import MainCanHoPage from './components/MainCanHoPage'
import TitleRoom from '@/components/TitleRoom';

export async function generateMetadata() {
    const str = 'NextLife: Căn hộ từ cao cấp đến bình dân giá tốt';
    return {
        title: str,
        description: str,
        openGraph: {
            title: str,
            description: str,
            url: '/phong-tro',
            type: 'article',
        }
    }
}

export default async function CanHoPage() {
    const page = 1;
    const limit = 9;

    const data = await fetchPostsFeaturedByPage(page, limit);
    const rooms = data?.data?.data;
    return (
        <div className='mt-[20px]'>
            <TitleRoom title="Danh sách căn hộ" />
            <MainCanHoPage data={rooms} />
        </div>
    )
}