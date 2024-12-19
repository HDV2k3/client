"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { notificationServiceVerify_Email } from "../services/notification";
import axios from "axios";
import { set } from "nprogress";

interface NotificationState {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const tokenVerify = useParams().id;

  let tokenAuth = "";

  useEffect(() => {
    const verifyEmail = async () => {
      if (!tokenVerify) {
        setNotification({
          isOpen: true,
          type: "error",
          title: "Error",
          message: "Verification token is missing",
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_USER}/users/verify-email?token=${tokenVerify}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Error verify: ", response);
        }

        setNotification({
          isOpen: true,
          type: "success",
          title: "Verification Successful",
          message: "Your email has been verified successfully!",
        });
        notificationServiceVerify_Email.verifySuccess();

        const email = localStorage.getItem("userEmail");
        const password = localStorage.getItem("userPassword");
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL_USER}/auth/login`,
            {
              email,
              password,
            }
          );

          if (response.data && response.data.data.token) {
            const token = response.data.data.token;
            setToken(token);
            setUserId(response.data.data.id);
            localStorage.setItem("token", token);
          }
        } catch (error) {}
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/userPayment/create/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error("Error verifying email:", error);
        }
        setToken("");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPassword");
        // Redirect after successful verification
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } catch (error) {
        console.error("Error verify: ", error);
        // setNotification({
        //   isOpen: true,
        //   type: "error",
        //   title: "Error",
        //   message:
        //     error instanceof Error ? error.message : "Verification failed",
        // });
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {isLoading ? "Verifying Email..." : notification.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            {isLoading
              ? "Please wait while we verify your email address."
              : notification.message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
