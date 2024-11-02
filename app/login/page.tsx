"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link component
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://user-cicd-env.eba-wjfksigh.ap-southeast-2.elasticbeanstalk.com/user/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data && response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        document.cookie = `token=${response.data.data.token}; path=/; max-age=86400`;

        // Phát sự kiện 'userLogin' khi đăng nhập thành công
        window.dispatchEvent(new Event("userLogin"));

        router.push("/"); // chuyển hướng đến trang chủ hoặc trang khác
      } else {
        setError("Invalid login response. Please try again.");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Half with Real Estate Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("/real-estate-image.jpg")' }}
      >
        {/* Adjust image path above as per your image source */}
      </div>

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
            <Link href="/forgot-password" passHref>
              <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                Quên mật khẩu?
              </span>
            </Link>
          </div>

          {/* Link to Register */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" passHref>
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                Đăng ký ngay
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
