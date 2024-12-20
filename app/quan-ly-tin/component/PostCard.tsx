import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, Image, Select, notification } from "antd";
import { useRouter } from "@/hooks/useRouter";
import { convertTimestampToDate } from "@/utils/formatDate";
import { convertToVND } from "@/utils/convertToVND";
import { plans } from "@/constants/adsPlan";
const { Option } = Select;

interface PostCardProps {
  post: Room;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAds, setIsSeletedAds] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(
    post?.remainingFeaturedTime || 0
  );
  const [isReadPost, setIsReadPost] = useState<number>(post.index);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const formattedRemainingTime = useMemo(() => {
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const formatDays = (seconds: number) => {
      const days = Math.floor(seconds / (24 * 3600));
      return `${days} ngày`;
    };

    return remainingTime >= 24 * 3600
      ? `Thời gian quảng cáo còn lại: ${formatDays(remainingTime)}`
      : `Thời gian quảng cáo còn lại: ${formatTime(remainingTime)}`;
  }, [remainingTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime: any) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEdit = () => router.push(`/dang-tin/${post?.id}/update`);

  const handleCreatePakage = async (dto: any, tokena: any) => {
    try {
      const token = localStorage.getItem("token");
      const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/featured/create?typePackage=${dto?.typePackage}&roomId=${dto?.roomId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data.ok) {
        setRemainingTime(data?.data?.remainingFeaturedTime || remainingTime);
        setIsReadPost(data?.data?.index);
        notification.success({
          message:
            "Tạo quảng cáo cho bài viết thành công, cảm ơn bạn đã sử dụng dịch vụ",
        });
      }
    } catch (e) {
      throw e;
    }
  };
  const handleAds = async () => {
    const token = localStorage.getItem("token");
    const typePackage = selectedAds;
    Modal.confirm({
      title: "Xác nhận sử dụng gói quảng cáo",
      content:
        "Bạn đang chọn gói quảng cáo. Bạn có chắc chắn muốn tiếp tục không?",
      onOk: async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/userPayment/getUserPayment`;
          const dataResponseBalance = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const dataBalance = await dataResponseBalance.json();
          const balance = dataBalance?.data?.balance;

          const price =
            typePackage === 1
              ? 10000
              : typePackage === 2
              ? 50000
              : typePackage === 3
              ? 189000
              : 0;

          if (balance < price) {
            Modal.confirm({
              title: "Không đủ tiền thanh toán",
              content: "Bạn có muốn nạp thêm tiền vào để tiếp tục?",
              onOk() {
                router.push("/deposit");
              },
              onCancel() {
                notification.info({
                  message: "Kết thúc quá trình tạo quảng cáo",
                });
                return;
              },
            });
            return;
          }
          const dto = {
            roomId: post?.roomId,
            typePackage: selectedAds,
          };
          await handleCreatePakage(dto, token);
        } catch (error) {
          console.error("Tạo quảng cáo thất bại:", error);
          notification.error({
            message: "Lỗi quá trình tạo quảng cáo",
          });
        }
      },
      onCancel() {
        notification.info({ message: "Đã huỷ quá trình đăng quảng cáo" });
        return;
      },
    });
  };
  const handleSubmitAdvertisement = async () => {
    try {
      const typePackage = selectedAds;
      if (typePackage && typePackage !== 0) await handleAds();
      else return;
    } catch (error) {
      console.error("Room update ads failed:", error);
      notification.error({
        message: "Failed to update ads room.",
      });
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow h-[auto] ">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 20, fontWeight: 700 }}>
                Tiêu đề bài viết:{" "}
              </span>
              <span style={{ fontSize: 20, marginLeft: 5, fontWeight: 500 }}>
                {post.title}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}> Giá tiền: </span>
              <span style={{ marginLeft: 5, fontWeight: 500 }}>
                {convertToVND(post?.pricingDetails?.basePrice)}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>
                Giá tiền khuyến mãi:
              </span>
              <span style={{ marginLeft: 5, fontWeight: 500 }}>
                {convertToVND(post.fixPrice || 0)}
              </span>
            </div>
            <div className="flex">
              <span style={{ fontSize: 14, fontWeight: 700 }}>Nội dung:</span>
              <p
                style={{
                  marginLeft: 5,
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.description}
              </p>
            </div>
          </div>
          <div className="flex">
            {remainingTime > 0 && (
              <span className="px-3 py-1 ml-3 text-sm bg-blue-100 text-blue-800 rounded-full">
                {formattedRemainingTime}
              </span>
            )}
            <span
              onClick={handleEdit}
              className="ml-[10px] px-3 py-1 cursor-pointer rounded-full text-sm bg-yellow-100 text-gray-800 mr-[10px]"
            >
              Edit
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                post.status === "ACTIVE"
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

        <div className="flex flex-col mt-4  text-gray-500">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Ngày đăng:</span>
            <span style={{ marginLeft: 5, fontWeight: 500 }}>
              {convertTimestampToDate(post.createdDate)}
            </span>
          </div>

          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Số thứ tự hiển thị:</span>
            <span style={{ marginLeft: 5, fontWeight: 500 }}>{isReadPost}</span>
          </div> */}

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Người đăng:</span>
            <span style={{ marginLeft: 5, fontWeight: 500 }}>
              {post.createdBy}
            </span>
          </div>
        </div>

        <Button className="mt-[10px]" onClick={showModal}>
          Xem ảnh
        </Button>

        {post.status === "ACTIVE" && (
          <div className="mt-[10px]">
            <span style={{ fontSize: 16 }} className="text-lg font-semibold">
              Chạy quảng cáo cho bài đăng này
            </span>
            <Select
              placeholder="Chương trình quảng cáo "
              className="w-full"
              style={{ height: "70px", fontSize: "16px", borderRadius: "8px" }}
              onChange={(value) => setIsSeletedAds(value)}
            >
              <Option
                value={0}
                style={{
                  height: "60px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 10px",
                }}
              >
                <p style={{ fontWeight: 700, fontSize: "16px" }}>
                  Không sử dụng quảng cáo
                </p>
              </Option>

              {plans.map((item: any) => (
                <Option
                  key={item?.index}
                  value={item?.index}
                  style={{
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <div style={{ display: "flex", marginBottom: "8px" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#333",
                          flexShrink: 0,
                        }}
                      >
                        {item?.title}:
                      </p>
                      <p
                        style={{
                          marginLeft: "10px",
                          margin: 0,
                          fontSize: "14px",
                          color: "#333",
                          flexShrink: 0,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#1e3a8a",
                        fontWeight: "bold",
                        lineHeight: "1.4",
                      }}
                    >
                      {item.price}
                    </h3>
                  </div>
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={handleSubmitAdvertisement}
              className="mt-4"
              disabled={selectedAds === 0}
            >
              Đặt quảng cáo
            </Button>
          </div>
        )}
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
          {post?.roomInfo?.postImages.map((image, index) => (
            <Image
              key={index}
              src={image.urlImagePost}
              alt={`Image ${index + 1}`}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default PostCard;
