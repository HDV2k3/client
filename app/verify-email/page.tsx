"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationState {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const verifyEmail = async () => {
      // Get token from URL instead of localStorage
      const token = localStorage.getItem("verifiedToken");

      if (!token) {
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
          `http://user-cicd-env.eba-wjfksigh.ap-southeast-2.elasticbeanstalk.com/user/users/verify-email?token=${token}`,
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
  }, [searchParams, router]);

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
