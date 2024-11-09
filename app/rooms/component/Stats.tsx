import React from "react";
import { FaHandshake, FaKey, FaBuilding, FaUserTie } from "react-icons/fa";

const Stats = () => {
  const stats = [
    {
      icon: FaHandshake,
      label: "Mua bán",
      count: "148.165",
      subLabel: "tin đăng mua bán",
    },
    {
      icon: FaKey,
      label: "Cho thuê",
      count: "120.930",
      subLabel: "tin đăng cho thuê",
    },
    {
      icon: FaBuilding,
      label: "Dự án",
      count: "4.154",
      subLabel: "dự án",
    },
    {
      icon: FaUserTie,
      label: "Môi giới",
      count: "245",
      subLabel: "chuyên trang",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6"
          >
            <div className="flex-shrink-0">
              <stat.icon className="text-2xl sm:text-3xl lg:text-4xl text-orange-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm sm:text-base font-bold text-gray-800">
                {stat.label}
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-500">
                {stat.count}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {stat.subLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
