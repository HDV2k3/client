import { useRouter } from '@/hooks/useRouter'; // Import useNavigate
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import useViewportWidth from '../../hooks/useWitdhViewPoint';
const MenuDropdown = () => {
  const navigate = useRouter(); // Hook điều hướng
  const viewportWidth = useViewportWidth();
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
      menu={{ items: menuItems, onClick: handleMenuClick }} // Add onClick event
      placement="bottomLeft"
    >
      <Button
        className="bg-[#60A5FA] border-none text-white flex items-center"
      >
        <MenuOutlined style={{ height: "12px" }} />
        {viewportWidth > 700 &&
          <>
            <span className="ml-1 hidden sm:inline">Danh mục</span>
            <DownOutlined style={{ marginLeft: '10px' }} />
          </>
        }
      </Button>
    </Dropdown>
  );
};

export default MenuDropdown;
