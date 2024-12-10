import React from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  features: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  imageUrl,
  features,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <Image src={imageUrl} alt={name} width={1000} height={1000} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-lg font-semibold mb-4">Price: ${price}</p>
        <ul className="list-disc list-inside mb-4">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-600">
              {feature}
            </li>
          ))}
        </ul>
        <a href="/contact" className="text-blue-500 hover:underline">
          Contact Us for More Details
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
