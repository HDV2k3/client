import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { SolutionOutlined } from "@ant-design/icons";
const MyAds = () => {
  const router = useRouter();
  const hasToken = (): boolean => {
    return (
      !!document.cookie.includes("token") || !!localStorage.getItem("token")
    );
  };
  const handleclick = () => {
    if (!hasToken()) {
      router.push(`/login?callbackUrl=${window.location.href}`);
    } else {
      router.push("/quan-ly-tin");
    }
  };
  return (
    <div>
      <Button
        style={{ color: "#FFF" }}
        type="text"
        onClick={handleclick}
        icon={<SolutionOutlined />}
      >
        Quản lý tin
      </Button>
    </div>
  );
};

export default MyAds;
