"use client";
import { FormatDescription } from "@/components/FormatDescription";
import Loading from "@/components/Loading";
import { useExperienceDetail } from "@/hooks/useExperience";
import { fetchAllExp } from "@/service/ExperienceService";
import { News } from "@/types/New";
import { converStringToSlug, getIdBySlug } from "@/utils/converStringToSlug";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewExperinceDetail() {
  const params = useParams();
  const id = getIdBySlug(params?.id as string);
  const { newData, isLoading, isError } = useExperienceDetail(id as string);
  const [allData, setAllData] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllExp(1, 10);
      setAllData(data);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />; // Hiển thị loading component khi dữ liệu đang tải
  }

  if (isError) {
    return <p className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu.</p>; // Hiển thị lỗi nếu có
  }

  if (!newData) {
    return <p className="text-gray-500">Không có dữ liệu để hiển thị.</p>; // Trường hợp không có data
  }

  const { title, description, postImages } = newData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description.slice(0, 150)} />
        <meta
          name="keywords"
          content="Realty Holdings, bài viết, bất động sản"
        />
      </Head>
      <div className="flex">
        <div className="max-w-3xl p-4 bg-background text-foreground">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>Được đăng bởi Huỳnh Đắc Việt</span>
            <span className="mx-2">•</span>
            <span>Cập nhật lần cuối vào 11/12/2024 10:50</span>
            <span className="mx-2">•</span>
            <span className="text-[#1e3a8a] font-semibold">
              Đọc trong khoảng 5 phút
            </span>
          </div>
          {postImages?.length > 0 && (
            <Image
              src={postImages[0].urlImagePost}
              width={1000}
              height={1000}
              alt={postImages[0].name}
              className="rounded-lg mb-4"
            />
          )}
          <em className="text-sm text-muted-foreground text-center block">
            {postImages[0]?.name}
          </em>
          <FormatDescription description={description} />
        </div>
        <div className="bg-background ">
          <div className="border-[#eff1f5]-400 border m-2 p-2 rounded-[8px] sticky top-5">
            <h2 className="text-xl font-semibold my-2">
              Bài viết được xem nhiều nhất
            </h2>
            <div className="h-[2px] w-full bg-[#eff1f5]"></div>
            <ol className="my-4">
              {allData.map((item: any) => (
                <>
                  <li key={item.id} className="my-2 font-semibold hover:text-[#1e3a8a]">
                    <Link
                      key={id}
                      href={`/experience/${converStringToSlug(item.title)}-${
                        item.id
                      }.html`}
                    >
                      {item.title}
                    </Link>
                  </li>
                  <div className="h-[2px] w-full bg-[#eff1f5]"></div>
                </>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
