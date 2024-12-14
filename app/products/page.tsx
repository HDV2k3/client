"use client";
import React from "react";
import { Card, Row, Col, Tag, Typography, Divider } from "antd";
import { PhoneOutlined, WifiOutlined, HomeOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const RoomListing = () => {
  // Data mẫu cho các phòng
  const rooms = [
    {
      id: 1,
      name: "Phòng Nghỉ Gần Bệnh Viện Chợ Rẫy",
      image:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/marketing%2F000a888e-c553-4727-9bec-dd686df05405_458920372_1218988892667038_8221875161629353613_n.jpg?alt=media&token=c0dc2af3-4fc2-4628-8130-de248b6bb3e1",
      description:
        "Phòng đầy đủ tiện nghi, có máy lạnh, cách bệnh viện 5 phút đi bộ. Phù hợp cho bệnh nhân và người nhà đi khám.",
      price: "30.000đ/ngày",
      contact: "0901234567",
      location: "Quận 5",
      amenities: ["Máy lạnh", "WiFi", "Tủ lạnh", "Nước nóng"],
    },
    {
      id: 2,
      name: "Phòng Trọ Gần Bệnh Viện 115",
      image:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/marketing%2F009c48b9-fb2e-41a4-931e-3d308f33295a_458912008_4224014664513771_5526694429572879032_n.jpg?alt=media&token=5033e80c-9211-4662-8935-08428feb1182",
      description:
        "Phòng sạch sẽ, thoáng mát, có nhà bếp riêng. Gần chợ và tiện di chuyển.",
      price: "50.000đ/ngày",
      contact: "0909876543",
      location: "Quận 10",
      amenities: ["Quạt máy", "WiFi", "Nhà bếp"],
    },
    {
      id: 3,
      name: "Nhà Nghỉ Gần Bệnh Viện Ung Bướu",
      image:
        "https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/marketing%2F01e37a77-cebf-4fd3-9111-34506e2a2930_458728232_1691699091565618_8958733197005373296_n.jpg?alt=media&token=364fc0df-71d2-4697-a0b9-41b32a91bc16",
      description:
        "Phòng rộng rãi, có thể ở 3-4 người, đầy đủ tiện nghi sinh hoạt.",
      price: "40.000đ/ngày",
      contact: "0908765432",
      location: "Bình Thạnh",
      amenities: ["Máy lạnh", "TV", "Tủ lạnh", "Phòng tắm riêng"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">
        Phòng Cho Thuê Hỗ Dành Cho Bệnh Nhân Ở Ngắn Hạn
      </Title>

      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col xs={24} md={12} lg={8} key={room.id}>
            <Card
              hoverable
              cover={
                <Image
                  alt={room.name}
                  src={room.image}
                  className="h-48 object-cover"
                  width={400} // Add a width prop to specify the image width
                  height={300} // Add a height prop to specify the image height
                />
              }
              className="h-full"
            >
              <Meta
                title={
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{room.name}</span>
                  </div>
                }
                description={
                  <>
                    <div>
                      <span className="text-sm">
                        Hỗ trợ 70% cho người nhà khám bệnh từ tỉnh lẽ vào Tp.HCM
                        với
                      </span>
                      <Tag color="green">{room.price}</Tag>
                    </div>
                    <Tag color="blue" className="mb-2">
                      <HomeOutlined className="mr-1" />
                      {room.location}
                    </Tag>

                    <Paragraph className="mb-3" ellipsis={{ rows: 2 }}>
                      {room.description}
                    </Paragraph>

                    <div className="mb-3">
                      {room.amenities.map((amenity, index) => (
                        <Tag key={index} className="mb-1 mr-1">
                          <WifiOutlined className="mr-1" />
                          {amenity}
                        </Tag>
                      ))}
                    </div>

                    <Divider className="my-2" />

                    <div className="flex items-center text-blue-600">
                      <PhoneOutlined className="mr-2" />
                      <span className="font-medium">{room.contact}</span>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RoomListing;
