// components/RoomListingForm/BasicInfoSection.tsx
import React from "react";
import { Form, Input, DatePicker } from "antd";
interface room {
 title: string;
  availableFromDate: string;
  description: string;
}

interface roomInfoFormProps {
  roomInfo?: room;
}
const BasicInfoSectionUpdate: React.FC<roomInfoFormProps> = ({ roomInfo }) => {
  const { TextArea } = Input;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Form.Item
          name="title"
          label="Tiêu đề hiển thị"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input defaultValue={roomInfo?.title} />
        </Form.Item>
        {/* <Form.Item
          name="availableFromDate"
          label="Ngày phòng trống"
          rules={[
            { required: true, message: "Vui lòng chọn ngày phòng trống" },
          ]}
        >
          <DatePicker
            className="w-full"
            defaultValue={roomInfo?.availableFromDate}
          />
        </Form.Item> */}
      </div>

      <Form.Item
        name="description"
        label="Mô tả bài đăng"
        rules={[{ required: true, message: "Vui lòng cung cấp mô tả" }]}
      >
        <TextArea rows={4} defaultValue={roomInfo?.description} />
      </Form.Item>
    </>
  );
};

export default BasicInfoSectionUpdate;
