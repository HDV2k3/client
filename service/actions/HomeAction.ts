

const fetchCarouselData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/carousel/all`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch carousel data");
        }
        const data: any = await response.json();
        if (data.responseCode === 101000) {
            return data?.data;
        } else {
            throw new Error(data.message || "Failed to fetch carousel data");
        }
    } catch (e) { console.error(e); }
}


const fetchPromotionBannerAction = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/banner/all`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: any = await response.json();

        if (data.responseCode === 101000) {
            return data?.data;
        } else {
        }
    } catch (e) { console.error(e); }
}

const fetchHomeNewAction = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/news/all`
        );
        const data: any = await response.json();
        // Kiểm tra responseCode và cập nhật dữ liệu
        if (data.responseCode === 101000) {
            return data?.data?.data;
        }
    } catch (e) { console.error(e); }

}


export {
    fetchCarouselData,
    fetchPromotionBannerAction,
    fetchHomeNewAction,
}