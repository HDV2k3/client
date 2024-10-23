import React from "react";
import Image from "next/image";

interface PromotionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  onButtonClick,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-40">
      <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const PromotionSection: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Ưu đãi / Chương trình</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PromotionCard
          title="Hoàn 20% khi sử dụng dịch vụ Bất động sản lần đầu!"
          description="với giá trị lên đến 684,000 Đồng Tốt"
          imageUrl="https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/voucher%2Fchuong-trinh-khuyen-mai.png?alt=media&token=1ea88c72-6c55-478a-b75f-2fe802e44e87"
          buttonText="Tìm hiểu ngay"
          onButtonClick={() => console.log("PRO package clicked")}
        />
        <PromotionCard
          title="Hỗ trợ vẫn chuyển đồ dùng miễn phí lần đầu 🏠"
          description="thỏa mái chuyển trọ"
          imageUrl="https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/voucher%2Fdich-vu-chuyen-tro.png?alt=media&token=5d301e1e-09db-46f4-ba3c-9e6282f72c15"
          buttonText="Tìm hiểu ngay"
          onButtonClick={() => console.log("Phong 5 Tot clicked")}
        />
      </div>
    </div>
  );
};

export default PromotionSection;
