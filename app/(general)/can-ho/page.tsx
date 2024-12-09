import { fetchPostsFeaturedByPage } from '@/service/Marketing'
import MainCanHoPage from './components/MainCanHoPage'
export default async function CanHoPage() {
    const page = 1;
    const limit = 10;

    const data = await fetchPostsFeaturedByPage(page, limit);
    const rooms = data?.data?.data;
    return (
        <MainCanHoPage data={rooms} />
    )
}