'use client';

import TitleRoom from "@/components/TitleRoom";
import { Form, Select, } from "antd";
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
export default function AdvertisementForm() {
    return (
        <div className="h-[100%] max-h-[600px] bg-gray-100 flex flex-col p-4 mt-[20px] rounded-lg">
            <TitleRoom title="Kế hoạch quảng cáo cho bài viết này" className="text-xl font-semibold" />
            <div className="mt-4">
                <Form.Item name={["typePackage"]}
                    label="Gói quảng cáo chỉ áp dụng trên bài viết này."
                    style={{ marginBottom: '16px' }}
                    rules={[{ required: true, message: "Vui lòng xác nhận chương trình quảng cáo" }]}
                >
                    <Select
                        placeholder="Chương trình quảng cáo "
                        className="w-full"
                        style={{ height: '70px', fontSize: '16px', borderRadius: '8px' }}
                    >
                        <Option
                            value={0}
                            style={{ height: '60px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}
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
                                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#333', flexShrink: 0 }}>
                                            {item?.title}:
                                        </p>
                                        <p style={{ marginLeft: '10px', margin: 0, fontSize: '14px', color: '#333', flexShrink: 0 }} >
                                            {item.description}
                                        </p>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '14px', color: "#1e3a8a", fontWeight: "bold", lineHeight: '1.4', }} >
                                        {item.price}
                                    </h3>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
        </div>
    );
}
