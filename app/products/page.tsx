'use server';

import React from "react";
import { Button } from "antd";
import TitleRoom from "../../components/TitleRoom";
import ProductCard from "../../components/ProductCard"; // You need to create this component
import { SkeletonCard } from "../../components/SkeletonCard"; // Use for loading state

// Define the types for your products
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    features: string[];
}

const ProductsPage: React.FC = () => {
    // Simulate fetching products data
    const products: Product[] = [
        {
            id: '1',
            name: 'Standard Room Package',
            description: 'A cozy room with essential amenities for a comfortable stay.',
            price: 300,
            imageUrl: '/assets/images/standard-room.jpg',
            features: ['Wi-Fi', 'Air Conditioning', 'TV'],
        },
        {
            id: '2',
            name: 'Luxury Suite',
            description: 'A luxurious suite with premium amenities for an extravagant stay.',
            price: 800,
            imageUrl: '/assets/images/luxury-suite.jpg',
            features: ['Wi-Fi', 'Private Balcony', 'Premium TV Channels', 'Minibar'],
        },
        // Add more products as needed
    ];

    return (
        <div className="px-4 py-8 max-w-screen-xl mx-auto min-h-screen flex flex-col ">
            <TitleRoom title="Sản Phẩm Của Chúng Tôi" />
            <p className="text-lg mb-6">
                Tại NextRoom, chúng tôi cung cấp các gói phòng khác nhau để đáp ứng nhu cầu
                của bạn. Từ những căn phòng tiện nghi đến các suite sang trọng, chúng tôi
                cam kết mang đến trải nghiệm tốt nhất cho bạn.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0 ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            features={product.features}
                        />
                    ))
                )}
            </div>
            <div className="text-center mt-6">
                <Button type="primary" href="/contact">Liên Hệ Đặt Phòng</Button>
            </div>
        </div>
    );
};

export default ProductsPage;
