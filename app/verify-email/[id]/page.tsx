"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { API_USER } from "@/service/constants";

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
  const tokenVerify = useParams().id;

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
          `${API_USER}/users/verify-email?token=${tokenVerify}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 400
              ? "Invalid or expired verification token"
              : "Verification failed. Please try again."
          );
        }

        setNotification({
          isOpen: true,
          type: "success",
          title: "Verification Successful",
          message: "Your email has been verified successfully!",
        });

        // Redirect after successful verification
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } catch (error) {
        setNotification({
          isOpen: true,
          type: "error",
          title: "Error",
          message:
            error instanceof Error ? error.message : "Verification failed",
        });
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
