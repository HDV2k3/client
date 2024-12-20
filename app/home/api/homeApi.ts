const REVALIDATE_TIME = 3600; // 1 giờ

export async function fetchFeaturedRooms(page: number, size: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/list-post-featured?page=${page}&size=${size}`,
    {
      next: { revalidate: REVALIDATE_TIME },
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch featured rooms");
  }

  return response.json();
}

export async function fetchPromotionalRooms(page: number, size: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/list-post-promotional?page=${page}&size=${size}`,
    {
      next: { revalidate: REVALIDATE_TIME },
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch promotional rooms");
  }

  return response.json();
}
