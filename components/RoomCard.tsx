"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EnvironmentFilled, TagFilled } from "@ant-design/icons";
import "../styles/RoomCardProminent.css";
import { FaUser } from "react-icons/fa";
import { Carousel } from "antd"; // Thêm Carousel

interface RoomCardProps {
  id: string;
  name: string;
  price: number;
  fixPrice?: number | null; // Thêm fixPrice
  imageUrls: string[];
  totalArea: number;
  address: string;
  createdDate: string;
  description: string;
  status: string;
  type: string;
  capacity: number;
}

const RoomCardProminent: React.FC<RoomCardProps> = ({
  id,
  name,
  price = 0, // Đặt giá trị mặc định
  fixPrice = null, // Đặt giá trị mặc định
  imageUrls,
  address,
  type,
  capacity,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/room-detail/${id}`} passHref>
      <div
        className="room-card bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Layer 1: Image */}
        <div className="relative overflow-hidden h-48 cursor-pointer">
          <Carousel autoplay arrows infinite={false}>
            {imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
                <div key={index} className="relative w-full h-48">
                  <Image
                    className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${isHovered ? "scale-110" : "scale-100"}`}
                    src={url}
                    alt={`${name} - Image ${index + 1}`}
                    layout="fill"
                  />
                </div>
              ))
            ) : (
              <div className="relative w-full h-48">
                <Image
                  src="/default-image.jpg"
                  alt="Default"
                  layout="fill"
                  className="object-cover"
                />
              </div>
            )}
          </Carousel>
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ease-in-out" />
          )}

          {/* Hot Badge */}
          {fixPrice != null && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              <span className="font-bold">Đang khuyến mãi</span>
            </div>
          )}
          <div className="hot-badge  absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            <span className="font-bold">Chốt ngay</span>
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          {/* Layer 2: Room Information */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center text-sm mb-2">
            <EnvironmentFilled className="mr-1" /> {address}
          </div>
          <div className="flex items-center space-x-2 mb-2 text-sm">
            <span className="flex items-center px-2 bg-gray-100 rounded">
              <TagFilled className="mr-1 text-xs" /> {type}
            </span>
            <span className="flex items-center px-2 bg-gray-100 rounded">
              <FaUser className="mr-1 text-xs" /> {capacity} người
            </span>
          </div>

          {/* Layer 3: Price Display */}
          <div className="flex justify-between items-center">
            {fixPrice != null ? (
              <span className="text-gray-500 line-through text-sm">
                {price.toLocaleString()} VNĐ/tháng
              </span>
            ) : (
              <span className="font-bold text-lg">
                {price.toLocaleString()} VNĐ/tháng
              </span>
            )}
            {fixPrice != null && (
              <span className="font-bold text-sm text-red-600">
                {fixPrice.toLocaleString()} VNĐ/tháng
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCardProminent;
