// "use client";
// import React, { useEffect, useState } from "react";
// import { Result, Button, message } from "antd";
// import Link from "next/link";
// import { CheckCircleOutlined } from "@ant-design/icons";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";

import { edgeServerAppPaths } from "next/dist/build/webpack/plugins/pages-manifest-plugin";

// const CheckoutSuccess: React.FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isValidPayment, setIsValidPayment] = useState(false);

//   useEffect(() => {
//     const validatePayment = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Retrieve token from local storage
//         if (!token) {
//           message.error("Vui lòng đăng nhập để thực hiện giao dịch");
//           router.push("/login");
//           return;
//         }

//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL_PAYMENT}/vnPay/vnpay-payment-return`,
//           {
//             params: Object.fromEntries(searchParams),
//             headers: {
//               Authorization: `Bearer ${token}`, // Add the Authorization header
//             },
//           }
//         );

//         if (response.data.message === "Success") {
//           setIsValidPayment(true);
//         } else {
//           router.push("/checkout/error");
//         }
//       } catch (error) {
//         message.error("Lỗi xác minh thanh toán");
//         router.push("/checkout/error");
//       }
//     };

//     validatePayment();
//   }, [searchParams, router]);

//   if (!isValidPayment) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <Result
//         icon={<CheckCircleOutlined className="text-green-500 text-6xl" />}
//         title={
//           <span className="text-2xl font-bold text-green-600">
//             Thanh toán thành công!
//           </span>
//         }
//         subTitle="Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý."
//         extra={[
//           <Link href="/" key="home">
//             <Button type="primary" className="mr-4">
//               Về trang chủ
//             </Button>
//           </Link>,
//           <Link href="/dang-tin" key="dang-tin">
//             <Button>Đăng tin ngay</Button>
//           </Link>,
//         ]}
//         className="bg-white rounded-xl shadow-lg p-8"
//       />
//     </div>
//   );
// };

// export default CheckoutSuccess;


import MainCheckout from '@/app/checkoutSuccess/component/CheckoutOutMain'

export default function PageCheckout() {
  // return <MainCheckout />
  return <></>
}