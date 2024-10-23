"use client";
import { Input, Dropdown, Button, AutoComplete } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
  ShoppingOutlined,
  UserOutlined,
  MenuOutlined,
  DownOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const suggestions = [
    { value: "Studio" },
    { value: "Căn hộ mới" },
    { value: "Phòng mới" },
    { value: "Thân thiện với vật nuôi" },
    { value: "Quận 1" },
  ];

  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (value: string) => {
    setSearchValue(value);
    handleSearch(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  const menuItems = [
    { key: "1", label: "Căn Hộ Tốt" },
    { key: "2", label: "Nhà Tốt" },
    { key: "3", label: "Phòng Tốt Xe" },
    { key: "4", label: "Việc Làm Tốt" },
  ];

  return (
    <header
      className="bg-[#1E3A8A] py-2 sticky top-0 z-50"
      style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="container mx-auto px-4">
        {/* Top navigation */}
        <div className="hidden sm:flex justify-between items-center text-sm mb-2">
          <div className="flex space-x-4">
            <Link href="/rooms">
              <Button
                type="link"
                className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
              >
                <span style={{ color: "#FBBF24" }}>Next Rooms</span>
              </Button>
            </Link>
            <Button
              type="link"
              className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
            >
              <span style={{ color: "#FBBF24" }}>Next Jobs</span>
            </Button>
            <Button
              type="link"
              className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
            >
              <span style={{ color: "#FBBF24" }}>Next Products</span>
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button
              type="link"
              className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
            >
              <span style={{ color: "#FBBF24" }}>Đóng góp ý kiến</span>
            </Button>
            <Button
              type="link"
              className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
            >
              <span style={{ color: "#FBBF24" }}>Tải ứng dụng</span>
            </Button>
            <Button
              type="link"
              className="text-[#60A5FA] hover:text-[#FBBF24] px-1 py-0 h-auto"
            >
              <span style={{ color: "#FBBF24" }}>Trợ giúp</span>
            </Button>
          </div>
        </div>

        {/* Main header content */}
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <Link href="/">
              <span className="text-xl sm:text-2xl font-bold text-white">
                NextLife
              </span>
            </Link>
            <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
              <Button className="bg-[#60A5FA] border-none text-white flex items-center">
                <MenuOutlined style={{ height: "12px" }} />
                <span className="ml-1">Danh mục</span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>

          {/* Search bar with AutoComplete */}
          <div className="w-full sm:w-auto mx-4 mb-2 sm:mb-0 flex-grow md:block">
            <div className="flex">
              <AutoComplete
                options={suggestions}
                style={{ width: "100%", backgroundColor: "#F1F5F9" }}
                onSearch={handleSearchChange}
                onSelect={handleSelect}
                value={searchValue}
                className="w-full sm:w-80 rounded-l-sm"
              >
                <Input
                  type="text"
                  prefix={<SearchOutlined />}
                  placeholder="Tìm kiếm sản phẩm trên NextLife"
                  onChange={handleInputChange}
                  onKeyPress={handleInputEnter}
                />
              </AutoComplete>
              <Button
                onClick={() => handleSearch(searchValue)}
                className="bg-[#60A5FA] text-white border-none hover:bg-[#3B82F6]"
              >
                Tìm
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{
                color: "#FFF",
              }}
            />
            <Button
              type="text"
              icon={<MessageOutlined />}
              style={{
                color: "#FFF",
              }}
            />
            <Button
              type="text"
              icon={<ShoppingOutlined />}
              style={{
                color: "#FFF",
              }}
            />

            {/* "Quản lý tin" button with icon - hidden on mobile */}
            <Button
              type="text"
              icon={<FormOutlined />}
              className="hidden sm:flex"
              style={{
                color: "#FFF",
              }}
            >
              Quản lý tin
            </Button>

            {/* Account dropdown */}
            <Dropdown
              menu={{
                items: [
                  { key: "1", label: "Tài khoản của tôi" },
                  { key: "2", label: "Đăng xuất" },
                ],
              }}
            >
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{
                  color: "#FFF",
                }}
              >
                <span className="hidden sm:inline">Tài khoản</span>
              </Button>
            </Dropdown>

            {/* "ĐĂNG TIN" button - always visible */}
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
      </div>
    </header>
  );
};

export default Header;
