import { Button, Tooltip } from "antd";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";
import {
  BellOutlined,
  FormOutlined,
  MessageOutlined,
  ShoppingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
import { useRouter } from "next/navigation";
import MyAds from "./MyAds";

interface MainHeaderProps {
  userName: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  logOut: string;
  profile: string;
  deposit: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  userName,
  isLoggedIn,
  onLogout,
  logOut,
  profile,
  deposit,
}) => {
  const router = useRouter();

  const hasToken = (): boolean => {
    return (
      !!document.cookie.includes("token") || !!localStorage.getItem("token")
    );
  };

  const handleMessagesClick = () => {
    if (!hasToken()) {
      router.push(`/login?callbackUrl=${window.location.href}`);
    } else {
      router.push("/messages");
    }
  };

  const handlePostClick = () => {
    if (!hasToken()) {
 
     router.push(`/login?callbackUrl=${window.location.href}`);
    } else {
      router.push("/dang-tin");
    }
  };
  return (
    <div className="flex items-center justify-between w-full py-2 ">
      {/* Logo và Menu Dropdown */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-xl sm:text-2xl font-bold text-white">
            NextLife
          </span>
        </Link>
        <MenuDropdown />
      </div>

      {/* Thanh Tìm Kiếm */}
      <div className="flex-1 mx-4">
        <SearchBar />
      </div>

      {/* Các nút chức năng */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Tooltip title="Thông báo">
          <NotificationButton />
        </Tooltip>

        <Tooltip title="Tin nhắn">
          <Button
            type="text"
            icon={<MessageOutlined />}
            style={{ color: "#FFF" }}
            onClick={handleMessagesClick}
          />
        </Tooltip>

        <Tooltip title="Cài đặt">
          <SettingsButton />
        </Tooltip>
        <Tooltip title="Tin đăng">
          <MyAds />
        </Tooltip>
        <UserMenu
          userName={userName}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          logOut={logOut}
          profile={profile}
          deposit={deposit}
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
