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
import { SettingOutlined } from "@ant-design/icons";
import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
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

        <Link href="messages">
          <Tooltip title="Tin nhắn">
            <Button
              type="text"
              icon={<MessageOutlined />}
              style={{ color: "#FFF" }}
            />
          </Tooltip>
        </Link>

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
