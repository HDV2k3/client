import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const contentStyle: React.CSSProperties = {
  position: "relative", // Needed for positioning child elements
  height: "235px", // Set a fixed height for the carousel
  overflow: "hidden", // Hide any overflowing content
  background: "#364d79", // Fallback background color
  borderTopLeftRadius:"5px",
  borderTopRightRadius:"5px"
};

const Courasel: React.FC = () => (
  <Carousel autoplay>
    <div>
      <div style={contentStyle}>
        <Image
          src="https://cdn.chotot.com/admincentre/NwnWDNBqaoWZcnuwuyLyzYd_mi_sXSWHItLlznLccNQ/preset:raw/plain/be8e7a74e3bc38d9eeb295d093e159e6-2897960228213031146.jpg"
          alt="Image 1"
          layout="fill" // Use "fill" to cover the height and maintain aspect ratio
          objectFit="cover" // Maintain aspect ratio
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <Image
          src="https://cdn.chotot.com/admincentre/dpGomFinXyth18yNEYSNFXn9C0GIzJTXNXk5dMMDGVo/preset:raw/plain/e02d6bed45d1b6ba4573467e5c912d2d-2898726070622689177.jpg"
          alt="Image 2"
          layout="fill" // Use "fill" to cover the height and maintain aspect ratio
          objectFit="cover" // Maintain aspect ratio
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <Image
          src="https://cdn.chotot.com/admincentre/Z0oYS7-id7LhKsbphvoN-BRhItJvw5zakBy_1bz6L7w/preset:raw/plain/7bcddfbb49235ce249f8260d35080983-2895290726205495897.jpg"
          alt="Image 3"
          layout="fill" // Use "fill" to cover the height and maintain aspect ratio
          objectFit="cover" // Maintain aspect ratio
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <Image
          src="https://cdn.chotot.com/admincentre/rvpnVZjnzFI2jeuMUCoRzCmURhmGOc-LloavxJor0Es/preset:raw/plain/8cedb8b4d42383c1237476c53132766c-2890455791036815802.jpg"
          alt="Image 4"
          layout="fill" // Use "fill" to cover the height and maintain aspect ratio
          objectFit="cover" // Maintain aspect ratio
        />
      </div>
    </div>
  </Carousel>
);

export default Courasel;
