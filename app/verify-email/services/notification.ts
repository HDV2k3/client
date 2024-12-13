import { Modal, notification } from "antd";
import { MESSAGES } from "./message";

type NotificationType = "success" | "error" | "info" | "warning";

export const notificationServiceVerify_Email = {
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
    notificationServiceVerify_Email.show(
      "success",
      "chuyển trang thành công",
      `Chúc bạn có một trải nghiệm tuyệt vời với chúng tôi.`
    );
  },
  // verifyError: () => {
  //   notificationServiceVerify_Email.show(
  //     "error",
  //     "chuyển trang thất bại",
  //     "Vui lòng thử lại hoặc liên hệ với nhân viên hỗ trợ."
  //   );
  // },
};
