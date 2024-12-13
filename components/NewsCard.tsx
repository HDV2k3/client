import Image from "next/image";
import React from "react";
import Link from "next/link";
import { converStringToSlug } from "@/utils/converStringToSlug";

export default function NewsCard({ data }: { data: any }) {
  const { id, title, description, postImages } = data;
  const truncatedDescription =
    description.length > 50 ? (
      <>
        {description.slice(0, 170)}{" "}
        <Link
          href={`/news/${converStringToSlug(title)}-${id}.html`}
          className="text-blue-500 underline"
        >
          Đọc tiếp
        </Link>
      </>
    ) : (
      description
    );
  return (
    <div>
      <div className="my-6 sm:my-8">
        <div
          className="bg-white flex flex-row items-center justify-start gap-5 shadow-lg rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:cursor-pointer "
          title="Căn Hộ Chung Cư Các Thị Trường Về Tình Phía Nam"
        >
          <div className="sm:h-[250px]">
            <Image
              src={postImages[0].urlImagePost}
              alt="Căn Hộ Chung Cư Các Thị Trường Về Tình Phía Nam"
              height={500}
              width={600}
              priority
              className="rounded-l-lg sm:h-full"
            />
          </div>
          <div className="p-4">
            <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              {title}
            </h1>
            <time
              dateTime="2024-12-13T14:10"
              className="text-sm text-zinc-600 dark:text-zinc-400"
            >
              13/12/2024 14:10 - Tin tức
            </time>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              {truncatedDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
