'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, message } from "antd";
import { redirect } from "next/navigation";

interface OrderRecord {
    id: string;
    method: string;
    amount: number;
    createDate: string;
    status: string;
}

interface ApiResponse {
    responseCode: number;
    data: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalElements: number;
        data: OrderRecord[];
    };
    message: string;
}

export default function HistoryBalance() {
    const [data, setData] = useState<OrderRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({
        current: 1, // Start from page 1
        pageSize: 5, // 5 items per page
        total: 0,
    });

    const fetchData = async (page: number, pageSize: number) => {
        if (typeof window === "undefined") return; // Ensure code runs only in the browser

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            if (!token || !userId) {
                message.error("No authentication token found");
                redirect('/login');
                return;
            }
            const response = await axios.get<ApiResponse>(
                `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/order/all?userId=${userId}&page=${page}&size=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message === "Success") {
                setData(response.data.data.data);
                setPagination((prevPagination) => ({
                    ...prevPagination,
                    current: response.data.data.currentPage + 1, // Convert to 1-indexed
                    pageSize: response.data.data.pageSize,
                    total: response.data.data.totalElements,
                }));
            } else {
                message.error(response.data.message || "Unable to load transaction history");
            }
        } catch (error) {
            console.error("Error loading transaction history:", error);
            message.error("Error loading transaction history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchData(1, pagination.pageSize); // Start from page 1
        }
    }, [pagination.pageSize]);

    const handleTableChange = (newPagination: any) => {
        fetchData(newPagination.current, newPagination.pageSize);
    };

    const columns = [
        {
            title: "Phương Thức",
            dataIndex: "method",
            key: "method",
        },
        {
            title: "Số Tiền",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => `${amount.toLocaleString()} VND`,
        },
        {
            title: "Ngày",
            dataIndex: "createDate",
            key: "createDate",
            render: (date: string) => new Date(date).toLocaleString(),
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const colorMap: { [key: string]: string } = {
                    SUCCESS: "green",
                    PROCESSING: "orange",
                    PENDING: "blue",
                    FAILED: "red",
                };

                const color = colorMap[status] || "default";
                const label =
                    {
                        SUCCESS: "Thành Công",
                        PROCESSING: "Đang Xử Lý",
                        PENDING: "Chờ Xử Lý",
                        FAILED: "Thất Bại",
                    }[status] || status;

                return <Tag color={color}>{label}</Tag>;
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
            }}
            onChange={handleTableChange}
        />
    );
}
