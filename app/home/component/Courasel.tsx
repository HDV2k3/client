"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import Image from "next/image";

type PostImage = {
  name: string;
  type: string;
  urlImagePost: string;
};

type CarouselData = {
  id: string;
  name: string;
  postImages: PostImage[];
};

type ApiResponse = {
  responseCode: number;
  data: CarouselData[];
  message: string;
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  background: "#364d79",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
};

const Courasel: React.FC = () => {
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/carousel/all`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch carousel data");
        }

        const data: ApiResponse = await response.json();

        if (data.responseCode === 101000) {
          setCarouselData(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch carousel data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  if (loading) {
    return (
      <div style={contentStyle} className="flex items-center justify-center">
        <div className="text-white">Loading carousel...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={contentStyle} className="flex items-center justify-center">
        <div className="text-white">Error: {error}</div>
      </div>
    );
  }

  return (
    <Carousel autoplay className="container my-3 mx-auto">
      {carouselData[0]?.postImages.map((image, index) => (
        <div key={image.name}>
          <div style={contentStyle} className="h-fit">
            <Image
              src={image.urlImagePost}
              alt={`Image ${index + 1}`}
              className="md:object-cover object-contain w-full h-full"
              priority={index === 0} // Load the first image with priority
              height={350}
              width={1500}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Courasel;
