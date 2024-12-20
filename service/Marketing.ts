// service/Marketing.ts
import axios from "axios";
import queryString from "query-string";

export const fetchPostsByPage = async (page: number, pageSize: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/search?page=${page}&size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch room posts");
  }

  const data = await response.json();
  return data;
};
export const fetchPostsFeaturedByPage = async (page: number, size: number) => {
  try {
    const timestamp = new Date().getTime(); // Lấy timestamp hiện tại
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/list-post-featured?page=${page}&size=${size}&_=${timestamp}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};

export const fetchPostsAllByPage = async (page: number, size: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/all?page=${page}&size=${size}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};
export const fetchPostsPromotionalByPage = async (
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/all?page=${page}&size=${size}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};
export const fetchPostsById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-by-id/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};
export const fetchPostsSamePrice = async (
  basePrice: number,
  page: number,
  size: number
) => {
  try {
    const requestBody = {
      basePrice: basePrice.toFixed(2),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/searching?page=${page}&size=${size}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      // Xử lý lỗi nếu phản hồi không thành công
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by price:", error);
    throw error;
  }
};
export const fetchPostsSameDistrict = async (
  address: string,
  page: number,
  size: number
) => {
  try {
    const requestBody = {
      address,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/searching?page=${page}&size=${size}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      // Xử lý lỗi nếu phản hồi không thành công
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by price:", error);
    throw error;
  }
};
export const fetchPostPromotionalById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/post-promotional-by-id/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};
export const fetchPostsByRoomPage = async (page: number, size: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/filter-post?page=${page}&size=${size}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};
export const fetchPostByTypeRoomAndPage = async (
  type: number,
  page: number,
  size: number
) => {
  try {
    const query = queryString.stringify({ type, page, size });
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/fil-type?${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by type and page size:", error);
    throw error;
  }
};
export const fetchInfoRooms = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/info-marketing`;
    const response = await fetch(url);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Error fetching posts by type and page size:", error);
    throw error;
  }
};
