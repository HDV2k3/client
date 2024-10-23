"use client";

import React from "react";
import { TagFilled } from "@ant-design/icons"; // Import biểu tượng sale từ Ant Design

const PromotionBanner: React.FC = () => {
  return (
    <div className="relative bg-white text-center p-4 mb-4 rounded-lg shadow-md text-lg font-bold">
      <div className="absolute top-2 right-2 flex items-center justify-center bg-red-500 text-white p-2 rounded-full">
        <TagFilled className="text-2xl" />
      </div>
      Ưu đãi đặc biệt: Giảm giá 20% cho lần sử dụng dịch vụ của chúng tôi!
    </div>
  );
};

export default PromotionBanner;
