

import ButtonBack from "@/components/Button/ButtonBack";
import { getFavoriteBookmarkAction } from "@/service/actions/FavoriteAction";
import RenderListBookmarks from './components/RenderListBookmarks';

export default async function BookMarkPage() {
    const page = 1;
    const size = 5;
    const data = await getFavoriteBookmarkAction(page, size);
    const dataRooms = data?.data;

    return (
        <div className="w-full h-full flex justify-center items-center mt-6">
            <div className="w-full max-w-[1000px] h-[80vh] mb-6 px-3 bg-white rounded-lg shadow-lg">
                <div className="h-[50px] flex items-center">
                    <ButtonBack />
                    <span className='text-xl font-semibold'>Tin đang lưu</span>
                </div>

                <div className="max-h-[810px]">
                    <RenderListBookmarks data={dataRooms} page={page} size={size} />
                </div>
            </div>
        </div>
    );
}
