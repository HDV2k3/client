import React, { useState } from "react";
import { Button, Modal, Image, Input, message } from "antd";
import { useRouter } from '@/hooks/useRouter';
interface PostCardProps {
  post: Room;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Room | null>(null);

  const [advertisementBudget, setAdvertisementBudget] = useState<number>(0);
  const [advertisementDays, setAdvertisementDays] = useState<number>(0);

  const showModal = (post: Room) => {
    setSelectedPost(post); // Lưu bài đăng đã chọn
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAdvertisementBudget(value);
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAdvertisementDays(value);
  };

  const calculateSuggestedPrice = () => {
    // Ví dụ: Giả sử 1 ngày quảng cáo có giá 10.000 VNĐ
    const suggestedPrice = advertisementDays * 10000;
    return suggestedPrice;
  };

  const handleSubmitAdvertisement = () => {
    const suggestedPrice = calculateSuggestedPrice();
    if (advertisementBudget < suggestedPrice) {
      message.error("Số tiền không đủ cho số ngày quảng cáo yêu cầu.");
      return;
    }
    message.success(
      `Quảng cáo của bạn đã được lên lịch với số tiền: ${advertisementBudget} VNĐ.`
    );
  };

  const handleEdit = () => router.push(`/quan-ly-tin/edit/${post?.id}`)

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <h3 className="text-lg font-semibold">
            Giá tiền: {post.pricingDetails.basePrice} VNĐ
          </h3>
          <h3 className="text-lg font-semibold">
            Giá tiền khuyến mãi: {post.fixPrice} VNĐ
          </h3>
          <p
            style={{
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            className="text-gray-600 mt-2"
          >
            {post.description}
          </p>
        </div>
        <div className="flex">
          <span onClick={handleEdit} className="px-3 py-1 cursor-pointer rounded-full text-sm bg-yellow-100 text-gray-800 mr-[10px]" >Edit</span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${post.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : post.status === "EXPIRED"
                ? "bg-gray-100 text-gray-800"
                : post.status === "REJECTED"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
          >
            {post.status}
          </span>
        </div>

      </div>

      <div className="flex gap-4 mt-4 text-sm text-gray-500">
        <span>Ngày đăng: {post.createdDate}</span>
        <span>số thứ tự hiển thị: {post.index}</span>
        <span>Người đăng: {post.createdBy}</span>
      </div>

      <Button onClick={() => showModal(post)}>Xem ảnh</Button>

      <Modal
        title="Tất cả hình ảnh"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        bodyStyle={{ maxHeight: "70vh", overflow: "auto" }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {selectedPost?.roomInfo?.postImages.map((image, index) => (
            <Image
              key={index}
              src={image.urlImagePost}
              alt={`Image ${index + 1}`}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      </Modal>

      {/* Quảng cáo */}
      {post.status === "ACTIVE" && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Chạy quảng cáo cho bài đăng này
          </h3>
          <div className="flex gap-4 mt-2">
            <Input
              type="number"
              placeholder="Nhập số ngày"
              value={advertisementDays}
              onChange={handleDaysChange}
              className="w-1/3"
            />
          </div>
          <div className="mt-2 text-gray-600">
            <p>Giá cho mỗi ngày quảng cáo là 10.000 VNĐ.</p>
            <p>
              Tổng tiền cho {advertisementDays} ngày quảng cáo:{" "}
              {calculateSuggestedPrice()} VNĐ
            </p>
          </div>
          <Button
            type="primary"
            onClick={handleSubmitAdvertisement}
            className="mt-4"
          >
            Đặt quảng cáo
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
