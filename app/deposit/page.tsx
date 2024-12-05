"use client";
import React, { useState } from "react";
import {
  CreditCardOutlined,
  MobileOutlined,
  BankOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Input,
  Button,
  Select,
  Form,
} from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import { Text } from "lucide-react";
import { Rule } from "antd/es/form";
import { Option } from "antd/es/mentions";

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

const paymentMethods = [
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
    fields: [
      { name: "vnpayAmount", label: "Số tiền nạp", type: "number" },
      { name: "vnpayOrderInfo", label: "Nội dung nạp tiền", type: "text" },
    ],
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

      let endpoint = "";
      let params = {};

      if (selectedMethod.key === "vnpay") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/vnPay/submitOrder`;
        params = {
          params: {
            amount: values.vnpayAmount,
            orderInfo: values.vnpayOrderInfo,
            token,
          },
        };
      } else if (selectedMethod.key === "momo") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/momo/payment`;
        params = {
          params: {
            amount: values.momoAmount,
            token,
          },
        };
      }

      const response = await axios.post(endpoint, null, params);

      if (response.data?.data) {
        message.success("Chuyển đến trang thanh toán");
        const result = response.data.data;
        router.push(result);
      } else {
        throw new Error("Invalid response from server");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      if (error.response) {
        message.error(
          error.response.data?.message || "Có lỗi xảy ra khi xử lý giao dịch"
        );
      } else if (error.request) {
        message.error("Không thể kết nối đến máy chủ");
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      }
      console.error("Deposit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldRules = (field: { type: string; label: string }) => {
    const rules: Rule[] = [
      {
        required: true,
        message: `Vui lòng nhập ${field.label.toLowerCase()}`,
      },
    ];

    if (field.type === "number") {
      rules.push({
        validator: async (_, value) => {
          if (!value) {
            return Promise.reject(`Vui lòng nhập ${field.label.toLowerCase()}`);
          }
          const numberValue = parseFloat(value);
          if (isNaN(numberValue)) {
            return Promise.reject("Vui lòng nhập số hợp lệ");
          }
          if (numberValue < 10000) {
            return Promise.reject("Số tiền tối thiểu là 10,000 VND");
          }
          return Promise.resolve();
        },
      });
    }

    return rules;
  };

  return (
    <div className="min-h-max bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center justify-center">
      <Title level={2} className="text-center mb-6 text-blue-800">
        Nạp Tiền An Toàn & Nhanh Chóng
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${method.color} rounded-lg shadow-md p-4 text-center cursor-pointer`}
            onClick={() => handleMethodSelect(method)}
          >
            {method.icon}
            <Text className="block mt-2 font-semibold">{method.name}</Text>
            <Text type="secondary" className="text-xs">
              {method.description}
            </Text>
          </motion.div>
        ))}
      </div>

      <Modal
        title={`Nạp Tiền Qua ${selectedMethod?.name}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleDeposit}
            loading={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Xác Nhận Nạp Tiền
          </Button>,
        ]}
        width={500}
      >
        {selectedMethod && (
          <Form form={form} layout="vertical">
            {selectedMethod.fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={getFieldRules(field)}
              >
                {field.type === "select" && field.options ? (
                  <Select placeholder={`Chọn ${field.label.toLowerCase()}`}>
                    {field.options.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={`Nhập ${field.label.toLowerCase()}`}
                    onChange={(e) => {
                      if (field.type === "number") {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        form.setFieldValue(field.name, value);
                      }
                    }}
                  />
                )}
              </Form.Item>
            ))}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AdvancedDepositPage;
