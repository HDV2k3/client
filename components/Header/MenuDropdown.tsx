import { Dropdown, Button } from "antd";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"; // Import useNavigate

const MenuDropdown = () => {
  const navigate = useRouter(); // Hook điều hướng

  // Mảng các item dropdown với link tương ứng
  const menuItems = [
    { key: "1", label: "Căn Hộ Xịn", link: "/rooms" },
    { key: "2", label: "Nhà Xịn", link: "/rooms" },
    { key: "3", label: "Phòng Xịn", link: "/rooms" },
  ];

  // Hàm handle click item trong dropdown
  const handleMenuClick = (e: any) => {
    const selectedItem = menuItems.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate.push(selectedItem.link); // Điều hướng tới link tương ứng
    }
  };

  return (
    <Dropdown
      menu={{ items: menuItems, onClick: handleMenuClick }} // Thêm sự kiện onClick
      placement="bottomLeft"
    >
      <Button className="bg-[#60A5FA] border-none text-white flex items-center ">
        <MenuOutlined style={{ height: "12px" }} />
        <span className="ml-1">Danh mục</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default MenuDropdown;
