"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const suggestions = [
    { value: "Studio" },
    { value: "Căn hộ mới" },
    { value: "Phòng mới" },
    { value: "Thân thiện với vật nuôi" },
    { value: "Quận 1" },
  ];

  const filteredSuggestions = searchValue
    ? suggestions.filter((item) =>
        item.value.toLowerCase().includes(searchValue.toLowerCase())
      )
    : suggestions; // If no search value, show all suggestions

  const handleSearch = (value: string) => {
    if (value.trim()) {
      window.location.href = `/search?keyword=${encodeURIComponent(value.trim())}`;
    }
  };

  const handleSelect = (value: string) => {
    setSearchValue(value);
    setIsOpen(false);
    handleSearch(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full sm:w-auto mx-4 mb-2 sm:mb-0 flex-grow md:flex-grow-0 md:min-w-[500px]">
      <div className="relative" ref={dropdownRef}>
        <div className="flex h-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full h-full pl-8 pr-3 text-sm text-gray-700 bg-white border-0 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Tìm kiếm sản phẩm trên NextLife"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setIsOpen(true);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchValue);
                }
              }}
              onFocus={() => setIsOpen(true)}
            />
            {isOpen && ( // Remove searchValue condition
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-700"
                    onClick={() => handleSelect(suggestion.value)}
                  >
                    {suggestion.value}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => handleSearch(searchValue)}
            className="px-4 h-full text-sm text-white bg-[#60A5FA] hover:bg-[#3B82F6] rounded-r border-0 transition-colors"
          >
            Tìm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
