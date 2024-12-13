import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
interface PaymentMethod {
  logo: string;
  key: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  onClick: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethod> = ({
  logo,
  name,
  icon,
  key,
  color,
  description,
  onClick,
}) => {
  return (
    <motion.div
      style={{
        height: 300, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${color} rounded-lg shadow-md p-4 text-center cursor-pointer`}
      onClick={onClick}
    >
      <span>
        <Image
          src={logo} alt="Logo"
          width={name === 'Momo' ? 75 : 150}
          height={name === 'Momo' ? 75 : 150}
        />
      </span>
      <span style={{ marginTop: name === 'Momo' ? 10 : 35, fontSize: 20, fontWeight: 600, display: 'block', }}>{name}</span>
      <span className="text-sm">
        {description}
      </span>
    </motion.div>
  );
};

export default PaymentMethodCard;
