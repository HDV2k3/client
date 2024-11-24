"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import {
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsXCircleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { API_USER } from "@/service/constants";

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

const RegisterPage: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dayOfBirth: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_USER}/users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setModal({
          isOpen: true,
          type: "success",
          title: "Success",
          message:
            "Registration successful! Redirecting to email verification.",
        });

        // Clear the form data after successful registration
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          dayOfBirth: "",
        });
        localStorage.setItem("userEmail", formData.email);
        const responseData = await response.json();
        localStorage.setItem(
          "verifiedToken",
          responseData.data.verificationToken
        );
        console.log("tokeennn", responseData.data);
        // Redirect to the verification page after a short delay
        setTimeout(() => {
          router.push("/verification"); // Navigate to the verification page
        }, 1000); // Wait for 2 seconds before redirecting
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="dayOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  id="dayOfBirth"
                  name="dayOfBirth"
                  type="date"
                  required
                  value={formData.dayOfBirth}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
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

export default RegisterPage;
