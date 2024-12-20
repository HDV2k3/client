import React from "react";
import TitleRoom from "../../components/TitleRoom";

export default function Loading() {
  return (
    <>
      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng trọ nổi bật" />
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <TitleRoom title="Phòng ưu đãi" />
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </>
  );
}
