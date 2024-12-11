import { Carousel } from "antd";
import Image from "next/image";

const contentStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  background: "#364d79",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
};

type Props = {
  data?: any;
}
const Courasel = ({ data }: Props) => {
  if (!data) {
    return (
      <div style={contentStyle} className="flex items-center justify-center">
        <div className="text-white">Fetch data Courasel Error</div>
      </div>
    );
  }

  return (
    <Carousel autoplay className="container my-3 mx-auto">
      {data[0]?.postImages.map((image: any, index: any) => (
        <div key={image.name}>
          <div style={contentStyle} className="h-fit">
            <Image
              src={image.urlImagePost}
              alt={`Image ${index + 1}`}
              // objectFit="contain"
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
