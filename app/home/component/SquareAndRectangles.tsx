import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { converStringToSlug } from "@/utils/converStringToSlug";
import { districtsConstants, districtsType, findTypeByName } from "@/constants/districts";
import { useRouter } from "@/hooks/useRouter";

const DistrictDisplay = () => {
  const router = useRouter();
  const [randomDistricts, setRandomDistricts] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  const getRandomItems = (array: any, count: any) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setIsClient(true);
    setRandomDistricts(getRandomItems(districtsConstants, 5));

    const interval = setInterval(() => {
      setRandomDistricts(getRandomItems(districtsConstants, 5));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  const handleButtonDetail = (district: any) => {
    const type = findTypeByName(district?.name);
    const converSlug = converStringToSlug(`danh sách phòng và nhà tại ${district?.name}`);
    const url = `/districts/${converSlug}-${type}.html`;
    router.push(url);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {randomDistricts.map((district, index) => (
          <motion.div
            key={district.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-lg shadow-lg
              ${index === 0
                ? "md:col-span-4 md:row-span-2 h-[250px] lg:h-[300px]"
                : "h-[200px] lg:h-[280px]"
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
              style={{
                backgroundImage: `url(${district.imageUrl})`,
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-30" />

            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-inherit/60 to-transparent">
              <h3 className="text-white font-semibold text-lg mb-1">
                {district.name}
              </h3>
              <p className="text-white/90 text-sm">{district.posts} bài đăng</p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transform transition hover:scale-105"
                onClick={() => handleButtonDetail(district)}
              >
                Xem chi tiết
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DistrictDisplay;
