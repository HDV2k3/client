import React, { useEffect, useState } from "react";
import Image from "next/image";


interface PostImage {
  name: string;
  type: string;
  urlImagePost: string;
}

interface Promotion {
  id: string;
  name: string;
  description: string;
  postImages: PostImage[];
}

interface ApiResponse {
  responseCode: number;
  data: Promotion[];
  message: string;
}

const PromotionCard: React.FC<Promotion> = ({
  name,
  description,
  postImages,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-40">
      <Image
        src={postImages[0]?.urlImagePost || "/placeholder.jpg"}
        alt={name}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <button
        onClick={() => console.log(`${name} clicked`)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Tìm hiểu ngay
      </button>
    </div>
  </div>
);

const PromotionSection: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/incentive-program/get-all`
        );
        const result: ApiResponse = await response.json();

        if (result.responseCode === 101000) {
          setPromotions(result.data);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Ưu đãi / Chương trình</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} {...promotion} />
        ))}
      </div>
    </div>
  );
};

export default PromotionSection;
