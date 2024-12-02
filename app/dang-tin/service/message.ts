export const MESSAGES = {
  ROOM: {
    DELETE: {
      CONFIRM: (roomName: string) =>
        `Bạn có chắc chắn muốn xóa phòng "${roomName}" này?`,
      CONFIRM_DESCRIPTION: (roomName: string) =>
        `Phòng ${roomName} sẽ bị xóa vĩnh viễn.`,
      SUCCESS: (roomName: string) =>
        `Phòng ${roomName} đã được xóa thành công.`,
      ERROR: "Đã xảy ra lỗi khi xóa phòng.",
    },
    PROMOTIONAL: {
      DELETE: {
        CONFIRM:
          "Bạn có chắc chắn muốn xóa phòng ra khỏi chương trình khuyến mãi?",
        CONFIRM_DESCRIPTION: (roomName: string) =>
          `Phòng ${roomName} sẽ bị xóa ra khỏi chương trình khuyến mãi.`,
        SUCCESS: (roomName: string) =>
          `Phòng ${roomName} đã được xóa khỏi chương trình khuyến mãi thành công.`,
        ERROR: "Đã xảy ra lỗi khi xóa phòng khỏi chương trình khuyến mãi.",
      },
      ADD: {
        SUCCESS: (roomName: string) =>
          `Phòng ${roomName} đã được thêm vào khuyến mãi thành công.`,
        ERROR: "Đã xảy ra lỗi khi thêm phòng vào khuyến mãi.",
        INVALID_PRICE: "Vui lòng nhập một mức giá hợp lệ.",
      },
    },
  },
};
