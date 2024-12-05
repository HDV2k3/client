import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface EditProfileModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues: any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Chỉnh Sửa Thông Tin Cá Nhân"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Hủy</Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()} className="bg-blue-500">Lưu Thay Đổi</Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
        <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Vui lòng nhập email" }, { type: "email", message: "Email không hợp lệ" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Số Điện Thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
