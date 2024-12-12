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
  UserOutlined
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
      label: "Next Rooms",
      icon: <ApartmentOutlined />,
      link: "/rooms",
    },
    { key: "2", label: "Next New", icon: <ProfileOutlined />, link: "/rooms" },
    {
      key: "3",
      label: "Next Other",
      icon: <AppstoreAddOutlined />,
      link: "/rooms",
    },
    {
      key: "4",
      label: "Next Products",
      icon: <ShopOutlined />,
      link: "/products",
    },
    {
      key: "5",
      label: "Đăng tin",
      icon: <EditOutlined />,
      link: "/dang-tin",
    },
    {
      key: "6",
      label: "Chương trình khách hàng thân thiết Genius",
      icon: <UserOutlined />,
      link: "/genius",
    },
    {
      key: "7",
      label: "Đăng chỗ nghỉ của Quý vị",
      icon: <HomeOutlined />,
      link: "/host",
    },
    {
      key: "8",
      label: "Liên hệ Dịch vụ Khách hàng",
      icon: <CustomerServiceOutlined />,
      link: "/contact",
    },
    {
      key: "9",
      label: "Tranh chấp đối tác",
      icon: <SyncOutlined />,
      link: "/dispute",
    },
    {
      key: "10",
      label: "Ưu đãi theo mùa và dịp lễ",
      icon: <GiftOutlined />,
      link: "/offers",
    },
    {
      key: "11",
      label: "Bài viết về du lịch",
      icon: <FileTextOutlined />,
      link: "/articles",
    },
    {
      key: "12",
      label: "Về Nextlife",
      icon: <AppstoreOutlined />,
      link: "/about",
    },
    {
      key: "13",
      label: "Cơ hội việc làm",
      icon: <TeamOutlined />,
      link: "/careers",
    },
    {
      key: "14",
      label: "Trở thành đối tác phân phối",
      icon: <BarChartOutlined />,
      link: "/partners",
    },
    {
      key: "15",
      label: "Bảo mật & Cookie",
      icon: <SafetyCertificateOutlined />,
      link: "/privacy",
    },
    {
      key: "16",
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
