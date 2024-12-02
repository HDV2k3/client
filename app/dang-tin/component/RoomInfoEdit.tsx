// components/RoomListingForm/RoomDetailsSection.tsx
import React from "react";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";

const RoomDetailsSection: React.FC = () => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Room Details</h3>
      <div className="grid md:grid-cols-5 gap-6">
        <Form.Item
          name={["roomInfo", "name"]}
          label="Tên phòng"
          rules={[{ required: true, message: "Tên phòng là bắt buộc" }]}
        >
          <Input placeholder="Room 101" />
        </Form.Item>
        <Form.Item
          name={["roomInfo", "type"]}
          label="Kiểu phòng"
          rules={[{ required: true, message: "Chọn loại phòng" }]}
        >
          <Select placeholder="Chọn loại phòng">
            {["Studio", "Apartment", "Private Room", "Shared Room"].map(
              (type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
        <Form.Item name={["roomInfo", "style"]} label="Room Style">
          <Select placeholder="phong cách của phòng">
            {["Modern", "Classic", "Minimalist", "Industrial"].map((style) => (
              <Option key={style} value={style}>
                {style}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={["roomInfo", "floor"]} label="Sàn phòng">
          <Select placeholder="sàn của phòng">
            {["Modern", "Classic", "Minimalist", "Industrial"].map((style) => (
              <Option key={style} value={style}>
                {style}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={["roomInfo", "availableFromDate"]}
          label="ngày mở cho thuê vào."
          rules={[{ required: true, message: "Vui lòng chọn ngày có sẵn" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </div>
      <div className="grid md:grid-cols-5 gap-6">
        <Form.Item
          name={["roomInfo", "width"]}
          label="Chiều rộng phòng (m)"
          rules={[
            { type: "number", min: 1, message: "Chiều rộng không hợp lệ" },
          ]}
        >
          <InputNumber className="w-full" placeholder="Chiều rộng phòng" />
        </Form.Item>
        <Form.Item
          name={["roomInfo", "height"]}
          label="chiều cao (m)"
          rules={[
            { type: "number", min: 1, message: "Chiều cao không hợp lệ" },
          ]}
        >
          <InputNumber className="w-full" placeholder="Chiều cao phòng" />
        </Form.Item>
        <Form.Item
          name={["roomInfo", "numberOfBedrooms"]}
          label="số lượng phòng ngủ"
          rules={[{ type: "number", min: 0 }]}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>
        <Form.Item
          name={["roomInfo", "numberOfBathrooms"]}
          label="số lượng phòng tắm"
          rules={[{ type: "number", min: 0 }]}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>
        <Form.Item
          name={["roomInfo", "capacity"]}
          label="sức chứa tối đa"
          rules={[{ type: "number", min: 0 }]}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>
      </div>
      <div className="grid md:grid-cols-1 gap-1">
        <Form.Item
          name={["roomInfo", "address"]}
          label="địa chỉ phòng"
          rules={[{ required: true, message: "Vui lòng cung cấp địa chỉ" }]}
        >
          <Input placeholder="HCM" />
        </Form.Item>
      </div>
      <div className="grid md:grid-cols-1 gap-1">
        <Form.Item
          name={["roomInfo", "description"]}
          label="mô tả phòng"
          rules={[{ required: true, message: "Vui lòng cung cấp mô tả" }]}
        >
          <TextArea
            rows={4}
            placeholder="Mô tả phòng, tiện nghi của phòng và điều gì làm cho phòng trở nên đặc biệt"
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default RoomDetailsSection;
