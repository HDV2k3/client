import Image from "next/image";
import { Carousel } from "antd";
import Link from "next/link";
import { converStringToSlug } from "@/utils/converStringToSlug";

type Props = {
  data: any;
};

const ExperienceCard: React.FC<any> = ({ id,title, description, postImages }) => {
  // Giới hạn mô tả chỉ lấy 100 ký tự
  const truncatedDescription = description.length > 50 ? (
    <>
      {description.slice(0, 170)}{" "}
      <Link href={`/news/${converStringToSlug(title)}-${id}.html`} className="text-blue-500 underline">
        Đọc tiếp
      </Link>
    </>
  ) : (
    description
  );
  return (
    <Link key={id} href={`/news/${converStringToSlug(title)}-${id}.html`}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="relative h-40">
        <Image
          src={postImages[0]?.urlImagePost || "/placeholder.jpg"}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{truncatedDescription}</p>
      </div>
    </div>
    </Link>
  );
};

const Content = ({ data }: Props) => {
  return (
    <div className="rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4">Thị trường và xu hướng</h2>
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
        {data.map((exp: any) => (
          <div key={exp.id} className="px-2">
            <ExperienceCard {...exp} />
          </div>
        ))}
      </Carousel>
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