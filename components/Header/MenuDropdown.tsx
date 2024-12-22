import { useRouter } from "@/hooks/useRouter";
import {
  ApartmentOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  EditOutlined,
  FileTextOutlined,
  GiftOutlined,
  HomeOutlined,
  MenuOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import useViewportWidth from "../../hooks/useWitdhViewPoint";

const MenuDropdown = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const navigate = useRouter(); // Hook điều hướng
  const viewportWidth = useViewportWidth();
  const menuItems = [
    {
      key: "1",
      label: "Next Sản Phẩm",
      icon: <ApartmentOutlined />,
      link: "/rooms",
    },
    {
      key: "2",
      label: "Next tin tức",
      icon: <ProfileOutlined />,
      link: "/news",
    },
    {
      key: "3",
      label: "Next Dịch Vụ",
      icon: <AppstoreAddOutlined />,
      link: "/products",
    },
    {
      key: "4",
      label: "Đóng góp ý kiến",
      icon: <ShopOutlined />,
      link: "/dong-gop-y-kien",
    },
    {
      key: "5",
      label: "Đăng tin",
      icon: <EditOutlined />,
      link: "/dang-tin",
    },
    {
      key: "6",
      label: "Trợ giúp",
      icon: <UserOutlined />,
      link: "/tro-giup",
    },
    {
      key: "7",
      label: "Đăng chỗ nghỉ của Quý vị",
      icon: <HomeOutlined />,
      link: "/host",
    },
    {
      key: "8",
      label: "Về Nextlife",
      icon: <AppstoreOutlined />,
      link: "/about",
    },
    {
      key: "9",
      label: "Cơ hội việc làm",
      icon: <TeamOutlined />,
      link: "/careers",
    },
    {
      key: "10",
      label: "Trở thành đối tác phân phối",
      icon: <BarChartOutlined />,
      link: "/partners",
    },
    {
      key: "11",
      label: "Bảo mật & Cookie",
      icon: <SafetyCertificateOutlined />,
      link: "/privacy",
    },
    {
      key: "12",
      label: "Điều khoản và điều kiện",
      icon: <BookOutlined />,
      link: "/terms",
    },
  ];

  // Mở Drawer
  const showDrawer = () => setDrawerVisible(true);

  // Đóng Drawer
  const closeDrawer = () => setDrawerVisible(false);

  // Xử lý khi click item trong menu
  const handleMenuClick = (link: string) => {
    navigate.push(link); // Điều hướng tới link tương ứng
    closeDrawer(); // Đóng Drawer sau khi điều hướng
  };

  return (
    <>
      <Button
        onClick={showDrawer}
        className="bg-[#60A5FA] border-none text-white flex items-center"
      >
        <MenuOutlined style={{ height: "12px" }} />
        {viewportWidth > 700 && (
          <span className="ml-1 hidden sm:inline">Danh mục</span>
        )}
      </Button>

      <Drawer
        title="Danh mục"
        placement="left"
        onClose={closeDrawer}
        open={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
        width="100vw"
      >
        <div className="flex flex-col gap-4 text-lg">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className="flex text-left px-4 py-2 hover:bg-gray-200 w-full border-none"
              onClick={() => handleMenuClick(item.link)}
            >
              {item.icon} <span className="ml-2">{item.label}</span>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default MenuDropdown;
