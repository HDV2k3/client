import React from "react";
import { Modal, Button } from "antd";
import DepositForm from "./DepositForm";

interface DepositModalProps {
  visible: boolean;
  method: { name: string; fields: { name: string; label: string; type: string }[] } | null;
  form: any;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({
  visible,
  method,
  form,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  return (
    <Modal
      title={`Nạp Tiền Qua ${method?.name}`}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onSubmit}
          loading={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Xác Nhận Nạp Tiền
        </Button>,
      ]}
      width={500}
    >
      {method && <DepositForm form={form} fields={method.fields} />}
    </Modal>
  );
};

export default DepositModal;
