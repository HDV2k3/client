import React from "react";
import { Form, Input, InputNumber, Space, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const RoomPricingSection: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4">Chi tiết giá</h3>
      <div className="grid md:grid-cols-4 gap-5">
        <Form.Item
          name={["pricingDetails", "basePrice"]}
          label="Giá tiền cơ bản"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/₫\s?|,/g, "") as unknown as number
            }
          />
        </Form.Item>
        <Form.Item
          name={["pricingDetails", "electricityCost"]}
          label="Giá tiền điện"
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/₫\s?|,/g, "") as unknown as number
            }
          />
        </Form.Item>
        <Form.Item name={["pricingDetails", "waterCost"]} label="Giá tiền nước">
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/₫\s?|,/g, "") as unknown as number
            }
          />
        </Form.Item>

        <div className="col-span-4">
          <Form.List name={["pricingDetails", "additionalFees"]}>
            {(fields, { add, remove }) => (
              <div>
                <div className="mb-4">
                  <h4 className="text-lg font-medium">
                    Các khoản phí phát sinh
                  </h4>
                </div>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} className="mb-2" align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "type"]}
                      rules={[
                        { required: true, message: "Vui lòng nhập loại phí" },
                      ]}
                    >
                      <Input placeholder="Loại phí" style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "amount"]}
                      rules={[
                        { required: true, message: "Vui lòng nhập số tiền" },
                      ]}
                    >
                      <InputNumber
                        placeholder="Số tiền"
                        style={{ width: 200 }}
                        formatter={(value) =>
                          `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          value?.replace(/₫\s?|,/g, "") as unknown as number
                        }
                      />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => remove(name)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    className="mt-2"
                  >
                    + Thêm Phí Phát Sinh
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </div>
      </div>
    </div>
  );
};

export default RoomPricingSection;
