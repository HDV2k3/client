"use client";
import React from "react";
import { Button } from "antd"; // Ant Design Button
import { FiArrowUp } from "react-icons/fi"; // Import Icon

const BackToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Button
        type="primary"
        onClick={scrollToTop}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-110"
        icon={<FiArrowUp size={20} />} // Icon mới cho nút
      />
    </div>
  );
};

export default BackToTop;
