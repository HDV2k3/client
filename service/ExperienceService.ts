"use client";

const fetchExpById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/experience/get/${id}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
    throw error;
  }
};
const fetchAllExp = async (page: number, size: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/experience/all?page=${page}&size=${size}`
    );
    const data = await response.json();
    console.log(data.data.data);
    
    return data.data.data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
    throw error;
  }
};

export { fetchExpById, fetchAllExp };
