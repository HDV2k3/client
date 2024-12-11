
import dynamic from "next/dynamic";
import PromotionBanner from "../home/component/PromotionBanner";
import { fetchPromotionBannerAction } from "@/service/actions/HomeAction";
// Dynamically import SearchPageClient with SSR disabled
const Main = dynamic(
  () => import("../../app/search/component/SearchPageClient"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export default async function SearchPage() {
  const dataPromotion = await fetchPromotionBannerAction();

  return (
    <>
      <PromotionBanner data={dataPromotion} />
      <Main />
    </>
  );
}
