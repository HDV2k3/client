import React from "react";
import Image from "next/image";

interface ExperProps {
  imageUrl: string;
  title: string;
  description: string;
}
const ExperienceCard: React.FC<ExperProps> = ({
  title,
  description,
  imageUrl,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-20">
      <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const RealEstateExperience = () => {
  const experiences = [
    {
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/exp%2Fkinh-doanh-bat-dong-san.jpg?alt=media&token=c19ef05f-aa29-48d6-a0a5-8a889c78928e",
      title: "Cầu Bình Lợi, cây cầu lịch sử nối liền hai bờ sông Sài",
      description:
        "Cầu Bình Lợi là một công trình giao thông quan trọng tại TPHCM, bắc qua sông Sài Gòn...",
    },
    {
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/exp%2Fkinh-doanh-bat-dong-san.jpg?alt=media&token=c19ef05f-aa29-48d6-a0a5-8a889c78928e",
      title: "Nhà Thiếu Nhi Quận 8, không gian học tập và vui chơi",
      description:
        "Nằm tại số 1 Đương Bá Trạc, P1, Quận 8, TP.HCM, Nhà Thiếu Nhi Quận 8 có vị trí...",
    },
    {
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/exp%2Fimage-20210205115736-1.png?alt=media&token=35fe3900-14c1-42f2-94a2-fada42c8cb61",
      title: "Bến xe Miền Đông mới: Bến xe mới hiện đại, lớn",
      description:
        "Bến xe Miền Đông mới: Siêu bến xe hiện đại nhất Việt Nam. Tiện ích đầy đủ, kết nối giao...",
    },
    {
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/exp%2Fbat-dong-san.png?alt=media&token=90e9c4c7-30f7-46fc-b876-1d6955882f59",
      title: "Trường Đại học Quốc gia Thành phố Hồ Chí Minh:",
      description:
        "Đại học Quốc gia TP.HCM: Trường đại học hàng đầu Việt Nam. Trường đào tạo đa...",
    },
  ];

  return (
    <div className=" rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4">Kinh nghiệm Bất động sản</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
      <div className="text-center py-5">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default RealEstateExperience;
