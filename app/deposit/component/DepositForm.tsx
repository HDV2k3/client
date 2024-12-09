import React from "react";
import { Form, Input, Select } from "antd";
import { Rule } from "antd/es/form";

interface Field {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

interface DepositFormProps {
  form: any;
  fields: Field[];
}

const DepositForm: React.FC<DepositFormProps> = ({ form, fields }) => {
  const getFieldRules = (field: { type: string; label: string }) => {
    const rules: Rule[] = [
      { required: true, message: `Vui lòng nhập ${field.label.toLowerCase()}` },
    ];

    if (field.type === "number") {
      rules.push({
        validator: async (_, value) => {
          if (!value) {
            return Promise.reject(`Vui lòng nhập ${field.label.toLowerCase()}`);
          }
          const numberValue = parseFloat(value);
          if (isNaN(numberValue)) {
            return Promise.reject("Vui lòng nhập số hợp lệ");
          }
          if (numberValue < 10000) {
            return Promise.reject("Số tiền tối thiểu là 10,000 VND");
          }
          return Promise.resolve();
        },
      });
    }

    return rules;
  };

  return (
    <Form form={form} layout="vertical">
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={getFieldRules(field)}
        >
          {field.type === "select" && field.options ? (
            <Select placeholder={`Chọn ${field.label.toLowerCase()}`}>
              {field.options.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Input
              type={field.type}
              placeholder={`Nhập ${field.label.toLowerCase()}`}
              onChange={(e) => {
                if (field.type === "number") {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  form.setFieldValue(field.name, value);
                }
              }}
            />
          )}
        </Form.Item>
      ))}
    </Form>
  );
};

export default DepositForm;
