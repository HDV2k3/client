// const fetchCarouselData = async () => {
//     try {
//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/carousel/all`
//         );

//         if (!response.ok) {
//             throw new Error("Failed to fetch carousel data");
//         }
//         const data: any = await response.json();
//         if (data.responseCode === 101000) {
//             return data?.data;
//         } else {
//             throw new Error(data.message || "Failed to fetch carousel data");
//         }
//     } catch (e) { console.error(e); }
// }

// const fetchPromotionBannerAction = async () => {
//     try {
//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/banner/all`
//         );
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         const data: any = await response.json();

//         if (data.responseCode === 101000) {
//             return data?.data;
//         } else {
//         }
//     } catch (e) { console.error(e); }
// }

// const fetchHomeNewAction = async () => {
//     try {
//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/news/all`
//         );
//         const data: any = await response.json();
//         // Kiểm tra responseCode và cập nhật dữ liệu
//         if (data.responseCode === 101000) {
//             return data?.data?.data;
//         }
//     } catch (e) { console.error(e); }

// }

// export {
//     fetchCarouselData,
//     fetchPromotionBannerAction,
//     fetchHomeNewAction,
// }
// service/actions/HomeAction.ts

interface ApiResponse<T> {
  responseCode: number;
  message?: string;
  data: T;
}

// Reusable fetch function with timeout and error handling
async function fetchWithTimeout<T>(
  url: string,
  timeout = 5000
): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();

    if (data.responseCode === 101000) {
      return data.data;
    } else {
      throw new Error(data.message || "API returned non-success code");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch error for ${url}:`, error.message);
    } else {
      console.error(`Fetch error for ${url}:`, error);
    }
    return null;
  }
}

// Carousel data fetching
const fetchCarouselData = async () => {
  const data = await fetchWithTimeout(
    `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/carousel/all`
  );
  return data || []; // Return empty array as fallback
};

// Promotion banner fetching
const fetchPromotionBannerAction = async () => {
  const data = await fetchWithTimeout(
    `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/banner/all`
  );
  return data || []; // Return empty array as fallback
};

// Home news fetching
const fetchHomeNewAction = async () => {
  const data = await fetchWithTimeout<{ data: any[] }>(
    `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/news/all`
  );
  return data?.data || []; // Return empty array as fallback
};

// Optional: Add response type definitions
interface CarouselItem {
  // Add your carousel item type definition here
  id: number;
  // ... other fields
}

interface BannerItem {
  // Add your banner item type definition here
  id: number;
  // ... other fields
}

interface NewsItem {
  // Add your news item type definition here
  id: number;
  // ... other fields
}

// Export with proper type annotations
export {
  fetchCarouselData,
  fetchPromotionBannerAction,
  fetchHomeNewAction,
  type CarouselItem,
  type BannerItem,
  type NewsItem,
};
