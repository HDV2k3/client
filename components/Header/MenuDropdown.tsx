import { Dropdown, Button } from "antd";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";

const MenuDropdown = () => {
  const menuItems = [
    { key: "1", label: "Căn Hộ Xịn" },
    { key: "2", label: "Nhà Xịn" },
    { key: "3", label: "Phòng Xịn" },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
      <Button className="bg-[#60A5FA] border-none text-white flex items-center ">
        <MenuOutlined style={{ height: "12px" }} />
        <span className="ml-1">Danh mục</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default MenuDropdown;
