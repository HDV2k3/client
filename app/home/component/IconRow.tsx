import React from "react";
import { FaMobileAlt, FaCar, FaCoins, FaCrown, FaMotorcycle, FaRegBookmark, FaGift } from "react-icons/fa";

const IconRow = () => {
  const services = [
    { icon: FaMobileAlt, text: "Thu mua điện thoại", alt: "Icon for buying phones" },
    { icon: FaCar, text: "Thu mua ô tô", alt: "Icon for buying cars" },
    { icon: FaCoins, text: "Nạp Đồng Tốt", alt: "Icon for good coins" },
    { icon: FaCrown, text: "Gói Pro", alt: "Icon for pro package" },
    { icon: FaMotorcycle, text: "Thu mua xe máy", alt: "Icon for buying motorcycles" },
    { icon: FaRegBookmark, text: "Tin đăng đã lưu", alt: "Icon for saved posts" },
    { icon: FaGift, text: "Đăng tin cho tặng", alt: "Icon for gift posts" },
  ];

  const handleClick = (text:any) => {
    console.log(`Clicked on: ${text}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {services.map((service, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleClick(service.text)}
          >
            <div className="text-3xl mb-2 text-blue-600">
              {React.createElement(service.icon, {
                "aria-hidden": "true",
                role: "img",
              })}
            </div>
            <span className="text-sm text-center font-medium text-gray-700">
              {service.text}
            </span>
            <span className="sr-only">{service.alt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconRow;
