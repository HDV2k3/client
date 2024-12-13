"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "@/hooks/useRouter";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const callbackUrl = isClient
    ? new URLSearchParams(window.location.search).get("callbackUrl") || "/"
    : "/";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || document.cookie.includes("token=");
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen m-w-[1280px] flex flex-col md:flex-row justify-center items-center">
      <div className="hidden md:flex w-[380px] h-[740px] rounded-[60px] bg-black justify-center items-center p-5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative">
        <div className="w-[200px] h-[30px] bg-black rounded-b-[20px] absolute top-2 z-10" />
        <div className="w-full h-full bg-white rounded-[50px] overflow-hidden flex justify-center items-center relative">
          <Image
            src={'/assets/images/NextLife_Background.png'}
            alt="Background"
            width={370}
            height={740}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br py-8 px-4 md:py-12 md:px-8">
        <div className="max-w-md w-full space-y-6 bg-white p-6 md:p-10 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div className="space-y-4">
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
                  className="appearance-none block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <p className="text-center text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800"
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
