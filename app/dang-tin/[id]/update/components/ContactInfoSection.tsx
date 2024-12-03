// components/RoomListingForm/BasicInfoSection.tsx
import React from "react";
import { Form, Input, Select } from "antd";
interface RoomSalePosts {
  contactInfo: string;
  statusShow: string;
  additionalDetails: string;
}

interface roomInfoFormProps {
  roomInfo?: RoomSalePosts;
}
const ContactInfoSectionUpdate: React.FC<roomInfoFormProps> = ({ roomInfo }) => {
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
          <Input defaultValue={roomInfo?.contactInfo} />
        </Form.Item>
        <Form.Item name="statusShow" label="Trạng thái của phòng">
          <Select defaultValue={roomInfo?.statusShow}>
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
          <Input defaultValue={roomInfo?.additionalDetails} />
        </Form.Item>
      </div>
    </>
  );
};

export default ContactInfoSectionUpdate;
