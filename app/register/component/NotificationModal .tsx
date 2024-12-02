"use client";
import React, { useEffect, useState } from "react";
import {
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsXCircleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

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
        className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
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
                  className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    button.className ||
                    "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
                  }`}
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

export default NotificationModal;
