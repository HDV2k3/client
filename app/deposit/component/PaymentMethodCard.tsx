import React from "react";
import { motion } from "framer-motion";
import { Text } from "lucide-react";

interface PaymentMethod {
  key: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  onClick: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethod> = ({
  name,
  icon,
  color,
  description,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${color} rounded-lg shadow-md p-4 text-center cursor-pointer`}
      onClick={onClick}
    >
      {icon}
      <Text className="block mt-2 font-semibold">{name}</Text>
      <Text type="secondary" className="text-xs">
        {description}
      </Text>
    </motion.div>
  );
};

export default PaymentMethodCard;
