import React from "react";
import { FaHandshake, FaKey, FaBuilding, FaUserTie } from "react-icons/fa";
const Stats: React.FC = () => {
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
    { icon: FaBuilding, label: "Dự án", count: "4.154", subLabel: "dự án" },
    {
      icon: FaUserTie,
      label: "Môi giới",
      count: "245",
      subLabel: "chuyên trang",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center bg-white rounded-br rounded-bl  shadow p-4"
        >
          <stat.icon className="text-4xl text-orange-500 mr-4" />
          <div>
            <h3 className="font-bold">{stat.label}</h3>
            <p className="text-xl font-bold text-orange-500">{stat.count}</p>
            <p className="text-sm text-gray-600">{stat.subLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Stats;
