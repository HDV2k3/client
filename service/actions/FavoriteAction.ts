'use server';

import { cookies } from "next/headers";
import queryString from "query-string";

const getFavoriteBookmarkAction = async (page: number, size: number) => {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    const token = tokenCookie?.value as string;
    const query = queryString.stringify({ page, size })
    const url = `${process.env.NEXT_PUBLIC_API_URL_MARKETING}/favorite/all?${query}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) return null;
    const dataObject = await response.json();
    return dataObject?.data;
}

export {
    getFavoriteBookmarkAction,
}