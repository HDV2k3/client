"use client";
import React, { useState } from "react";
import {
  CreditCardOutlined,
  MobileOutlined,
  BankOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import {
  Card,
  Modal,
  Input,
  Button,
  Tooltip,
  Typography,
  Select,
  Form,
} from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;
const { Option } = Select;
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
    options?: string[]; // Optional for select fields
  }[];
}

const paymentMethods = [
  {
    key: "momo",
    name: "Momo",
    icon: <MobileOutlined className="text-4xl text-pink-500" />,
    color: "bg-pink-50",
    description: "Nạp tiền nhanh chóng qua ví điện tử Momo",
    fields: [
      { name: "momoPhone", label: "Số điện thoại Momo", type: "text" },
      { name: "momoAmount", label: "Số tiền nạp", type: "number" },
    ],
  },
  {
    key: "vnpay",
    name: "VNPay",
    icon: <QrcodeOutlined className="text-4xl text-blue-600" />,
    color: "bg-blue-50",
    description: "Thanh toán qua hệ thống ngân hàng VNPay",
    fields: [
      {
        name: "vnpayBank",
        label: "Chọn ngân hàng",
        type: "select",
        options: ["Vietcombank", "BIDV", "Techcombank"],
      },
      { name: "vnpayAmount", label: "Số tiền nạp", type: "number" },
    ],
  },
  {
    key: "vietcombank",
    name: "Vietcombank",
    icon: <BankOutlined className="text-4xl text-green-600" />,
    color: "bg-green-50",
    description: "Nạp tiền trực tiếp từ tài khoản Vietcombank",
    fields: [
      { name: "vcbAccountNumber", label: "Số tài khoản", type: "text" },
      { name: "vcbAmount", label: "Số tiền nạp", type: "number" },
    ],
  },
  {
    key: "stripe",
    name: "Stripe",
    icon: <CreditCardOutlined className="text-4xl text-indigo-500" />,
    color: "bg-indigo-50",
    description: "Thanh toán quốc tế an toàn và tiện lợi",
    fields: [
      { name: "stripeCardNumber", label: "Số thẻ", type: "text" },
      { name: "stripeExpiry", label: "Ngày hết hạn", type: "text" },
      { name: "stripeCVV", label: "CVV", type: "text" },
      { name: "stripeAmount", label: "Số tiền nạp", type: "number" },
    ],
  },
];

const AdvancedDepositPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleMethodSelect = (method: any) => {
    setSelectedMethod(method);
    setIsModalVisible(true);
  };

  const handleDeposit = () => {
    if (!selectedMethod) {
      console.error("No payment method selected");
      return;
    }

    form
      .validateFields()
      .then((values) => {
        console.log("Deposit Details:", values);
        // Xử lý logic nạp tiền
        Modal.success({
          title: "Nạp Tiền Thành Công",
          content: `Bạn đã nạp ${values[`${selectedMethod!.key}Amount`]} VND qua ${selectedMethod!.name}`,
        });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="min-h-max bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center justify-center">
      <Title level={2} className="text-center mb-6 text-blue-800">
        Nạp Tiền An Toàn & Nhanh Chóng
      </Title>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
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
             rules={[
               {
                 required: true,
                 message: `Vui lòng nhập ${field.label.toLowerCase()}`,
               },
             ]}
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
