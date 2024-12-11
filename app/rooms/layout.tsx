import Courasel from "../home/component/Courasel";
import PromotionSection from "./component/PromotionSection";
import RealEstateExperience from "./component/RealEstateExperience";
import Stats from "./component/Stats";
import { fetchCarouselData } from '@/service/actions/CarouselAction'

type Props = {
    children: React.ReactNode;
}
export default async function LayoutRooms({ children }: Props) {

    const dataCourasel = await fetchCarouselData();
    console.log('check data, ', dataCourasel);
    return (
        <>
            <div className="px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl mx-auto">
                <div>
                    <Courasel data={dataCourasel} />
                    <Stats />
                    {children}
                    <PromotionSection />
                    <div className="bg-white rounded-lg">
                        <RealEstateExperience />
                    </div>
                </div>
            </div>
        </>
    )
}