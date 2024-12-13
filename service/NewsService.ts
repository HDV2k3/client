"use client";

import { News, NewsItem } from "@/types/New";

const fetchNewById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/news/get-news/${id}`
    );
    const data = (await response.json()) 
  
    return data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
    throw error;
  }
};
const fetchAllNew = async (page: number, size: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/news/all?page=${page}&size=${size}`
    );
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
    throw error;
  }
};

export { fetchNewById, fetchAllNew };
