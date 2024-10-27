import { Button } from "antd";
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

interface MainHeaderProps {
  userName: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  logOut: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  userName,
  isLoggedIn,
  onLogout,
  logOut,
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
        <Button type="text" icon={<BellOutlined />} style={{ color: "#FFF" }} />
        <Button
          type="text"
          icon={<MessageOutlined />}
          style={{ color: "#FFF" }}
        />
        <Button
          type="text"
          icon={<ShoppingOutlined />}
          style={{ color: "#FFF" }}
        />
        <UserMenu
          userName={userName}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          logOut={logOut}
        />
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
      </div>
    </div>
  );
};

export default MainHeader;
