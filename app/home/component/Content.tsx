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

const Content = () => {
  const experiences = [
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/home_content%2Fdautu.kinhtechungkhoan.vn-stores-news_dataimages-2023-112023-19-01-in_social-_bat-dong-san20231119012254.jpg?alt=media&token=f95c47e4-0ebe-4e18-af8d-bc77b0301962",
      title: "Cầu Bình Lợi, cây cầu lịch sử nối liền hai bờ sông Sài",
      description:
        "Cầu Bình Lợi là một công trình giao thông quan trọng tại TPHCM, bắc qua sông Sài Gòn...",
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/home_content%2Fimages.jpg?alt=media&token=dba72c04-f8fd-445d-b176-9c7dd127bee8",
      title: "Nhà Thiếu Nhi Quận 8, không gian học tập và vui chơi",
      description:
        "Nằm tại số 1 Đương Bá Trạc, P1, Quận 8, TP.HCM, Nhà Thiếu Nhi Quận 8 có vị trí...",
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/home_content%2Fnoitang-210915-1442804718143.jpg?alt=media&token=12179d86-91e4-4d4b-8e95-76aa6a99bedf",
      title: "Bến xe Miền Đông mới: Bến xe mới hiện đại, lớn",
      description:
        "Bến xe Miền Đông mới: Siêu bến xe hiện đại nhất Việt Nam. Tiện ích đầy đủ, kết nối giao...",
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/home_content%2Fphotd-tu1-1673254645362582917776.jpg?alt=media&token=c51a028a-cd3b-4186-8739-f92966d26c05",
      title: "Trường Đại học Quốc gia Thành phố Hồ Chí Minh:",
      description:
        "Đại học Quốc gia TP.HCM: Trường đại học hàng đầu Việt Nam. Trường đào tạo đa...",
    },
  ];

  return (
    <div className=" rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4">Thị trường và xu hướng</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
      {/* <div className="text-center py-5">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
          Xem thêm
        </button>
      </div> */}
    </div>
  );
};

export default Content;
