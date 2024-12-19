"use client";
import { useEffect, useState } from "react";
import {
  FaSpinner,
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaComments,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { message } from "antd";

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  content: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const HelpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    subject: "",
    content: "",
  });
  const [token, setToken] = useState<string | null>(null);

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const router = useRouter();
  const faqData: FaqItem[] = [
    {
      question: "Làm thế nào để tôi gửi ý tưởng bất động sản?",
      answer:
        "Nhấp vào nút 'Gửi ý tưởng' và điền vào biểu mẫu với khái niệm phát triển bất động sản của bạn.",
    },
    {
      question: "Tôi có thể gửi những loại ý tưởng nào??",
      answer:
        "Chúng tôi chấp nhận các ý tưởng liên quan đến bất động sản nhà ở, bất động sản thương mại, bất động sản công nghiệp, phát triển đất đai và quản lý bất động sản.",
    },
    {
      question: "Quá trình xem xét mất bao lâu?",
      answer:
        "Nhóm của chúng tôi thường xem xét các bài nộp trong vòng 5-7 ngày làm việc.",
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const supportRequest = { ...formData };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_USER}/users/support`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(supportRequest),
          }
        );
        console.log("Support request submitted:", formData);
        setFormData({ fullName: "", email: "", subject: "", content: "" });
        if (response.ok) {
          message.success("Gửi yêu cầu hỗ trợ thành công");
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleChatWithAdmin = () => {
    if (token) {
      message.success("Đã chuyển đến trang hỗ trợ");
      router.push("/messages/18");
    } else {
      message.warning("Vui lòng đăng nhập");
      router.push("/login");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FaQuestionCircle className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chúng tôi có thể giúp gì cho bạn?
          </h1>
          <p className="text-xl text-gray-600">
            Tìm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ với nhóm hỗ
            trợ của chúng tôi
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Những câu hỏi thường gặp
          </h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bạn vẫn cần trợ giúp?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin liên lạc
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-600 mr-3" />
                    <span className="text-gray-600">nextlife@odayok.com</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-600 mr-3" />
                    <span className="text-gray-600">+84 329-615-309</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleChatWithAdmin}
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaComments className="mr-2" />
                    Nhắn tin ngay với nhân viên
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nội dung
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    value={formData.content}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                      errors.content ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.content}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Gửi...
                    </>
                  ) : (
                    "Gửi nội dung"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
