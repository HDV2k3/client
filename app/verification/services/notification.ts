import { Modal, notification } from "antd";
import { MESSAGES } from "./message";

type NotificationType = "success" | "error" | "info" | "warning";

export const notificationServiceVerify = {
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

  verifySuccess: () => {
    notificationServiceVerify.show(
      "success",
      "Xác thực thành công",
      `Xác thực tài khoản thành công chúc bạn có một trải nghiệm tuyệt vời với chúng tôi.`
    );
  },
  verifyError: () => {
    notificationServiceVerify.show(
      "error",
      "Xác thực thanh viên thất bại",
      "Không thể xác thực thành viên. Vui lòng thử lại hoặc liên hệ với nhân viên hỗ trợ."
    );
  },
};
