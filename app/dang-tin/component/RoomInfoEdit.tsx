import React from "react";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import { typeRoom, styleRoom, floorRoom } from "../constant/index";

const RoomDetailsSection: React.FC = () => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Thông tin trong phòng
      </h3>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item
          name={["roomInfo", "name"]}
          label="Tên phòng"
          rules={[{ required: true, message: "Tên phòng là bắt buộc" }]}
        >
          <Input placeholder="Phòng 101" className="w-full" />
        </Form.Item>

        <Form.Item
          name={["roomInfo", "type"]}
          label="Loại phòng"
          rules={[{ required: true, message: "Chọn loại phòng" }]}
        >
          <Select placeholder="Chọn loại phòng" className="w-full">
            {typeRoom.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={["roomInfo", "style"]}
          label="Phong cách của phòng"
        >
          <Select placeholder="Phong cách của phòng" className="w-full">
            {styleRoom.map((style) => (
              <Option key={style} value={style}>
                {style}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item
          name={["roomInfo", "floor"]}
          label="Sàn phòng"
        >
          <Select placeholder="Sàn của phòng" className="w-full">
            {floorRoom.map((floor) => (
              <Option key={floor} value={floor}>
                {floor}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={["roomInfo", "availableFromDate"]}
          label="Ngày mở cho thuê vào"
          rules={[{ required: true, message: "Vui lòng chọn ngày có sẵn" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Chiều rộng phòng (m)", name: "width", min: 1 },
          { label: "Chiều cao (m)", name: "height", min: 1 },
          { label: "Số lượng phòng ngủ", name: "numberOfBedrooms", min: 0 },
        ].map((item) => (
          <Form.Item
            key={item.name}
            name={["roomInfo", item.name]}
            label={item.label}
            rules={[
              { type: "number", min: item.min, message: `${item.label} không hợp lệ` },
            ]}
          >
            <InputNumber
              type="number"
              style={{ width: '100%', minWidth: '150px' }}
              placeholder={item.label}
              min={item.min}
            />
          </Form.Item>
        ))}
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 gap-4">
        <Form.Item
          name={["roomInfo", "address"]}
          label="Địa chỉ phòng"
          rules={[{ required: true, message: "Vui lòng cung cấp địa chỉ" }]}
        >
          <Input placeholder="HCM" className="w-full" />
        </Form.Item>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-1 gap-4">
        <Form.Item
          name={["roomInfo", "description"]}
          label="Mô tả phòng"
          rules={[{ required: true, message: "Vui lòng cung cấp mô tả" }]}
        >
          <TextArea
            rows={4}
            placeholder="Mô tả phòng, tiện nghi của phòng và điều gì làm cho phòng trở nên đặc biệt"
            className="w-full"
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default RoomDetailsSection;
