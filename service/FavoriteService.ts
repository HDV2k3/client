import axios from "axios";

export const fetchCreateFavoritePost = async (token: string, roomId: string) => {
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