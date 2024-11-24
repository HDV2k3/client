
// service/Marketing.ts

import { API_MARKETING } from "./constants";

export const fetchPostsByPage = async (page: number, pageSize: number) => {
  const token = localStorage.getItem("token")
  const response = await fetch(
    `${API_MARKETING}/post/search?page=${page}&size=${pageSize}`,
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
    const response = await fetch(
      `${API_MARKETING}/post/list-post-featured?page=${page}&size=${size}`
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
      `${API_MARKETING}/post/all?page=${page}&size=${size}`

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
      `${API_MARKETING}/post/list-post-promotional?page=${page}&size=${size}`
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
      `${API_MARKETING}/post/post-by-id/${id}`
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
      `${API_MARKETING}/post/searching?page=${page}&size=${size}`,
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
      `${API_MARKETING}/post/searching?page=${page}&size=${size}`,
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
      `${API_MARKETING}/post/post-promotional-by-id/${id}`
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
      `${API_MARKETING}/post/filter-post?page=${page}&size=${size}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};