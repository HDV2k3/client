'use client';

const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        return token;
    }
    return null
}

export default getToken;