

import ButtonBack from "@/components/Button/ButtonBack";
import getToken from "@/utils/getTokenLocalStorage";
import dynamic from "next/dynamic";
const RenderListBookmarksLazy = dynamic(() => import('./components/RenderListBookmarks'), {
    loading: () => <p>Loading book marks</p>,
})

export default async function BookMarkPage() {

    const token = getToken();
    console.log('check token: ', token);

    return (
        <div className="w-[100%] h-[100%] flex justify-center items-center">
            <div className="w-[100%] max-w-[1000px] h-[80vh] mb-[20px] px-3 bg-white" >
                <div className="h-[50px] w-[100%] flex items-center">
                    <ButtonBack />
                    <span className='text-lg'>
                        Tin đang lưu
                    </span>
                </div>
                <div className="h-[50px]">
                    <span className="text-2lg">
                        Tin đăng đã lưu (2 / 100)
                    </span>
                </div>

                <RenderListBookmarksLazy />
            </div>
        </div>
    )
}