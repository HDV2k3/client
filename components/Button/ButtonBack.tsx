'use client';
import { AiOutlineLeft } from "react-icons/ai";
import { Tooltip } from "antd";
import { useRouter } from "@/hooks/useRouter";

export default function ButtonBack() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <Tooltip title="Back">
            <div
                onClick={handleBack}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-300"
            >
                <AiOutlineLeft className="text-black text-lg" />
            </div>
        </Tooltip>
    );
}
