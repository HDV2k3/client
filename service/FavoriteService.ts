'use client';

import getToken from "@/utils/getTokenLocalStorage";
import axios from "axios";
import queryString from "query-string";

export const fetchCreateFavoritePost = async (roomId: string) => {
    const token = getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/favorite/create`;
    const body = { roomId };
    // console.log('check body', roomId, body);
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
        console.log('check res', response);
        return response.data;
    } catch (error) {
        console.error("Error creating favorite post:", error);
        throw error;
    }
}

export const fetchFavoritePost = async (token: string, page: number, size: number) => {
    const query = queryString.stringify({ page, size })
    // const token = getToken(); if (!token) return null;
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/favorite/all?${query}`;
    try {
        const response = await axios.get(
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
