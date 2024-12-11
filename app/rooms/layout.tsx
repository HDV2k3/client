import { fetchInfoRooms, fetchPostsPromotionalByPage } from "@/service/Marketing";
import Courasel from "../home/component/Courasel";
import RealEstateExperience from "./component/RealEstateExperience";
import Stats from "./component/Stats";
import { fetchCarouselData } from '@/service/actions/HomeAction'
import MainPromotions from "../home/component/MainRoomListPromotion";
import TitleRoom from "@/components/TitleRoom";

type Props = {
    children: React.ReactNode;
}
export default async function LayoutRooms({ children }: Props) {
    const page = 1;
    const size = 8;

    const dataCourasel = await fetchCarouselData();
    const dataInfoMarketing = await fetchInfoRooms();
    const dataResponsePromotion = await fetchPostsPromotionalByPage(page, size);
    const dataRoomsPromotions = dataResponsePromotion?.data?.data;
    return (
        <>
            <div className="px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl mx-auto">
                <div>
                    <Courasel data={dataCourasel} />
                    <Stats data={dataInfoMarketing} />
                    <TitleRoom title="Tất cả các phòng tại Next Room" />

                    {children}
                    <MainPromotions data={dataRoomsPromotions} page={page} size={size} />
                    <div className="bg-white rounded-lg">
                        <RealEstateExperience />
                    </div>
                </div>
            </div>
        </>
    )
}