'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, message } from "antd";

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

const DepositHistoryTable: React.FC = () => {
  const [data, setData] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem("userId");
  const [pagination, setPagination] = useState({
    current: 1, // Bắt đầu từ trang 1
    pageSize: 5, // 5 phần tử trên mỗi trang
    total: 0,
  });

  const fetchData = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await axios.get<ApiResponse>(
          // `http://localhost:8084/payment/order/all?userId=${userId}&page=${page}&size=${pageSize}`,
          `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/order/all?userId=${userId}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("API Response:", response.data);

        if (response.data.message === "Success") {
          setData(response.data.data.data);
          setPagination((prevPagination) => ({
            ...prevPagination,
            current: response.data.data.currentPage + 1, // Chuyển về dạng 1-indexed
            pageSize: response.data.data.pageSize,
            total: response.data.data.totalElements,
          }));
        } else {
          message.error(
            response.data.message || "Không thể tải lịch sử giao dịch"
          );
        }
      }
    } catch (error) {
      console.error("Lỗi tải lịch sử giao dịch:", error);
      message.error("Lỗi tải lịch sử giao dịch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, pagination.pageSize); // Bắt đầu từ trang 1
  }, [pagination.pageSize]);

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

  const handleTableChange = (newPagination: any) => {
    fetchData(newPagination.current, newPagination.pageSize);
  };

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
};

export default DepositHistoryTable;
