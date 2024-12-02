// components/RoomListingForm/BasicInfoSection.tsx
import React from "react";
import { Form, Input, Select } from "antd";

const ContactInfoSection: React.FC = () => {
  const { Option } = Select;
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Form.Item
          name="contactInfo"
          label="Thông tin liên hệ"
          rules={[
            { required: true, message: "Thông tin liên lạc là bắt buộc" },
          ]}
        >
          <Input placeholder="Số điện thoại hoặc email" />
        </Form.Item>
        <Form.Item name="statusShow" label="Trạng thái của phòng">
          <Select placeholder="chọn trạng thái">
            {["Còn phòng", "Sắp hết hạn", "Đang thi công"].map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="additionalDetails"
          label="Chi tiết bổ sung"
          rules={[
            {
              required: true,
              message: "thông tin chi tiết bổ sung là cần thiết",
            },
          ]}
        >
          <Input placeholder="thêm thông tin chi tiết bổ sung" />
        </Form.Item>
      </div>
    </>
  );
};

export default ContactInfoSection;
