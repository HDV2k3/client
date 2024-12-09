import { useState } from "react";

interface RegistrationFormProps {
  onSubmit: (formData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dayOfBirth: string;
  }) => void;
  isLoading: boolean; // Thêm trạng thái loading
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dayOfBirth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {[
        {
          id: "email",
          type: "email",
          label: "Email address",
          value: formData.email,
        },
        {
          id: "password",
          type: "password",
          label: "Password",
          value: formData.password,
        },
        {
          id: "firstName",
          type: "text",
          label: "First Name",
          value: formData.firstName,
        },
        {
          id: "lastName",
          type: "text",
          label: "Last Name",
          value: formData.lastName,
        },
        {
          id: "dayOfBirth",
          type: "date",
          label: "Date of Birth",
          value: formData.dayOfBirth,
        },
      ].map(({ id, type, label, value }) => (
        <div key={id}>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <div className="mt-1">
            <input
              id={id}
              name={id}
              type={type}
              required
              value={value}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      ))}
      <div>
        <button
          type="submit"
          disabled={isLoading} // Disable nút khi đang loading
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
