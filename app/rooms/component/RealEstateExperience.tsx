"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import Link from "next/link";
import { converStringToSlug } from "@/utils/converStringToSlug";

interface PostImage {
  name: string;
  type: string;
  urlImagePost: string;
}

interface Experience {
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
    data: Experience[];
  };
  message: string;
}

const ExperienceCard: React.FC<Experience> = ({
  id,
  title,
  description,
  postImages,
}) => {
  const truncatedDescription = description.length > 50 ? (
    <>
      {description.slice(0, 170)}{" "}
      <Link href={`/experience/${converStringToSlug(title)}-${id}.html`} className="text-blue-500 underline">
        Đọc tiếp
      </Link>
    </>
  ) : (
    description
  );
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="relative min-h-40">
        <Image
          src={postImages[0]?.urlImagePost || "/placeholder.jpg"}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{truncatedDescription} </p>
      </div>
    </div>
  );
};

const RealEstateExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/experience/all`
        );
        const result: ApiResponse = await response.json();

        if (result.responseCode === 101000) {
          setExperiences(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4">Kinh nghiệm Bất động sản</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div> */}
      <Carousel
        dots={true}
        arrows={false}
        autoplay
        draggable={true}
        infinite
        slidesToShow={4}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
        dotPosition="bottom"
        className="pb-6"
      >
        {experiences.map((exp: any) => (
          <div key={exp.id} className="px-2">
            <ExperienceCard {...exp} />
          </div>
        ))}
      </Carousel>
      {/* <div className="text-center py-5">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
          Xem thêm
        </button>
      </div> */}
    </div>
  );
};

export default RealEstateExperience;
