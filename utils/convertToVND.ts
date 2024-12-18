export const convertToVND = (amount: number | null): string => {
  if (amount === null || isNaN(amount)) {
    return "0 VNĐ"; // Hoặc bạn có thể trả về một thông báo lỗi tùy ý
  }

  const formattedAmount = amount.toLocaleString("vi-VN");
  return `${formattedAmount} VNĐ`;
};

