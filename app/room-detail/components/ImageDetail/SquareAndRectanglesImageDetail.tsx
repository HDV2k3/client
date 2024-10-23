import React, { useState } from "react";
import styles from "./styles/SquareAndRectanglesImageDetail.module.css";
import { Button, Image, Modal } from "antd";

interface Room {
  roomInfo: {
    postImages: {
      urlImagePost: string;
    }[];
  };
}

interface IProps {
  room: Room;
}

const SquareAndRectanglesImageDetail: React.FC<IProps> = ({ room }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const images = room.roomInfo.postImages;
  console.log(images);

  const imageCount = images.length;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (imageCount >= 3) {
    return (
      <div className="flex gap-2">
        {/* Hình vuông */}
        <div className={styles.square}>
          <Image
            src={room.roomInfo.postImages[0].urlImagePost}
            alt="Square image"
            style={{
              width: "500px",
              height: "520px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </div>
        {/* Các hình chữ nhật */}
        <div className={styles.rectangles}>
          {/* //trên */}
          <div className={`mb-4 ${styles.rectangle}`}>
            <Image
              src={room.roomInfo.postImages[1].urlImagePost}
              alt="Rectangle image"
              style={{
                width: "1200px",
                height: "252px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
          {/* //dưới */}
          <div className={styles.rectangle}>
            <Image
              src={room.roomInfo.postImages[2].urlImagePost}
              alt="Rectangle image"
              style={{
                width: "1200px",
                height: "252px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            {/* Button at the bottom-right corner of the third image */}
            <div className={styles.buttonContainerThreeImages}>
              <Button className={styles.btn} onClick={showModal}>
                Hiển thị thêm ảnh
              </Button>
            </div>
          </div>
        </div>
        <Modal
          title="Tất cả hình ảnh"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="80%"
          bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.urlImagePost}
                alt={`Image ${index + 1}`}
                style={{
                  width: "w-full",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        </Modal>
      </div>
    );
  }

  if (imageCount >= 2) {
    return (
      <div className="flex gap-1 ">
        {/* Hình vuông */}
        <div className={styles.square1}>
          <Image
            src={room.roomInfo.postImages[0].urlImagePost}
            alt="Square image"
            style={{
              width: "500px",
              height: "500px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Các hình chữ nhật */}
        <div className={styles.rectangles}>
          <div className={styles.rectangle}>
            <Image
              src={room.roomInfo.postImages[1].urlImagePost}
              alt="Rectangle image"
              style={{
                width: "610px",
                height: "500px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <div className={styles.buttonContainerTwoImages}>
              <Button className={styles.btn1} onClick={showModal}>
                Hiển thị thêm ảnh
              </Button>
            </div>
          </div>
        </div>
        <Modal
          title="Tất cả hình ảnh"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="80%"
          bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.urlImagePost}
                alt={`Image ${index + 1}`}
                style={{
                  width: "w-full",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        </Modal>
      </div>
    );
  }

  if (imageCount === 1) {
    return (
      <div className="flex gap-2 ">
        {/* Hình vuông */}
        <div className={styles.square2}>
          <Image
            src={room.roomInfo.postImages[0].urlImagePost}
            alt="Square image"
            style={{
              width: "1200px",
              height: "500px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default SquareAndRectanglesImageDetail;
