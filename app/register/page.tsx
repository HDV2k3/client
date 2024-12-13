"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "@/hooks/useRouter";
import dynamic from "next/dynamic";
import { notificationServiceRegister } from "./services/notification";
import getToken from "@/utils/getTokenLocalStorage";
import { redirect } from "next/navigation";

const RegistrationFormLazy = dynamic(
  () => import("./component/RegistrationForm"),
  {
    loading: () => <p>Đang tải...</p>,
  }
);

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isTokenChecked, setIsTokenChecked] = useState(false); // Token check state

  useEffect(() => {
    const token = getToken();
    if (token) redirect("/");
    else setIsTokenChecked(true);
  }, []);

  const handleRegistration = async (formData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dayOfBirth: string;
  }) => {
    setIsLoading(true);
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
        setTimeout(() => router.push("/verification"), 1000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error) {
      notificationServiceRegister.saveError();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Kiểm tra xác thực...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng ký tài khoản của bạn
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegistrationFormLazy
            onSubmit={handleRegistration}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
