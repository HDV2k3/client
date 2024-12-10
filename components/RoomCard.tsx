"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircleFilled, EnvironmentFilled, TagFilled, } from "@ant-design/icons";
import "../styles/RoomCardProminent.css";
import { FaPhone, FaUser, FaRegBookmark } from "react-icons/fa";
import { Carousel, message, Tooltip } from "antd";
import { converStringToSlug } from './../utils/converStringToSlug';

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
  createdBy: string;
  contactInfo: string;
  title?: string;
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
  createdBy,
  contactInfo,
  title
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const href = `/r/${converStringToSlug(title || name)}-${id}.html`;
  const handleBookMark = () => {
    message.success('boook mark here')
  }
  const renderImage = () => {
    return (
      <>
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
      </>
    )
  }
  const renderPrice = () => {
    return (
      <div className="flex justify-between items-center text-sm space-x-1 ">
        {fixPrice != null ? (
          <span className="text-gray-500 line-through ">
            {price.toLocaleString()} VNĐ/tháng
          </span>
        ) : (
          <span className="font-bold ">
            {price.toLocaleString()} VNĐ/tháng
          </span>
        )}
        {fixPrice != null && (
          <span className="font-bold  text-red-600">
            {fixPrice.toLocaleString()} VNĐ/tháng
          </span>
        )}
      </div>
    )
  }
  const renderCreateAtAndContact = () => {
    return (
      <div className="flex justify-between items-center">
        {/* Left Section: Created By */}
        <Tooltip title={createdBy}>
          <span className="flex items-center text-gray-500 text-sm max-w-[150px] truncate">
            <FaUser className="mr-2 text-gray-600" />
            <span className="truncate">{createdBy}</span>
            <CheckCircleFilled
              className="text-green-500 ml-1"
              style={{ fontSize: "7px" }}
            />
          </span>
        </Tooltip>

        {/* Right Section: Contact Info */}
        <Tooltip title={contactInfo}>
          <span className="flex items-center text-gray-500 text-sm truncate max-w-[200px]">
            <FaPhone className="mr-2 text-gray-600" />
            <span className="truncate">{contactInfo}</span>
          </span>
        </Tooltip>
      </div>
    )
  }
  return (
    <div
      className="room-card bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1: Image */}
      <div className="relative overflow-hidden h-48 cursor-pointer">
        <Link key={id} href={href} passHref>
          <>{renderImage()}</>
        </Link>
        <button
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors z-10000"
          onClick={handleBookMark}
        >
          <FaRegBookmark size={15} />
        </button>
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

      <Link key={id} href={href} passHref>
        <div className="p-4 flex-grow flex flex-col justify-between">
          {/* Layer 2: Room Information */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 max-w-[300px] ">
            {name}
          </h3>

          <div className="flex items-center text-sm mb-2">
            <EnvironmentFilled className="mr-1" /> {address}
          </div>

          <div className="flex flex-wrap items-center space-x-2 mb-2 text-sm">
            <span className="flex items-center px-2 bg-gray-100 rounded mb-2">
              <TagFilled className="mr-1 text-xs" /> {type}
            </span>
            <span className="flex items-center px-2 bg-gray-100 rounded mb-2">
              <FaUser className="mr-1 text-xs" /> {capacity} người
            </span>
          </div>

          {/* Layer 3: Price Display */}
          <>{renderPrice()}</>
          <>{renderCreateAtAndContact()}</>
        </div>
      </Link>
    </div>
  );
};

export default RoomCardProminent;
