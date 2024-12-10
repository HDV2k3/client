import React, { useState } from "react";
import { MobileOutlined, QrcodeOutlined } from "@ant-design/icons";
import { message, Form, Typography } from "antd";
import axios from "axios";
import { useRouter } from '@/hooks/useRouter';
import PaymentMethodCard from "./PaymentMethodCard";
import DepositModal from "./DepositModal";

const { Title } = Typography;

interface PaymentMethod {
  key: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  fields: {
    name: string;
    label: string;
    type: string;
    options?: string[];
  }[];
}

const paymentMethods: PaymentMethod[] = [
  {
    key: "momo",
    name: "Momo",
    icon: <MobileOutlined className="text-4xl text-pink-500" />,
    color: "bg-pink-50",
    description: "Nạp tiền nhanh chóng qua ví điện tử Momo",
    fields: [{ name: "momoAmount", label: "Số tiền nạp", type: "number" }],
  },
  {
    key: "vnpay",
    name: "VNPay",
    icon: <QrcodeOutlined className="text-4xl text-blue-600" />,
    color: "bg-blue-50",
    description: "Thanh toán qua hệ thống ngân hàng VNPay",
    fields: [{ name: "vnpayAmount", label: "Số tiền nạp", type: "number" }],
  },
];

const AdvancedDepositPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setIsModalVisible(true);
  };

  const handleDeposit = async () => {
    if (!selectedMethod) {
      message.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    try {
      setIsLoading(true);
      const values = await form.validateFields();

      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập để thực hiện giao dịch");
        return;
      }

      const endpoint =
        selectedMethod.key === "vnpay"
          ? `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/vnPay/submitOrder`
          : `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/momo/payment`;

      const params = {
        params: {
          amount: values[`${selectedMethod.key}Amount`],
        },
      };

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Deposit params:", params);
      console.log("Deposit headers:", headers);
      console.log("Deposit endpoint:", endpoint);

      const response = await axios.post(endpoint, null, {
        ...params,
        ...headers,
      });
      if (response.data?.data) {
        message.success("Chuyển đến trang thanh toán");
        const result = response.data.data;
        router.push(result);
      } else {
        throw new Error("Invalid response from server");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      console.error("Deposit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-max bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center justify-center">
      <Title level={2} className="text-center mb-6 text-blue-800">
        Nạp Tiền An Toàn & Nhanh Chóng
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.key}
            name={method.name}
            icon={method.icon}
            color={method.color}
            description={method.description}
            onClick={() => handleMethodSelect(method)}
          />
        ))}
      </div>

      <DepositModal
        visible={isModalVisible}
        method={selectedMethod}
        form={form}
        isLoading={isLoading}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleDeposit}
      />
    </div>
  );
};

export default AdvancedDepositPage;
