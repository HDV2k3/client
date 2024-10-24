"use client";

import dynamic from "next/dynamic";
import PromotionBanner from "../../components/PromotionBanner";
// Dynamically import SearchPageClient with SSR disabled
const Main = dynamic(() => import("../../app/search/component/SearchPageClient"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function SearchPage() {
  return (
    <>
      <PromotionBanner />
      <Main />
    </>
  );
}
