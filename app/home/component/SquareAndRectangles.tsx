"use client";
import React, { useState, useEffect } from "react";
import "../../../styles/SquareAndRectangles.css";

// Dữ liệu mẫu các quận
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

const getRandomItems = (array: any[], count: number) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const SquareAndRectangles: React.FC = () => {
  const [randomDistricts, setRandomDistricts] = useState(districts.slice(0, 5));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setRandomDistricts(getRandomItems(districts, 5));

    const interval = setInterval(() => {
      setRandomDistricts(getRandomItems(districts, 5));
    }, 10000); // 10 giây

    return () => clearInterval(interval);
  }, []);

  //   return (
  //     <div className="container1 ">
  //       <div className="grid-container">
  //         {randomDistricts.map((district, index) => (
  //           <div
  //             key={district.name}
  //             className={index === 0 ? "square room-card" : "rectangle room-card"}
  //             style={{
  //               backgroundImage: `url(${district.imageUrl})`,
  //             }}
  //           >
  //             <div className="text-overlay">
  //               <div>{district.name}</div>
  //               <div>{district.posts} bài đăng</div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <div className="container1">
      <div className="grid-container">
        {randomDistricts.map((district, index) => (
          <div
            key={district.name}
            className={index === 0 ? "square room-card" : "rectangle room-card"}
            style={{
              backgroundImage: `url(${district.imageUrl})`,
            }}
          >
            <div className="text-overlay">
              <div>{district.name}</div>
              <div>{district.posts} bài đăng</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquareAndRectangles;
