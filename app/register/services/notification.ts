import { Modal, notification } from "antd";
import { MESSAGES } from "./message";

type NotificationType = "success" | "error" | "info" | "warning";

export const notificationServiceRegister = {
  // Hiển thị notification
  show: (type: NotificationType, message: string, description?: string) => {
    notification[type]({
      message,
      description,
    });
  },

  // Hiển thị confirm modal
  showConfirm: (
    title: string,
    content: string,
    onOk: () => Promise<void>,
    onCancel?: () => void
  ) => {
    Modal.confirm({
      title,
      content,
      onOk,
      onCancel,
    });
  },

  createSuccess: () => {
    notificationServiceRegister.show(
      "success",
      "Đăng ký thanh viên  thành công",
      `Vui lòng kiểm tra Email để kích hoạt tài khoản.`
    );
  },
  saveError: () => {
    notificationServiceRegister.show(
      "error",
      "Đăng ký thanh viên thất bại",
      "Không thể Đăng ký thanh viên. Vui lòng thử lại hoặc liên hệ với nhân viên hỗ trợ."
    );
  },
};
