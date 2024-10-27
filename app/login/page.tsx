"use client"; // chỉ ra đây là một component client-side
import { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const response = await axios.post(
        "http://user-cicd-env.eba-wjfksigh.ap-southeast-2.elasticbeanstalk.com/user/auth/login",
        values
      );
      // Xử lý phản hồi từ server
      console.log(response);
      message.success("Đăng nhập thành công!");
      // Có thể chuyển hướng đến trang khác hoặc lưu token ở đây
      localStorage.setItem("token", response.data.data.token);
      const token = localStorage.getItem("token");
      console.log("Token found:", token); // Log token for debugging
      router.push("/home");
      setLoading(false); // Kết thúc trạng thái loading
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Xử lý lỗi từ server
        message.error(`Lỗi: ${error.response.data.message}`);
      } else if (error.request) {
        // Không có phản hồi từ server
        message.error(
          "Không nhận được phản hồi từ server, vui lòng kiểm tra kết nối."
        );
      } else {
        // Lỗi khác
        message.error("Lỗi mạng, vui lòng thử lại!");
      }
      console.error(error);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Đăng Nhập
        </h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              className="rounded-md border-gray-300"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              className="rounded-md border-gray-300"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Đăng Nhập
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
