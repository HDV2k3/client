import { AutoComplete, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
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


  const handleInputChange = (e:any) => {
    setSearchValue(e.target.value);
  };

  const handleInputEnter = (e:any) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  const handleSelect = (value: string) => {
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div className="w-full sm:w-auto mx-4 mb-2 sm:mb-0 flex-grow md:block">
      <div className="flex">
        <AutoComplete
          options={suggestions}
          style={{ width: "100%", backgroundColor: "#F1F5F9" }}
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
  );
};

export default SearchBar;
