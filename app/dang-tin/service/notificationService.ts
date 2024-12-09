
import { Modal, notification } from "antd";
import { MESSAGES } from "./message";


type NotificationType = "success" | "error" | "info" | "warning";

export const notificationService = {
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

  // Các helper methods cho các trường hợp cụ thể
  room: {
    // Confirm delete room
    deleteConfirm: (roomName: string, onDelete: () => Promise<void>) => {
      notificationService.showConfirm(
        MESSAGES.ROOM.DELETE.CONFIRM(roomName),
        MESSAGES.ROOM.DELETE.CONFIRM_DESCRIPTION(roomName),
        onDelete
      );
    },

    // Delete success and error notifications
    deleteSuccess: (roomName: string) => {
      notificationService.show(
        "success",
        "Xóa thành công",
        MESSAGES.ROOM.DELETE.SUCCESS(roomName)
      );
    },

    deleteError: () => {
      notificationService.show(
        "error",
        "Xóa thất bại",
        MESSAGES.ROOM.DELETE.ERROR
      );
    },

    // Promotional room actions
    promotional: {
      deleteConfirm: (roomName: string, onDelete: () => Promise<void>) => {
        notificationService.showConfirm(
          MESSAGES.ROOM.PROMOTIONAL.DELETE.CONFIRM,
          MESSAGES.ROOM.PROMOTIONAL.DELETE.CONFIRM_DESCRIPTION(roomName),
          onDelete
        );
      },

      deleteSuccess: (roomName: string) => {
        notificationService.show(
          "success",
          "Xóa khuyến mãi thành công",
          MESSAGES.ROOM.PROMOTIONAL.DELETE.SUCCESS(roomName)
        );
      },

      deleteError: () => {
        notificationService.show(
          "error",
          "Xóa khuyến mãi thất bại",
          MESSAGES.ROOM.PROMOTIONAL.DELETE.ERROR
        );
      },

      addSuccess: (roomName: string) => {
        notificationService.show(
          "success",
          "Thêm khuyến mãi thành công",
          MESSAGES.ROOM.PROMOTIONAL.ADD.SUCCESS(roomName)
        );
      },

      addError: () => {
        notificationService.show(
          "error",
          "Thêm khuyến mãi thất bại",
          MESSAGES.ROOM.PROMOTIONAL.ADD.ERROR
        );
      },

      invalidPrice: () => {
        notificationService.show(
          "error",
          "Lỗi",
          MESSAGES.ROOM.PROMOTIONAL.ADD.INVALID_PRICE
        );
      },
    },

    // Featured room actions
    featured: {
      addSuccess: (roomName: string) => {
        notificationService.show(
          "success",
          "Thêm phòng nổi bật thành công",
          `${roomName} đã được thêm vào danh sách nổi bật.`
        );
      },
      addError: () => {
        notificationService.show(
          "error",
          "Thêm phòng nổi bật thất bại",
          "Không thể thêm phòng vào danh sách nổi bật."
        );
      },
      removeSuccess: (roomName: string) => {
        notificationService.show(
          "success",
          "Xóa phòng nổi bật thành công",
          `${roomName} đã được xóa khỏi danh sách nổi bật.`
        );
      },
      removeError: () => {
        notificationService.show(
          "error",
          "Xóa phòng nổi bật thất bại",
          "Không thể xóa phòng khỏi danh sách nổi bật."
        );
      },
    },

    // New Room actions - Create and Save Room Success
    createSuccess: (roomName: string) => {
      notificationService.show(
        "success",
        "Tạo phòng thành công",
        `Phòng "${roomName}" đã được tạo thành công.`
      );
    },

    saveSuccess: (roomName: string) => {
      notificationService.show(
        "success",
        "Lưu phòng thành công",
        `Thông tin phòng "${roomName}" đã được lưu thành công.`
      );
    },

    saveError: () => {
      notificationService.show(
        "error",
        "Lưu phòng thất bại",
        "Không thể lưu thông tin phòng. Vui lòng thử lại."
      );
    },
  },
};
