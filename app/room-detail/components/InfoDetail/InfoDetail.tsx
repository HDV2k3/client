"use client";
import React from "react";
import { FaCheckCircle, FaShower, FaPlug } from "react-icons/fa";
import { EnvironmentFilled, TagFilled } from "@ant-design/icons";
import { convertToVND } from "../../../../utils/convertToVND";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

// Subcomponent for displaying utility items
const UtilityItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center text-gray-500 mr-4 font-semibold text-sm">
    <FaCheckCircle className="mr-2 text-green-600" />
    {label}
  </div>
);

// Subcomponent for displaying service prices
const ServicePrice: React.FC<{
  icon: JSX.Element;
  label: string;
  price: string;
}> = ({ icon, label, price }) => (
  <div className="flex items-center mr-8 whitespace-nowrap text-sm">
    {icon}
    <span className="mr-1 text-gray-600">{label}:</span>
    <span>{price}</span>
  </div>
);

interface IProps {
  room: Room;
}

const InfoDetail: React.FC<IProps> = ({ room }) => {
  const glitterStyle = `
    @keyframes glitter {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
    }
    .glitter-text {
      background: linear-gradient(90deg, #00ff00, #39ff14, #7cfc00, #32cd32);
      background-size: 400% 400%;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: glitter 10s ease-in-out infinite;
    }
  `;

  const hasPromotionalPrice =
    (room.fixPrice ?? 0) < room.pricingDetails.basePrice;

  return (
    <div className="float-right px-2">
      <style>{glitterStyle}</style>
      <div className="text-lg font-bold mb-4">
        <div className="flex">
          <span className="glitter-text">{room.title}</span>
        </div>
      </div>

      <div className="flex items-center mb-2 text-sm">
        <EnvironmentFilled className="mr-2" />
        <span>{room.roomInfo.address}</span>
      </div>
      <div className="flex items-center mb-2 text-sm">
        <TagFilled className="mr-2" />
        <span>{room.roomInfo.type}</span>
      </div>

      <div className="text-xl font-bold mb-4">
        <h3 className="text-base font-semibold underline mb-2">
          Tiện ích Phòng
        </h3>
        <div className="flex flex-wrap mb-2">
          {Object.entries(room.roomUtility.furnitureAvailability)
            .filter(([, value]) => value)
            .map(([key]) => (
              <UtilityItem key={key} label={key} />
            ))}
          {room.roomInfo.numberOfBathrooms === 1 && (
            <UtilityItem label="Nhà tắm" />
          )}
          {room.roomInfo.numberOfBedrooms === 1 && (
            <UtilityItem label="Phòng ngủ" />
          )}
        </div>
        <h3 className="text-base font-semibold underline mb-2">Tiện Nghi</h3>
        <div className="flex flex-wrap mb-2">
          {Object.entries(room.roomUtility.amenitiesAvailability)
            .filter(([, value]) => value)
            .map(([key]) => (
              <UtilityItem key={key} label={key} />
            ))}
        </div>
        <h3 className="text-base font-semibold underline mb-2">Giá dịch vụ</h3>
        <div className="flex mb-4">
          <ServicePrice
            icon={<FaPlug className="mr-2" />}
            label="Giá điện"
            price={`${convertToVND(room.pricingDetails.electricityCost)} / Kwh`}
          />
          <ServicePrice
            icon={<FaShower className="mr-2" />}
            label="Giá nước"
            price={`${convertToVND(room.pricingDetails.waterCost)} / m³`}
          />
        </div>
        <div className="flex flex-wrap mb-4 text-sm">
          {room.pricingDetails.additionalFees.map((fee) => (
            <ServicePrice
              key={fee.type}
              icon={<FaCheckCircle className="mr-2" />}
              label={fee.type}
              price={convertToVND(fee.amount)}
            />
          ))}
        </div>
        <div className=" text-sm">
          <span className="mr-2 text-gray-600">Lưu ý:</span>
          <span className="italic text-gray-600">
            Hình ảnh có thể thay đổi theo thời gian!
          </span>
        </div>
        <h3 className="text-base font-semibold underline text-gray-600 mb-2">
          Giá thuê Phòng
        </h3>
        <div className="flex items-center">
          {hasPromotionalPrice && room.fixPrice ? (
            <>
              <span className="mr-2 text-xl text-red-600 line-through">
                {convertToVND(room.pricingDetails.basePrice)}
              </span>
              <span className="mr-2 text-xl">chỉ còn</span>
              <span className="mr-2 text-xl text-red-600">
                {convertToVND(room.fixPrice)}
              </span>
              <span className="text-xl">/ tháng</span>
            </>
          ) : (
            <>
              <span className="mr-2 text-xl text-red-600">
                {convertToVND(room.pricingDetails.basePrice)}
              </span>
              <span className="text-xl">/ tháng</span>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-start">
          <Link href={`/messages`} passHref>
            <Button>liên hệ ngay: {room.createdBy}</Button>
          </Link>
        </div>
        <div className="flex justify-end mb-5">
          <a
            href="https://zalo.me/0329615309"
            target="_blank"
            className="inline-flex items-center justify-center px-4 py-2 border border-black text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <Image
              src="/assets/images/icons/7044033_zalo_icon.png"
              alt="Icon ZL"
              className="mr-2"
              width={20}
              height={20}
            />
            Nhắn Zalo Ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoDetail;
