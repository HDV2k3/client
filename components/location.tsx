"use client";
import { useLocation } from "@/app/context/LocationContext";
import { useState, useEffect } from "react";

export default function GeoFindMe() {
  const [status, setStatus] = useState<string>("");
  const { setLocation, latitude, longitude } = useLocation();
  const geoFindMe = () => {
    setStatus("Đang xác định vị trí...");

    if (!navigator.geolocation) {
      setStatus("Trình duyệt của bạn không hỗ trợ Geolocation");
      return;
    }

    // Thêm options để yêu cầu độ chính xác cao
    const options = {
      enableHighAccuracy: true, // Yêu cầu độ chính xác cao
      timeout: 5000, // Timeout sau 5 giây
      maximumAge: 0, // Không sử dụng cache
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(lat, lon);
        setStatus(`Đã xác định được vị trí: ${lat}, ${lon}`);

        // Log thêm thông tin để debug
        console.log("Accuracy:", position.coords.accuracy, "meters");
        console.log("Full position object:", position);
      },
      (error) => {
        // Log chi tiết lỗi
        console.error("Geolocation error:", error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setStatus("Người dùng từ chối cung cấp vị trí");
            break;
          case error.POSITION_UNAVAILABLE:
            setStatus("Không có thông tin vị trí");
            break;
          case error.TIMEOUT:
            setStatus("Hết thời gian yêu cầu vị trí");
            break;
          default:
            setStatus("Không thể lấy được vị trí của bạn");
        }
      },
      options
    );
  };

  useEffect(() => {
    geoFindMe();
  }, []);

  return (
    <div>
      <div id="status">{status}</div>
      {latitude && longitude && (
        <div>
          <p>Vĩ độ: {latitude}</p>
          <p>Kinh độ: {longitude}</p>
          <a
            href={`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem bản đồ
          </a>
        </div>
      )}
      {/* Thêm nút để người dùng có thể thử lại */}
      <button
        onClick={geoFindMe}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Lấy lại vị trí
      </button>
    </div>
  );
}
