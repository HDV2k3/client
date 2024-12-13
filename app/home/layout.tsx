import { fetchCarouselData, fetchHomeNewAction, fetchPromotionBannerAction } from "@/service/actions/HomeAction";
import IconRow from "./component/IconRow";
import Content from "./component/News";
import PromotionBanner from "./component/PromotionBanner";
import Courasel from "./component/Courasel";
import TitleRoom from "@/components/TitleRoom";
import SquareAndRectangles from "./component/SquareAndRectangles";

type Props = {
    children: React.ReactNode;
}

export default async function LayoutHomePage({ children }: Props) {
    const dataCourasel = await fetchCarouselData();
    const dataPromotion = await fetchPromotionBannerAction();
    const dataNew = await fetchHomeNewAction();
    
    return (
        <>
            <div className="container mx-auto px-4 py-2 sm:px-0 lg:px-0 max-w-screen-xl">
                {/* Carousel and Icon Row Section */}
                <div className="m-0 p-0">
                    <Courasel data={dataCourasel} />
                    <IconRow />
                </div>

                {/* Promotion Banner */}
                <div className="py-5">
                    <PromotionBanner data={dataPromotion} />
                </div>

                {children}

                {/* Rooms by Location */}
                <div className="sm:mb-8">
                    <TitleRoom title="Phòng theo địa điểm" />
                    <SquareAndRectangles />
                </div>
                {/* News Section */}
                <div>
                    <Content data={dataNew} />
                </div>
            </div>
        </>
    )
}