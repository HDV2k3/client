import React, { useEffect, useState } from "react";
import Image from "next/image";


interface PostImage {
  name: string;
  type: string;
  urlImagePost: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  postImages: PostImage[];
}

interface ApiResponse {
  responseCode: number;
  data: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    data: NewsItem[];
  };
  message: string;
}

const ExperienceCard: React.FC<NewsItem> = ({
  title,
  description,
  postImages,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-20">
      <Image
        src={postImages[0]?.urlImagePost || "/placeholder.jpg"}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const Content = () => {
  const [experiences, setExperiences] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/news/all`
        );
        const result: ApiResponse = await response.json();

        // Kiểm tra responseCode và cập nhật dữ liệu
        if (result.responseCode === 101000) {
          setExperiences(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4">Thị trường và xu hướng</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
      {/* Uncomment if you want to add a "Xem thêm" button */}
      {/* <div className="text-center py-5">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
          Xem thêm
        </button>
      </div> */}
    </div>
  );
};

export default Content;
