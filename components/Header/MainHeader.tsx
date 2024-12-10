import { Button, Tooltip, Dropdown } from "antd";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";
import {
  BellOutlined,
  FormOutlined,
  MessageOutlined,
  ShoppingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
import { useRouter } from '@/hooks/useRouter';
import MyAds from "./MyAds";
import useViewportWidth from '../../hooks/useWitdhViewPoint';
import useLanguge from "@/hooks/useLanguge";

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
  const { lang, getLanguge, setLanguge, LangugeOptions } = useLanguge();
  const router = useRouter();
  const viewportWidth = useViewportWidth();

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

  const menuItems = [
    {
      key: "1",
      label: (
        <Tooltip title="Thông báo">
          <NotificationButton viewportWidth={viewportWidth} />
        </Tooltip>
      )
    },
    {
      key: "2",
      label: (
        <div onClick={handleMessagesClick}>
          <Tooltip title="Tin nhắn">
            <Button
              type="text"
              icon={<MessageOutlined />}
              style={{ color: "black" }}
            >
              <span>Tin nhắn</span>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          <Tooltip title="Cài đặt">
            <SettingsButton viewportWidth={viewportWidth} />
          </Tooltip>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div>
          <Tooltip title="Tin đăng">
            <MyAds viewportWidth={viewportWidth} />
          </Tooltip>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <UserMenu
          viewportWidth={viewportWidth}
          userName={userName}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          logOut={logOut}
          profile={profile}
          deposit={deposit}
        />
      ),
    },
  ];

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
      {viewportWidth < 1000 ? (
        <Tooltip title="Cá nhân">
          <Dropdown
            menu={{
              items: menuItems, // Pass the updated menuItems array here
            }}
            placement="bottomLeft"
            trigger={['click']}
          >
            <Button
              className="bg-[#60A5FA] border-none text-white flex items-center mr-[10px]"
            >
              <MenuOutlined style={{ height: "12px" }} />
            </Button>
          </Dropdown>
        </Tooltip>
      ) : (
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
        </div>
      )}

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
    </div >
  );
};

export default MainHeader;
