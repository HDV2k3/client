"use client";

import React from "react";
import { Button } from "antd";
import TitleRoom from "../../components/TitleRoom";
import PromotionCard from "../../components/PromotionCard"; // You need to create this component
import { SkeletonCard } from "../../components/SkeletonCard"; // Use for loading state

// Define the types for your promotions
interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
}

const PromotionsPage: React.FC = () => {
  // Simulate fetching promotions data
  const promotions: Promotion[] = [
    {
      id: "1",
      title: "Summer Sale",
      description:
        "Get 20% off on all room bookings made before the end of August.",
      discountPercentage: 20,
      validUntil: "2024-08-31",
    },
    {
      id: "2",
      title: "Weekend Special",
      description: "Book a room for 2 nights and get 1 additional night free.",
      discountPercentage: 50, // Not exactly 50% discount, but implies 1 free night
      validUntil: "2024-09-30",
    },
    // Add more promotions as needed
  ];

  return (
    <div className="px-4 py-8 max-w-screen-xl mx-auto min-h-screen flex flex-col">
      <TitleRoom title="Khuyến Mãi Đặc Biệt" />
      <p className="text-lg mb-6">
        Khám phá các chương trình khuyến mãi và ưu đãi đặc biệt của chúng tôi để
        tiết kiệm nhiều hơn cho kỳ nghỉ của bạn. Đừng bỏ lỡ cơ hội để tận hưởng
        các ưu đãi hấp dẫn.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.length === 0
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : promotions.map((promotion) => (
              <PromotionCard
                key={promotion.id}
                title={promotion.title}
                description={promotion.description}
                discountPercentage={promotion.discountPercentage}
                validUntil={promotion.validUntil}
              />
            ))}
      </div>
      <div className="text-center mt-6">
        <Button type="primary" href="/contact">
          Nhận Thêm Thông Tin
        </Button>
      </div>
    </div>
  );
};

export default PromotionsPage;
