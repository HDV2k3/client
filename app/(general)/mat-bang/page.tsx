import ButtonBack from "@/components/Button/ButtonBack";
import TitleRoom from "@/components/TitleRoom";
import { fetchPostByTypeRoomAndPage } from "@/service/Marketing";
import MainRenderItemsPostByType from "../../../components/MainRenderItemsPostByType";

export async function generateMetadata() {
    const str = 'NextLife: Cho thuê mặt bằng giá tốt';
    const url = '/mat-bang'
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

export default async function MatBangPage() {
    const page = 1;
    const limit = 5;
    const type = 2;
    const title = "Danh sách mặt bằng cho thuê";
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