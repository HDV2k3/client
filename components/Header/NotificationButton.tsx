import { useState } from "react";
import { Button, Tooltip } from "antd";
import { BellOutlined } from "@ant-design/icons";
import NotificationModal from "../modal/NotificationModal"; // Adjust the import path as needed

type Props = {
  viewportWidth?: number;
};

const NotificationButton = ({ viewportWidth = 1024 }: Props) => {
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
          style={{ color: viewportWidth < 1000 ? "black" : "#FFF" }}
          onClick={handleOpenModal}
        >
          {viewportWidth < 700 && <span>Thông báo</span>}
        </Button>
      </Tooltip>

      {/* Conditionally render NotificationModal */}
      {isModalOpen && (
        <NotificationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NotificationButton;
