"use client";

import React from "react";
import { Button, Input, Form, message } from "antd";
import TitleRoom from "../../components/TitleRoom";

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Simulate form submission
    console.log("Form values:", values);
    message.success("Your message has been sent successfully!");
    form.resetFields();
  };

  return (
    <div className="px-4 py-8 max-w-screen-xl mx-auto min-h-screen flex flex-col">
      <TitleRoom title="Liên Hệ Với Chúng Tôi" />
      <p className="text-lg mb-6">
        Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng điền vào mẫu bên
        dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
      </p>
      <Form
        form={form}
        name="contact"
        onFinish={onFinish}
        className="space-y-4"
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Tên"
          rules={[{ required: true, message: "Tên là bắt buộc!" }]}
        >
          <Input placeholder="Nhập tên của bạn" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập địa chỉ email của bạn" />
        </Form.Item>
        <Form.Item name="phone" label="Số Điện Thoại">
          <Input placeholder="Nhập số điện thoại của bạn (tùy chọn)" />
        </Form.Item>
        <Form.Item
          name="message"
          label="Tin Nhắn"
          rules={[{ required: true, message: "Tin nhắn là bắt buộc!" }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập tin nhắn của bạn" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Thông Tin Liên Hệ</h2>
        <p className="text-lg mb-2">
          <span className="font-semibold">Email:</span>
          <a
            href="mailto:admin@nextroom.com"
            className="text-blue-500 hover:underline"
          >
            admin@nextroom.com
          </a>
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Số Điện Thoại:</span>
          <a href="tel:+1234567890" className="text-blue-500 hover:underline">
            +1234567890
          </a>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Địa Chỉ:</span>
          123 Phố Main, Thành phố Hồ Chí Minh, Việt Nam
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
