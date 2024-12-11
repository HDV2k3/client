import Image from "next/image";

type Props = {
  data: any;
};

const ExperienceCard: React.FC<any> = ({ title, description, postImages }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-20">
      <Image
        src={postImages[0]?.urlImagePost || "/placeholder.jpg"}
        alt={title}
        // height={1000}
        // width={1000}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const Content = ({ data }: Props) => {
  return (
    <div className="rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4">Thị trường và xu hướng</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((exp: any) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div> */}
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
