import { Dropdown, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from '@/hooks/useRouter';

interface UserMenuProps {
  viewportWidth?: number;
  userName: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  logOut: string;
  profile: string;
  deposit: string;
}

const UserMenu = ({
  viewportWidth = 1800,
  userName,
  isLoggedIn,
  onLogout,
  logOut,
  profile,
  deposit,
}: UserMenuProps) => {
  const router = useRouter();

  const userMenuItems = [
    {
      key: "1",
      label: profile,
      onClick: () => router.push("/profile"),
    },
    {
      key: "2",
      label: logOut,
      onClick: onLogout,
    },
    {
      key: "3",
      label: deposit,
      onClick: () => router.push("/deposit"),
    },
  ];

  return isLoggedIn ? (
    <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
      <Button type="text" icon={<UserOutlined />} style={{ color: viewportWidth < 700 ? 'black' : "#FFF" }}>
        <span className="hidden sm:inline">{userName}</span>
        <DownOutlined style={{ marginLeft: 8 }} />
      </Button>
    </Dropdown>
  ) : (
    <Button
      type="text"
      icon={<UserOutlined />}
      style={{ color: viewportWidth < 700 ? 'black' : "#FFF" }}
      onClick={() => router.push("/login")}
    >
      <span className="hidden sm:inline">Đăng nhập</span>
    </Button>
  );
};

export default UserMenu;
