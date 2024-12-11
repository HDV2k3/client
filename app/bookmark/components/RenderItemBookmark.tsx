import { useState } from 'react';
import Link from 'next/link';
import { Image, message, Tooltip } from 'antd';
import { converStringToSlug } from '@/utils/converStringToSlug';
import { CheckCircleFilled } from '@ant-design/icons';
import { FaBookmark, FaPhone, FaRegBookmark, FaUser } from 'react-icons/fa';
import { axiosDeleteFavoritePost, axiosFavoriteBookmarkAction } from '@/service/FavoriteService'

type Props = {
    data: any;
};

export default function RenderItemBookmark({ data }: Props) {
    const [isBookmark, setIsBookmark] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { roomSalePostResponse } = data;
    const { roomInfo, id, title, pricingDetails, fixPrice, createdBy, contactInfo, roomId } = roomSalePostResponse;
    const { basePrice } = pricingDetails;
    const { postImages } = roomInfo;
    const slug = `/r/${converStringToSlug(title)}-${id}.html`;

    const handleBookMark = async () => {
        if (isBookmark) {
            setIsBookmark(false);
            const data = await axiosDeleteFavoritePost(roomId)
            if (!data) setIsBookmark(true);
            message.success('Đã xoá lưu bản tin');
        } else {
            setIsBookmark(true);
            const data = await axiosFavoriteBookmarkAction(roomId)
            if (!data) setIsBookmark(false);
            message.success('Đã lưu bản tin');
        }
    };
    const handleChat = () => {

    }
    const renderInfo = () => (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {title || 'Unnamed Room'}
            </h3>
            <div className="flex items-center text-sm space-x-2">
                <div>
                    {fixPrice != null ? (
                        <span className="text-gray-500 line-through">
                            {basePrice.toLocaleString()} VNĐ/tháng
                        </span>
                    ) : (
                        <span className="font-bold text-gray-900">
                            {basePrice.toLocaleString()} VNĐ/tháng
                        </span>
                    )}
                </div>
                {fixPrice != null && (
                    <span className="font-bold text-red-600">
                        {fixPrice.toLocaleString()} VNĐ/tháng
                    </span>
                )}
            </div>
        </div>
    );
    const renderModifiedBy = () => (
        <div className="flex items-center space-x-6 mt-1">
            <Tooltip title={createdBy}>
                <span className="flex items-center text-gray-500 text-sm truncate">
                    <FaUser className="mr-2 text-gray-600" />
                    <span className="truncate">{createdBy}</span>
                    <CheckCircleFilled className="text-green-500 ml-1" style={{ fontSize: '10px' }} />
                </span>
            </Tooltip>
            <Tooltip title={contactInfo}>
                <span className="flex items-center text-gray-500 text-sm truncate">
                    <FaPhone className="mr-2 text-gray-600" />
                    <span className="truncate">{contactInfo}</span>
                </span>
            </Tooltip>
        </div>
    );

    return (
        <div className={`h-[130px] w-full min-w-[150px] flex border border-gray-300 rounded-md overflow-hidden shadow-sm mt-2 mb-2 
            ${isHovered ? "shadow-[0px_4px_8px_rgba(0,0,0,0.2)]" : 'shadow-md}'}`
        }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={slug} className="flex w-full h-full">
                {/* Image Section */}
                <div className="h-full w-[150px] flex justify-center items-center bg-gray-100">
                    <Image
                        src={postImages[0]?.urlImagePost || '/placeholder-image.jpg'}
                        alt="Image Post"
                        className='w-full h-full object-cover transition-transform duration-300 ease-in-out'
                        preview={false}
                    />
                </div>
                {/* Info Section */}
                <div className="h-full flex-1 flex flex-col justify-between p-3">
                    {renderInfo()}
                    {renderModifiedBy()}
                </div>
            </Link>
            <div className="h-full w-[100px] flex flex-col justify-center items-center p-3 bg-gray-50 space-y-3">
                <button
                    className="text-gray-500 hover:text-yellow-500 transition-colors"
                    onClick={handleBookMark}
                >
                    {isBookmark ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
                </button>
                <button
                    className="px-4 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                    onClick={handleChat}
                >
                    Chat
                </button>
            </div>
        </div>
    );
}
