import axios from "axios";
import queryString from "query-string";

const getDistrictAction = async (districts: string, page: number, size: number) => {
    const query = queryString.stringify({ districts, page, size })
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/post/district?${query}`;
    const response = await axios.get(url);
    return response?.data;
}

export {
    getDistrictAction
}
