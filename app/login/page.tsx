"use client"; // Ensures that this component runs only on the client-side

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // Ensure useSearchParams is only used on the client-side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const callbackUrl = isClient
    ? new URLSearchParams(window.location.search).get("callbackUrl") || "/"
    : "/";

  // Kiểm tra token khi component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || document.cookie.includes("token=");

      // Nếu đã có token, redirect về callbackUrl hoặc trang chủ
      if (token) {
        router.push(callbackUrl);
      }
    }
  }, [callbackUrl, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

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

        // Lưu token vào localStorage và cookie
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);

          // Set cookie với các options bảo mật
          document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;

          // Phát sự kiện 'userLogin'
          window.dispatchEvent(new Event("userLogin"));

          // Redirect về trang được yêu cầu hoặc trang chủ
          router.push(callbackUrl);
        }
      } else {
        setError("Invalid login response. Please try again.");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };

      // Xử lý các loại lỗi cụ thể
      if (error.response?.data?.message === "Invalid credentials") {
        setError("Email hoặc mật khẩu không chính xác");
      } else if (error.response?.data?.message === "User not found") {
        setError("Tài khoản không tồn tại");
      } else if (error.response?.data?.message === "Email not verified") {
        setError("Vui lòng xác thực email trước khi đăng nhập");
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị loading state khi đang chuyển hướng
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Half with Real Estate Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("/real-estate-image.jpg")' }}
      />

      {/* Right Half with Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Link to Forgot Password */}
          <div className="text-center mt-4">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Link to Register */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Bạn chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
