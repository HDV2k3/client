import React from "react";
import {
  FaHome,
  FaBuilding,
  FaWarehouse,
  FaRegNewspaper,
  FaRegBookmark,
  FaRegEdit,
} from "react-icons/fa";

const IconRow = () => {
  const services = [
    {
      icon: FaHome,
      text: "Phòng Trọ",
      alt: "Icon for houses",
      link: "/nha-rieng",
    },
    {
      icon: FaBuilding,
      text: "Căn Hộ",
      alt: "Icon for apartments",
      link: "/can-ho",
    },
    {
      icon: FaWarehouse,
      text: "Mặt Bằng",
      alt: "Icon for commercial spaces",
      link: "/mat-bang",
    },
    {
      icon: FaRegNewspaper,
      text: "Tin Tức",
      alt: "Icon for latest news",
      link: "/tin-moi",
    },
    {
      icon: FaRegBookmark,
      text: "Tin Đã Lưu",
      alt: "Icon for saved posts",
      link: "/tin-da-luu",
    },
    {
      icon: FaRegEdit,
      text: "Đăng Tin",
      alt: "Icon for posting",
      link: "/dang-tin",
    },
  ];

  const handleClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white shadow-sm">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {services.map((service, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-3 rounded-lg transition duration-300 ease-in-out hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleClick(service.link)}
          >
            <div className="text-2xl mb-2 text-blue-600">
              {React.createElement(service.icon, {
                "aria-hidden": "true",
                role: "img",
              })}
            </div>
            <span className="text-xs sm:text-sm text-center font-medium text-gray-700">
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
