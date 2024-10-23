"use client";

import React from "react";

const AboutPage: React.FC = () => {
    return (
        <div className="px-4 py-8 max-w-screen-xl mx-auto min-h-screen flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Về Chúng Tôi</h1>
            <p className="text-lg mb-6">
                Chúng tôi cam kết cung cấp các phòng cho thuê chất lượng cao, đảm bảo sự
                thoải mái và tiện nghi cho tất cả khách hàng của chúng tôi. Đội ngũ của
                chúng tôi tận tâm giúp bạn tìm được nơi ở hoàn hảo, cho dù bạn đang tìm
                kiếm một căn hộ ấm cúng hay một biệt thự sang trọng.
            </p>
        </div>
    );
};

export default AboutPage;
