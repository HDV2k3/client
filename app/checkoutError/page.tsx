"use client";
import React from "react";
import { Result, Button } from "antd";
import Link from "next/link";
import { CloseCircleOutlined } from "@ant-design/icons";

const CheckoutError: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Result
        status="error"
        icon={<CloseCircleOutlined className="text-red-500" />}
        title={
          <span className="text-2xl font-bold text-red-600">
            Thanh toán thất bại
          </span>
        }
        subTitle="Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
        extra={[
          <Link href="/profile" key="profile">
            <Button type="primary" className="mr-4">
              Quay lại nộp tiền
            </Button>
          </Link>,
          <Link href="/support" key="support">
            <Button type="default">Liên hệ hỗ trợ</Button>
          </Link>,
        ]}
        className="bg-white rounded-xl shadow-lg p-8"
      />
    </div>
  );
};

export default CheckoutError;
