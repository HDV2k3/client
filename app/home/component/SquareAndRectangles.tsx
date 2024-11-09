import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DistrictDisplay = () => {
  const [randomDistricts, setRandomDistricts] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  const districts = [
    {
      name: "TP.Thủ Đức",
      posts: 20,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
      name: "Quận 1",
      posts: 5,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fquan1.jpg?alt=media&token=3c8649ea-3de9-4d6c-8596-0eaaeb3d5c54",
    },
    {
      name: "Quận Phú Nhuận",
      posts: 9,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2F1-gioi-thieu-tong-quan-ve-quan-phu-nhuan-tphcm.jpg?alt=media&token=ad222cd5-a978-4702-b829-500491bec002",
    },
    {
      name: "Quận Tân Bình",
      posts: 14,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
      name: "Quận 10",
      posts: 18,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
      name: "Quận 2",
      posts: 12,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
      name: "Quận 3",
      posts: 8,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
      name: "Quận 4",
      posts: 6,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2F1-gioi-thieu-tong-quan-ve-quan-phu-nhuan-tphcm.jpg?alt=media&token=ad222cd5-a978-4702-b829-500491bec002",
    },
    {
      name: "Quận 5",
      posts: 7,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fquan1.jpg?alt=media&token=3c8649ea-3de9-4d6c-8596-0eaaeb3d5c54",
    },
    {
      name: "Quận 6",
      posts: 10,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
      name: "Quận 7",
      posts: 15,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
      name: "Quận 8",
      posts: 11,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2F1-gioi-thieu-tong-quan-ve-quan-phu-nhuan-tphcm.jpg?alt=media&token=ad222cd5-a978-4702-b829-500491bec002",
    },
    {
      name: "Quận 9",
      posts: 13,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fquan1.jpg?alt=media&token=3c8649ea-3de9-4d6c-8596-0eaaeb3d5c54",
    },
    {
      name: "Quận Bình Thạnh",
      posts: 16,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
      name: "Quận Gò Vấp",
      posts: 17,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fthanh-pho-thu-duc.jpg?alt=media&token=8604e841-8099-4601-9406-869c203b9330",
    },
    {
      name: "Quận Tân Phú",
      posts: 19,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
      name: "Quận Bình Tân",
      posts: 22,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
      name: "Huyện Bình Chánh",
      posts: 25,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
      name: "Huyện Củ Chi",
      posts: 30,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
    {
      name: "Huyện Hóc Môn",
      posts: 27,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fchung-cu-cao-cap-quan-10.jpg?alt=media&token=ab9bfd58-814d-42c3-9663-7367fd5b8ecb",
    },
    {
      name: "Huyện Nhà Bè",
      posts: 23,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/location_In_HCM%2Fcong-vien-hoang-van-thu.jpg?alt=media&token=819223d0-ca0e-4fcd-89cb-7b466db07528",
    },
  ];

  const getRandomItems = (array: any, count: any) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setIsClient(true);
    setRandomDistricts(getRandomItems(districts, 5));

    const interval = setInterval(() => {
      setRandomDistricts(getRandomItems(districts, 5));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {randomDistricts.map((district, index) => (
          <motion.div
            key={district.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-lg shadow-lg
              ${
                index === 0
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transform transition hover:scale-105">
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
