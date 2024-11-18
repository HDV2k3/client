"use client";

import React, { useState, useEffect } from "react";
import { TagFilled } from "@ant-design/icons";

type Banner = {
  id: string;
  description: string;
};

type ApiResponse = {
  responseCode: number;
  data: Banner[];
  message: string;
};

const PromotionBanner: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/banner/all"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ApiResponse = await response.json();

        if (data.responseCode === 101000) {
          setBanners(data.data);
        } else {
          setError("Failed to fetch banners");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="relative bg-white text-center p-4 mb-4 rounded-lg shadow-md">
        <p className="text-gray-500">Loading promotions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-white text-center p-4 mb-4 rounded-lg shadow-md">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="container mx-auto relative bg-white text-center p-4 mb-4 rounded-lg shadow-md text-lg font-bold"
        >
          <div className="absolute top-2 right-2 flex items-center justify-center bg-red-500 text-white p-2 rounded-full">
            <TagFilled className="text-2xl" />
          </div>
          {banner.description}
        </div>
      ))}
    </>
  );
};

export default PromotionBanner;
