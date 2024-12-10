import React from "react";
import { Form, Input, Select } from "antd";

const ContactInfoSection: React.FC = () => {
  const { Option } = Select;

  return (
    <div className="bg-gray-100 p-6 rounded-lg mt-[20px]">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Thông tin liên hệ
      </h3>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {/* Contact Information */}
        <Form.Item
          name="contactInfo"
          label="Thông tin liên hệ"
          rules={[
            { required: true, message: "Vui lòng cung cấp thông tin liên hệ" },
          ]}
        >
          <Input
            placeholder="Nhập số điện thoại hoặc email"
            className="w-full"
          />
        </Form.Item>

        {/* Room Status */}
        <Form.Item
          name="roomStatus"
          label="Trạng thái của phòng"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái phòng" }]}
        >
          <Select placeholder="Chọn trạng thái" className="w-full">
            {["Còn phòng", "Hết phòng", "Đang thi công"].map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Additional Details */}
        <Form.Item
          name="additionalDetails"
          label="Chi tiết bổ sung"
          rules={[
            {
              required: true,
              message: "Vui lòng cung cấp thông tin chi tiết bổ sung",
            },
          ]}
        >
          <Input
            placeholder="Thêm chi tiết bổ sung (VD: điều kiện thuê, ưu đãi)"
            className="w-full"
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default ContactInfoSection;
