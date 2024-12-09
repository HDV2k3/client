// import React from "react";
// import { Card, Typography } from "antd";

// const { Title } = Typography;

// interface BalanceCardProps {
//   balance: number;
// }

// const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => (
//   <Card>
//     <div className="text-center">
//       <Title level={3}>Số Dư Tài Khoản</Title>
//       <Title level={2} className="text-green-600">{balance.toLocaleString()} VND</Title>
//     </div>
//   </Card>
// );

// export default BalanceCard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "antd";

const { Title } = Typography;

interface UserPaymentResponse {
  responseCode: number;
  data: {
    balance: number;
    userResponse: {
      // other user details
    };
  };
  message: string;
}

const BalanceCard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<UserPaymentResponse>(
          // "http://localhost:8084/payment/userPayment/getUserPayment",
          `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/userPayment/getUserPayment`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.message === "Success") {
          setBalance(response.data.data.balance);
        } else {
          setError("Failed to fetch balance");
        }
      } catch (err) {
        setError("Error fetching balance");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBalance();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <div className="text-center">
          <Title level={3}>Số Dư Tài Khoản</Title>
          <Title level={2}>Đang tải...</Title>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center">
          <Title level={3}>Số Dư Tài Khoản</Title>
          <Title level={2} className="text-red-600">
            {error}
          </Title>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="text-center">
        <Title level={3}>Số Dư Tài Khoản</Title>
        <Title level={2} className="text-green-600">
          {balance.toLocaleString()} VND
        </Title>
      </div>
    </Card>
  );
};

export default BalanceCard;
