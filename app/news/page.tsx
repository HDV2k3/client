"use client";
import NewsCard from "@/components/NewsCard";
import { fetchAllNew } from "@/service/NewsService";
import { News } from "@/types/New";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [allData, setAllData] = useState<News[]>([]);
  const fetchData = async () => {
    const data = await fetchAllNew(1, 10);
    setAllData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {allData.map((news, index) => (
        <NewsCard key={index} data={news} />
      ))}
    </div>
  );
}
