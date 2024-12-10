// components/RoomListingForm/BasicInfoSection.tsx
import React from "react";
import { Form, Input, DatePicker } from "antd";

const BasicInfoSection: React.FC = () => {
  const { TextArea } = Input;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mt-[20px]">
        <Form.Item
          name="title"
          label="Tiêu đề hiển thị"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input placeholder="Phòng ấm cúng ở vị trí trung tâm" />
        </Form.Item>
        <Form.Item
          name="availableFromDate"
          label="Ngày phòng trống"
          rules={[
            { required: true, message: "Vui lòng chọn ngày phòng trống" },
          ]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      <Form.Item
        name="description"
        label="Mô tả bài đăng"
        rules={[{ required: true, message: "Vui lòng cung cấp mô tả" }]}
      >
        <TextArea
          rows={4}
          placeholder="Mô tả phòng, tiện nghi của phòng và điều gì làm cho phòng trở nên đặc biệt"
        />
      </Form.Item>
    </>
  );
};

export default BasicInfoSection;
