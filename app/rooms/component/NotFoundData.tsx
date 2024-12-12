'use client';

import { useRouter } from "@/hooks/useRouter";
import { Button } from "antd";
import { RefreshButton } from "../style";

export default function NotFoundData() {
    const router = useRouter();

    // Handler to refresh or redirect
    const handleRefresh = () => {
        router.push('/rooms');
    };

    return (
        <div className="flex justify-center items-center h-[200px] bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center  w-full">
                <p className="text-xl font-bold text-red-600 mb-6">
                    Không tìm thấy phòng cho của bạn
                </p>
                <RefreshButton onClick={handleRefresh} >
                    Làm mới
                </RefreshButton>
            </div>
        </div>
    );
}
