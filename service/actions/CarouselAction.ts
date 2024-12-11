

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
    } catch (e) {

    }
}

export {
    fetchCarouselData
}