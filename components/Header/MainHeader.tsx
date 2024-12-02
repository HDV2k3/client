import { Button, Tooltip } from "antd";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";
import {
  BellOutlined,
  FormOutlined,
  MessageOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
import { useRouter } from "next/navigation";

interface MainHeaderProps {
  userName: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  logOut: string;
  profile: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  userName,
  isLoggedIn,
  onLogout,
  logOut,
  profile,
}) => {
  const router = useRouter();

  // Hàm kiểm tra xem có token không
  const hasToken = (): boolean => {
    // Kiểm tra trong cookie hoặc localStorage
    return (
      !!document.cookie.includes("token") || !!localStorage.getItem("token")
    );
  };

  // Hàm xử lý khi nhấp vào tin nhắn
  const handleMessagesClick = () => {
    if (!hasToken()) {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      router.push(`/login?callbackUrl=${window.location.href}`);
    } else {
      // Nếu có token, chuyển hướng đến trang tin nhắn
      router.push("/messages");
    }
  };
  const handlePostClick = () => {
    if (!hasToken()) {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      router.push(`/login?callbackUrl=${window.location.href}`);
    } else {
      // Nếu có token, chuyển hướng đến trang tin nhắn
      router.push("/dang-tin");
    }
  };
  return (
    <div className="flex items-center justify-between flex-wrap">
      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
        <Link href="/">
          <span className="text-xl sm:text-2xl font-bold text-white">
            NextLife
          </span>
        </Link>
        <MenuDropdown />
      </div>

      <SearchBar />

      <div className="flex items-center space-x-2 sm:space-x-4">
        <Tooltip title="Thông báo">
          <NotificationButton />
        </Tooltip>

        <Tooltip title="Tin nhắn">
          <Button
            type="text"
            icon={<MessageOutlined />}
            style={{ color: "#FFF" }}
            onClick={handleMessagesClick} // Gọi hàm kiểm tra khi nhấp vào tin nhắn
          />
        </Tooltip>

        <Tooltip title="Cài đặt">
          <SettingsButton />
        </Tooltip>

        <UserMenu
          userName={userName}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          logOut={logOut}
          profile={profile}
        />

        <Tooltip title="Đăng tin">
          <Button
            icon={<FormOutlined />}
            onClick={handlePostClick}
            style={{
              backgroundColor: "#FF8800",
              color: "#FFF",
              border: "none",
            }}
          >
            <span className="hidden sm:inline">ĐĂNG TIN</span>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MainHeader;
