"use client";
import React, { useState } from "react";
import { useRouter } from '@/hooks/useRouter';
import RegistrationForm from "./component/RegistrationForm";
import { notificationService } from "../dang-tin/service/notificationService"; // Import notification service
import { notification } from "antd";
import { notificationServiceRegister } from "./services/notification";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  const handleRegistration = async (formData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dayOfBirth: string;
  }) => {
    setIsLoading(true); // Bật trạng thái loading
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_USER}/users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        notificationServiceRegister.createSuccess();
        const responseData = await response.json();
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userPassword", formData.password);
        localStorage.setItem(
          "verifiedToken",
          responseData.data.verificationToken
        );
        setTimeout(() => router.push("/verification"), 1000); // Chuyển hướng đến trang xác minh
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error) {
      notificationServiceRegister.saveError();
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegistrationForm
            onSubmit={handleRegistration}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
