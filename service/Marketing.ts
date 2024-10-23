import { Page } from "../stories/Page";
// service/Marketing.ts

export const fetchPostsByPage = async (page: number, pageSize: number) => {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NmM1YzJlNmJhZjdmMjJhYmU4NzdmZDIiLCJleHAiOjE3MjQ3NDgzODUsImlhdCI6MTcyNDc0NDc4NSwianRpIjoiZmUyNTk4MjMtMmNjOC00NTNjLTgwM2YtZmNkZjkzZjJjNjllIiwic2NvcGUiOiJST0xFX0FETUlOIn0.n7L5n3UqIaP9YCVS89q0SFvkuJ2UYKrEHViEFl3HREO_aplFWM29oHq08pmmZPgouG_hCsQKljU06So7pUoU_Q"; // Replace with your actual token

  const response = await fetch(
    `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/search?page=${page}&size=${pageSize}`,
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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/list-post-featured?page=${page}&size=${size}`
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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/all?page=${page}&size=${size}`

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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/list-post-promotional?page=${page}&size=${size}`
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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/post-by-id/${id}`
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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/searching?page=${page}&size=${size}`,
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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/searching?page=${page}&size=${size}`,
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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/post-promotional-by-id/${id}`
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
      `http://next-room-cicd-env.eba-duriufh6.ap-southeast-2.elasticbeanstalk.com/marketing/post/filter-post?page=${page}&size=${size}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};