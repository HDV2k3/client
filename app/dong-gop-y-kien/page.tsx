"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";

interface FormData {
  title: string;
  description: string;
  category: string;
}

interface Errors {
  title?: string;
  description?: string;
  category?: string;
}

const IdeaContributionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Bất động sản nhà ở",
    "Bất động sản thương mại",
    "Bất động sản công nghiệp",
    "Phát triển đất đai",
    "Quản lý bất động sản",
  ];

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề không được để trống";
    }
    if (formData.description.trim().length < 20) {
      newErrors.description = "Mô tả phải dài ít nhất 20 ký tự";
    }
    if (!formData.category) {
      newErrors.category = "Vui lòng chọn một danh mục";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", formData);
        setFormData({ title: "", description: "", category: "" });
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-48">
            <Image
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="alt"
              width={100}
              height={100}
            />

            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Chia sẻ ý tưởng bất động sản của bạn
                </h1>
                <p className="text-gray-200">
                  Đóng góp vào tương lai phát triển bất động sản
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tiêu đề ý tưởng
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                  aria-label="Idea title"
                  autoComplete="off"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Loại
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                  aria-label="Select category"
                >
                  <option value="">Chọn một danh mục</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                aria-label="Idea description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Đang gửi...
                  </>
                ) : (
                  "Submit Idea"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IdeaContributionForm;
