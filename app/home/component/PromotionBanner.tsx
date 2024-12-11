import { TagFilled } from "@ant-design/icons";

type Props = {
  data: any;
}

const PromotionBanner = ({ data }: Props) => {
  return (
    <>
      {data.map((banner: any) => (
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
