import { isToday, isYesterday, formatDistanceToNow } from 'date-fns';
// utils/dateUtils.ts


export const getFormattedDate = (timestamp: number): string => {
  // Chuyển đổi từ giây sang milliseconds
  const date = new Date(timestamp * 1000);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ"; // Nếu ngày không hợp lệ
  }

  if (isToday(date)) {
    const hoursAgo = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    return `Vừa đăng ${hoursAgo} giờ trước`;
  } else if (isYesterday(date)) {
    return `Hôm qua`;
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
};
