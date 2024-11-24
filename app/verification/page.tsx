"use client";
import { API_USER } from "@/service/constants";
import React, { useState, useEffect } from "react";
import {
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsXCircleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import { FaTimes, FaEnvelope } from "react-icons/fa";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  actionButtons?: { label: string; onClick: () => void; className?: string }[];
  allowBackgroundClick?: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  actionButtons = [],
  allowBackgroundClick = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <BsCheckCircleFill className="text-green-500 text-2xl" />;
      case "warning":
        return (
          <BsExclamationTriangleFill className="text-yellow-500 text-2xl" />
        );
      case "error":
        return <BsXCircleFill className="text-red-500 text-2xl" />;
      default:
        return <BsInfoCircleFill className="text-blue-500 text-2xl" />;
    }
  };

  const getHeaderColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-500";
      case "warning":
        return "bg-yellow-50 border-yellow-500";
      case "error":
        return "bg-red-50 border-red-500";
      default:
        return "bg-blue-50 border-blue-500";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
      onClick={(e) =>
        allowBackgroundClick && e.target === e.currentTarget && onClose()
      }
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div
          className={`flex items-center justify-between p-4 border-b ${getHeaderColor()}`}
        >
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h2 id="modal-title" className="text-lg font-semibold">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full p-1"
            aria-label="Close notification"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-gray-600 text-base whitespace-pre-wrap">
            {message}
          </div>

          {actionButtons.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              {actionButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${button.className || "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"}`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmailVerificationPage: React.FC = () => {
  const [countdown, setCountdown] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "warning" | "error" | "info";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0 && isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, isResendDisabled]);

  const handleResendEmail = async () => {
    try {
      const response = await fetch(
        `${API_USER}/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("verifiedToken"),
          }),
        }
      );
      if (response.ok) {
        setModal({
          isOpen: true,
          type: "success",
          title: "Success",
          message: "Verification email has been resent successfully!",
        });
        setCountdown(60);
        setIsResendDisabled(true);
      } else {
        throw new Error("Failed to resend verification email");
      }
    } catch (error) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: (error as Error).message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <FaEnvelope className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We have sent a verification link to your email address. Please check
            your inbox and click the link to verify your account.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Didn&apos;t receive the email? Check your spam folder or
            </p>
            <button
              onClick={handleResendEmail}
              disabled={isResendDisabled}
              className={`mt-2 text-sm font-medium ${isResendDisabled ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-500"}`}
            >
              {isResendDisabled
                ? `Resend email (${countdown}s)`
                : "Click to resend verification email"}
            </button>
          </div>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Return to login
            </a>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default EmailVerificationPage;
