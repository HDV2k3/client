import { Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  userName: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  logOut: string;
}

const UserMenu = ({
  userName,
  isLoggedIn,
  onLogout,
  logOut,
}: UserMenuProps) => {
  const router = useRouter();

  const userMenuItems = [
    {
      key: "1",
      label: "Tài khoản của tôi",
      onClick: () => router.push("/profile"),
    },
    {
      key: "2",
      label: logOut,
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: userMenuItems }}>
      <Button
        type="text"
        icon={<UserOutlined />}
        style={{ color: "#FFF" }}
        onClick={() => !isLoggedIn && router.push("/login")}
      >
        <span className="hidden sm:inline">{userName}</span>
      </Button>
    </Dropdown>
  );
};

export default UserMenu;
