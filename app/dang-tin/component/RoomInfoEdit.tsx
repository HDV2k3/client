import React, { useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import { typeRooms, styleRooms, floorRooms, typeSales } from "../constant/index";
import moment from "moment";
import { districtsType } from "@/constants/districts";
import { addressHCM, getCommuneByIdDistrict } from '@/constants/HCM_address';

interface Commune {
  idDistrict: number;
  idCommune: number;
  name: string;
}

type Props = {
  setValue: (fields: any) => void;
}

const RoomDetailsSection = ({ setValue }: Props) => {
  const [dataCommune, setDataCommune] = useState<Commune[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(-1);

  const { Option } = Select;
  const { TextArea } = Input;

  const handleDistrictChange = (value: number) => {
    setSelectedDistrict(value);
    const communes = getCommuneByIdDistrict(value);
    setDataCommune(communes);

    setValue({
      roomInfo: {
        commune: undefined, // Đặt lại giá trị của commune
      },
    });
  };

  const renderDistrictAndCommune = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <Form.Item
            name={["roomInfo", "address"]}
            label="Địa chỉ phòng"
            rules={[{ required: true, message: "Vui lòng cung cấp địa chỉ" }]}
          >
            <Input placeholder="HCM" className="w-full" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* quan */}
          <Form.Item
            name={["roomInfo", "district"]}
            label="Quận/Huyện"
            rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
          >
            <Select placeholder="Chọn quận/huyện" className="w-full " onChange={handleDistrictChange} >
              {addressHCM.district.map((district) => (
                <Select.Option key={district.idDistrict} value={district.idDistrict}>
                  {district.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* phuong */}
          <Form.Item
            name={["roomInfo", "commune"]}
            label="Phường Xã"
            rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
          >
            <Select placeholder="Chọn phường/xã" className="w-full " disabled={selectedDistrict === -1} >
              {dataCommune && <>
                {dataCommune.map((item) => (
                  <Select.Option key={item.idCommune} value={item.idCommune}>
                    {item.name}
                  </Select.Option>
                ))}
              </>}
            </Select>
          </Form.Item>
        </div>
      </>
    )
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Thông tin trong phòng
      </h3>

      {/* loai bai viet */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <Form.Item
          name={["roomInfo", "typeSale"]}
          label="Loại bài viết"
          rules={[{ required: true, message: "Loại bài viết" }]}
        >
          <Select placeholder="Loại bài viết" className="w-full">
            {typeSales.map((item) => (
              <Option key={item?.index} value={item?.index}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

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
            {typeRooms.map((item) => (
              <Option key={item?.index} value={item?.index}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={["roomInfo", "style"]}
          label="Phong cách của phòng"
        >
          <Select placeholder="Phong cách của phòng" className="w-full">
            {styleRooms.map((item) => (
              <Option key={item?.index} value={item?.index}>
                {item?.label}
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
            {floorRooms.map((item) => (
              <Option key={item?.index} value={item?.index}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={["roomInfo", "availableFromDate"]}
          label="Ngày mở cho thuê vào"
          rules={[{ required: true, message: "Vui lòng chọn ngày có sẵn" }]}
        >
          <DatePicker className="w-full"
            disabledDate={(current) => {
              return current && current < moment().endOf("day");
            }}
          />
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
      <>{renderDistrictAndCommune()}</>

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
