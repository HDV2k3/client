'use client';

import getToken from "@/utils/getTokenLocalStorage";
import axios from "axios";
import queryString from "query-string";

const axiosFavoriteBookmarkAction = async (roomId: string) => {
    const token = getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/favorite/create`;
    const body = { roomId };
    try {
        const response = await axios.post(
            url,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating favorite post:", error);
        throw error;
    }
}

const axiosDeleteFavoritePost = async (roomId: string) => {
    const query = queryString.stringify({ roomId })
    const token = getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/favorite/delete?${query}`;
    try {
        const response = await axios.delete(
            url,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating favorite post:", error);
        throw error;
    }
}

export {
    axiosDeleteFavoritePost,
    axiosFavoriteBookmarkAction
}
