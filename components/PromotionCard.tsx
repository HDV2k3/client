import React from "react";

interface PromotionCardProps {
    title: string;
    description: string;
    discountPercentage: number;
    validUntil: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ title, description, discountPercentage, validUntil }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{description}</p>
                <p className="text-lg font-semibold mb-2">Giảm giá: {discountPercentage}%</p>
                <p className="text-sm text-gray-500">Hạn dùng: {validUntil}</p>
            </div>
        </div>
    );
};

export default PromotionCard;
