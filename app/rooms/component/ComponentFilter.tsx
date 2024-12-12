'use client';

import React, { useState, useEffect } from "react";
import { InputNumber, Select, Checkbox, Radio } from "antd";
import { typeRooms } from "../../../constants/TypeCreatePost";
import { addressHCM, getCommuneByIdDistrict } from '@/constants/HCM_address';
import { RefreshButton, SubmitButton } from '../style/index';
import { useRouter } from "@/hooks/useRouter";
import queryString from "query-string";

interface Commune {
    idDistrict: number;
    idCommune: number;
    name: string;
}

export default function ComponentFilterPost() {
    const router = useRouter();

    const [district, setDistrict] = useState<number>(-1);
    const [commune, setCommune] = useState<number>(-1);
    const [type, setType] = useState<number>(-1);
    const [minPrice, setMinPrice] = useState<number>(-1);
    const [maxPrice, setMaxPrice] = useState<number>(-1);
    const [hasPromotion, setHasPromotion] = useState<boolean>(false);
    const [sortByPrice, setSortByPrice] = useState<string | undefined>();
    const [sortByCreated, setSortByCreated] = useState<string | undefined>();
    const [dataCommune, setDataCommune] = useState<Commune[]>([]);

    const handleDistrictChange = (value: number) => {
        setDistrict(value);
        const communes = getCommuneByIdDistrict(value);
        setDataCommune(communes);
        setCommune(-1);
    };

    const handleSubmit = () => {
        const queryParams = {
            district: district !== -1 ? district : undefined,
            commune: commune !== -1 ? commune : undefined,
            type: type !== -1 ? type : undefined,
            minPrice: minPrice !== -1 ? minPrice : undefined,
            maxPrice: maxPrice !== -1 ? maxPrice : undefined,
            hasPromotion: hasPromotion ? true : undefined,
            sortByPrice,
            sortByCreated,
        };
        const filteredParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== undefined)
        );
        const query = queryString.stringify(filteredParams);
        router.push(`/rooms?${query}`);
    };

    const handleReset = () => {
        setDistrict(-1);
        setCommune(-1);
        setType(-1);
        setMinPrice(-1);
        setMaxPrice(-1);
        setHasPromotion(false);
        setSortByPrice(undefined);
        setSortByCreated(undefined);
        setDataCommune([]);
        router.push('/rooms');
    };

    const renderFilter = () => {
        return (
            <>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Quận/Huyện</label>
                        <Select
                            placeholder="Chọn quận/huyện"
                            className="w-full"
                            value={district !== -1 ? district : undefined}
                            onChange={handleDistrictChange}
                        >
                            <Select.Option value={-1}>Không chọn</Select.Option>
                            {addressHCM.district.map((district) => (
                                <Select.Option key={district.idDistrict} value={district.idDistrict}>
                                    {district.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label>Phường Xã</label>
                        <Select
                            placeholder="Chọn phường/xã"
                            className="w-full"
                            value={commune !== -1 ? commune : undefined}
                            onChange={setCommune}
                            disabled={district === -1}
                        >
                            <Select.Option value={undefined}>Không chọn</Select.Option>
                            {dataCommune.map((item) => (
                                <Select.Option key={item.idCommune} value={item.idCommune}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div>
                    <label>Chọn loại bất động sản</label>
                    <Select
                        placeholder="Chọn loại bất động sản"
                        className="w-full"
                        value={type !== -1 ? type : undefined}
                        onChange={setType}
                    >
                        <Select.Option value={undefined}>Không chọn</Select.Option>
                        {typeRooms.map((item) => (
                            <Select.Option key={item.index} value={item.index}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Giá từ, giá thấp nhất</label>
                        <InputNumber
                            style={{ width: '100%', minWidth: '150px' }}
                            placeholder="Nhập giá thấp nhất"
                            min={0}
                            max={10000000000000000}
                            value={minPrice !== -1 ? minPrice : undefined}
                            onChange={(value) => setMinPrice(value as number)}
                            formatter={(value) => value !== undefined ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
                            parser={(value) => value ? parseInt(value.replace(/₫\s?|,/g, ""), 10) : 0}
                        />
                    </div>

                    <div>
                        <label>Giá đến</label>
                        <InputNumber
                            style={{ width: '100%', minWidth: '150px' }}
                            placeholder="Nhập giá cao nhất"
                            min={0}
                            max={10000000000000000}
                            value={maxPrice !== -1 ? maxPrice : undefined}
                            onChange={(value) => setMaxPrice(value as number)}
                            formatter={(value) => value !== undefined ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
                            parser={(value) => value ? parseInt(value.replace(/₫\s?|,/g, ""), 10) : 0}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Checkbox
                        checked={hasPromotion}
                        onChange={(e) => setHasPromotion(e.target.checked)}
                    >
                        Có khuyến mãi
                    </Checkbox>
                </div>
                <div className="flex">
                    <div  >
                        <label>Giá thành</label>
                        <Radio.Group
                            style={{ display: 'flex', flexDirection: 'column' }}
                            value={sortByPrice}
                            onChange={(e) => setSortByPrice(e.target.value)}
                        >
                            <Radio value="ASC">Giá tăng dần</Radio>
                            <Radio value="DESC">Giá giảm dần</Radio>
                        </Radio.Group>
                    </div>

                    <div style={{ marginLeft: 50 }}>
                        <label>Ngày đăng</label>
                        <Radio.Group
                            style={{ display: 'flex', flexDirection: 'column' }}
                            value={sortByCreated}
                            onChange={(e) => setSortByCreated(e.target.value)}
                        >
                            <Radio value="ASC">Cũ nhất</Radio>
                            <Radio value="DESC">Mới nhất</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <RefreshButton onClick={handleReset}>
                        Làm mới
                    </RefreshButton>

                    <SubmitButton type="primary" onClick={handleSubmit}>
                        Áp dụng bộ lọc
                    </SubmitButton>
                </div>
            </>
        )
    }
    return (
        <div className="space-y-6 bg-white p-8 rounded-lg shadow-md mb-[20px]">
            {renderFilter()}
        </div>
    );
}
