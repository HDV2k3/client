'use client';

import { LangugeOptions } from "@/constants/languge";

export const mapLanguage = (lang: string): keyof typeof LangugeOptions => lang as keyof typeof LangugeOptions;

const getLangugeLocalStorage = (): keyof typeof LangugeOptions => {
    if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('lang') || 'vi';
        return mapLanguage(storedLang);
    }
    return 'vi';
}

const setLangugeLocalStorage = (lang?: string) => {
    if (typeof window !== 'undefined') {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'en');
        }
        if (lang) {
            localStorage.setItem('lang', lang);
        }
    }
}

export default function useLanguge() {
    const getLanguge = () => getLangugeLocalStorage();
    const setLanguge = (lang: string) => setLangugeLocalStorage(lang);
    const lang = getLanguge();
    return { lang, getLanguge, setLanguge, LangugeOptions };
}