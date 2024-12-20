"use client";
import { districtsType, findTypeByName } from "@/constants/districts";
import { getDistrictAction } from "@/service/actions/DistrictAction";
import { useCallback, useEffect, useState } from "react";
import TitleRoom from "@/components/TitleRoom";
import MainRoomList from "@/app/home/component/MainRoomList";

export default function RoomsLocation() {
  const [dataPost, setDataPost] = useState<any>();
  const page = 1;
  const size = 10;

  const transformDistrictName = (district: string) => {
    if (!district) return district;

    // Xử lý đặc biệt cho "Thủ Đức" hoặc "Thành phố Thủ Đức"
    const normalizedDistrict = district.toLowerCase();
    if (
      normalizedDistrict.includes("thành phố thủ đức") ||
      normalizedDistrict.includes("thủ đức")
    ) {
      return "TP.Thủ Đức";
    }

    // Tìm quận/huyện phù hợp trong `districtsType`
    const matchedDistrict = districtsType.find(({ name }) =>
      normalizedDistrict.includes(
        name.toLowerCase().replace("quận ", "").replace("huyện ", "")
      )
    );

    if (matchedDistrict) {
      // Thêm "Quận" hoặc "Huyện" nếu thiếu
      if (
        matchedDistrict.name.startsWith("Quận") ||
        matchedDistrict.name.startsWith("Huyện")
      ) {
        return matchedDistrict.name;
      }

      // Thêm từ phù hợp ("Quận" nếu là quận, "Huyện" nếu là huyện)
      const isUrban = ["Quận", "TP.Thủ Đức"].some((prefix) =>
        matchedDistrict.name.toLowerCase().includes(prefix.toLowerCase())
      );
      return isUrban
        ? `Quận ${matchedDistrict.name}`
        : `Huyện ${matchedDistrict.name}`;
    }

    // Trả về giá trị ban đầu nếu không tìm thấy
    return null;
  };

  const handleFetchData = async (district: string) => {
    const results = transformDistrictName(district);
    console.log(results);
    const type = (findTypeByName(results || "TP.Thủ Đức") as number) || 769;
    console.log("Address:", district, "type: ", type);
    const data = await getDistrictAction(type, page, size);
    const rooms = data?.data?.data;
    setDataPost(rooms);
  };
  const fetchLocationDetails = useCallback(async (lat: number, lon: number) => {
    const apiKey = "2957dd5070844700a7c254fce8cef57a";
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("OpenCage API response:", data); // Log dữ liệu trả về từ API

      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted;
        console.log("Formatted address:", formattedAddress);

        const addressParts: string[] = formattedAddress.split(",");
        const district = addressParts[addressParts.length - 3]; // lấy vị trí quận
        console.log("District:", district);

        await handleFetchData(district);
      } else {
        console.error("Error: No results found");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await fetch("/api/location");
      const data = await res.json();

      console.log("Location data: ", data); // Kiểm tra dữ liệu tại đây
      if (res.ok) {
        fetchLocationDetails(data?.lat, data?.lon);
      } else {
        console.error(data.error);
      }
    };

    fetchLocation();
  }, [fetchLocationDetails]);

  return (
    <>
      {dataPost ? (
        <>
          <TitleRoom title={"Danh sách nhà gần bạn"} />
          <MainRoomList data={dataPost} page={page} size={size} />
        </>
      ) : null}
    </>
  );
}
