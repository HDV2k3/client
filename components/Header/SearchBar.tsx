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
    <div className="relative flex items-center w-full">
      <div className="flex-grow">
        <input
          type="text"
          className="w-full h-8 px-2 py-2 text-sm text-gray-700 bg-white border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        {isOpen && filteredSuggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-700"
                onClick={() => handleSearch(suggestion.value)}
              >
                {suggestion.value}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => handleSearch(searchValue)}
        className="px-2 h-8 text-sm text-white bg-blue-500 rounded-r hover:bg-blue-600"
      >
        Tìm
      </button>
    </div>
  );
};

export default SearchBar;
