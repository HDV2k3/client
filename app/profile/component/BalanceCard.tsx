'use client';
import React, { useState, useEffect } from "react";
import { Button, Card, message, Typography } from "antd";
const { Title } = Typography;

const BalanceCard: React.FC = () => {
  const [balance, setBalance] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/userPayment/getUserPayment`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const response = await res.json();
        console.log('check res: ', response?.data?.balance);

        if (res.ok) {
          setBalance(response.data.balance);
        } else {
          message.error('Lỗi')
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

  const handleCreatePayment = async () => {
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/userPayment/create/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await res.json();
    if (response.ok) {
      message.success('Tạo ví thành công');
      setBalance(0);
    }
  }

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

  if (balance === -1) {
    return (
      <>
        chuaw co vis
        <Button onClick={handleCreatePayment}>Taoj vi</Button>
      </>
    )
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
      {balance === -1 ?
        <>
          chuaw co vis
          <Button onClick={handleCreatePayment}>Taoj vi</Button>
        </>
        : <>
          <div className="text-center">
            <Title level={3}>Số Dư Tài Khoản</Title>
            <Title level={2} className="text-green-600">
              {balance.toLocaleString()} VND
            </Title>
          </div>
        </>}
    </Card>
  );
};

export default BalanceCard;
