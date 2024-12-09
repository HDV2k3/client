import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { SolutionOutlined } from "@ant-design/icons";
type Props = {
  viewportWidth?: number;
}
const MyAds = ({ viewportWidth = 1280 }: Props) => {
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
        style={{ color: viewportWidth < 1000 ? 'black' : "#FFF" }}
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
