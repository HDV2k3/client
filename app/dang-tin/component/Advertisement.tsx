'use client';

import TitleRoom from "@/components/TitleRoom";
import { Form, Select, } from "antd";
import { useEffect, useState } from "react";
const { Option } = Select;

const plans = [
    {
        index: 1,
        key: "daily",
        title: "Gói Theo Ngày",
        description: "Quảng cáo bài viết trong 1 ngày để tăng tương tác nhanh chóng.",
        price: "10,000 VND /ngày",
        priceNumber: 100000,
    },
    {
        index: 2,
        key: "weekly",
        title: "Gói Theo Tuần",
        description: "Quảng cáo bài viết trong 7 ngày với chi phí ưu đãi và tiết kiệm hơn.",
        price: "50,000 VND /tuần",
        priceNumber: 50000,
    },
    {
        index: 3,
        key: "monthly",
        title: "Gói Theo Tháng",
        description: "Quảng cáo bài viết trong 30 ngày để duy trì sự hiện diện lâu dài.",
        price: "189,000 VND /tháng",
        priceNumber: 189000,
    },
];

type Props = {
    setValue: (fields: any) => void;
}
export default function AdvertisementForm({ setValue }: Props) {
    const [selectedItem, setSelectedItem] = useState<number>(0);
    useEffect(() => {
        setValue({
            typePackage: 0
        });
    }, [setValue]);

    const handleSelectItem = (item: number) => {
        setSelectedItem(item);
        setValue({
            typePackage: item,
        })
    }
    const handleDelete = () => {
        setSelectedItem(0);
        setValue({
            typePackage: 0,
        })
    }
    const renderSelected = () => {
        const data = plans.find((item) => item?.index === selectedItem);
        return (
            <>
                <div style={{ marginTop: '20px', width: '100%', height: 100, border: "1px solid #1e3a8a", display: 'flex', padding: '10px', borderRadius: 10, justifyContent: 'space-between' }}>
                    <div className="flex flex-col w-[25%]">
                        <h3 style={{ color: "#1e3a8a" }}>Gói đã chọn:</h3>
                        <p>{data?.title}</p>
                        <span>Chi phí: {data?.price}</span>
                    </div>
                    <div style={{ color: 'red' }}>
                        <button onClick={handleDelete}>
                            Xoá
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="h-[100%] max-h-[600px] bg-white flex flex-col p-4">
            <TitleRoom title="Kế hoạch quảng cáo của bài viết" />
            <Form.Item
                name={["typePackage"]}
                label="Gói quảng cáo"
                style={{ marginBottom: '16px' }} // Add spacing below the Form Item
            >
                <Select
                    placeholder="Phong cách của phòng"
                    className="w-full"
                    style={{
                        height: '70px', // Adjusted height for better alignment
                        fontSize: '16px',
                        borderRadius: '8px', // Optional: rounded borders for a cleaner look
                        padding: '0 10px', // Padding to ensure content is not too close to the edges
                    }}
                >
                    <Option
                        value={0}
                        style={{
                            height: '80px',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', // Center text vertically
                            padding: '0 10px' // Padding for better spacing
                        }}
                    >
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>Không sử dụng quảng cáo</p>
                    </Option>

                    {plans.map((item: any) => (
                        <Option
                            key={item?.index}
                            value={item?.index}
                            style={{ height: '80px', display: 'flex', alignItems: 'center', padding: '0 10px' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%' }} >
                                <div style={{ display: 'flex', marginBottom: '8px' }}>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        color: '#333', flexShrink: 0
                                    }}>
                                        {item?.title}:
                                    </p>
                                    <p
                                        style={{
                                            marginLeft: '10px',
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#333',
                                            flexShrink: 0
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        color: "#1e3a8a",
                                        fontWeight: "bold",
                                        lineHeight: '1.4',
                                    }} >
                                    {item.price}
                                </h3>
                            </div>
                        </Option>
                    ))}
                </Select>
            </Form.Item>


            {selectedItem > 0 && <>{renderSelected()}</>}
        </div>
    );
}
