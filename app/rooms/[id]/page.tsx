"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const RoomDetailPage: React.FC = () => {
    const params = useParams();
    const id = params?.id as string; // Assert `id` as a string

    // Fetch room details based on the `id`
    // For now, we'll use a static example
    const room = {
        id,
        name: 'Cozy Apartment',
        price: 75,
        description: 'A cozy apartment in the city center with all modern amenities.',
        imageUrl: 'https://media.istockphoto.com/id/1149521187/vi/anh/ph%C3%B2ng-kh%C3%A1ch-%C4%91%E1%BA%A7y-%C4%91%E1%BB%A7-n%E1%BB%99i-th%E1%BA%A5t.jpg?s=2048x2048&w=is&k=20&c=JphrKjinF5TMwOJll5l9aKgPLYKKiRiFbo4uXSDZu-0=',
    };

    return (
        <div className="px-4 py-8 max-w-screen-lg mx-auto">
            <Image
                src={room.imageUrl}
                alt={room.name}
                width={1200}
                height={800}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
            <p className="text-gray-700 mb-4">{room.description}</p>
            <p className="text-blue-600 font-bold text-2xl">${room.price}/night</p>
        </div>
    );
};

export default RoomDetailPage;
