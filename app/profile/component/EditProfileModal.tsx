import React from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";

interface EditProfileModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues: any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Chỉnh Sửa Thông Tin Cá Nhân"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          className="bg-blue-500"
        >
          Lưu Thay Đổi
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          name="firstName"
          label="Họ"
          rules={[{ required: true, message: "Vui lòng nhập họ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Vui lòng nhập email" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật Khẩu"
          rules={[{ min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới (nếu muốn thay đổi)" />
        </Form.Item>

        <Form.Item
          name="dayOfBirth"
          label="Ngày Sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
