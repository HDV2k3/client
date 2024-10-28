import { useState } from "react";
import { Button, Tooltip } from "antd";
import { BellOutlined } from "@ant-design/icons";
import NotificationModal from "../modal/NotificationModal"; // Đường dẫn đến NotificationModal

const NotificationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <Tooltip title="Thông báo">
        <Button
          type="text"
          icon={<BellOutlined />}
          style={{ color: "#FFF" }}
          onClick={handleOpenModal}
        />
      </Tooltip>

      {/* Gọi NotificationModal và truyền trạng thái mở */}
      <NotificationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default NotificationButton;
