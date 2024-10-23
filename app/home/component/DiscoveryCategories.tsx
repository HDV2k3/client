import React, { useState } from "react";
import Image from "next/image";

const DiscoveryCategories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      name: "Bất động sản",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    },
    {
      name: "Việc làm",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    },
    {
      name: "Xe cộ",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Nhà ở",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Đồ điện tử",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Phòng trọ",
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    },
    {
      name: "Đồ gia dụng, nội thất",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    },
    {
      name: "Tin tức",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const handleCategoryClick = (index: any) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-start">Khám phá danh mục</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeCategory === index ? "bg-blue-100 shadow-lg" : "bg-white hover:bg-gray-100"}`}
            onClick={() => handleCategoryClick(index)}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={100}
              height={100}
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoveryCategories;
