import React, { useState } from "react";

// Define the type for filters
interface FilterProps {
  applyFilters: (filters: any) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ applyFilters }) => {
  const initialFilters = {
    minPrice: "",
    maxPrice: "",
    district: "",
    type: "",
    hasPromotion: false,
    sortByPrice: "",
    sortByCreated: "",
    page: 1,
    size: 10,
  };

  const [filters, setFilters] = useState(initialFilters);

  const districts = [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Bình Thạnh",
    "Gò Vấp",
    "Phú Nhuận",
    "Tân Bình",
    "Tân Phú",
    "Thủ Đức",
  ];

  const propertyTypes = [
    "Căn hộ",
    "Nhà phố",
    "Biệt thự",
    "Đất nền",
    "Văn phòng",
    "Phòng trọ",
  ];

  const priceRanges = [
    { label: "Dưới 1 tỷ", min: 0, max: 1000 },
    { label: "1 tỷ - 2 tỷ", min: 1000, max: 1500 },
    { label: "2 tỷ - 3 tỷ", min: 1500, max: 2000 },
    { label: "3 tỷ - 5 tỷ", min: 2000, max: 2500 },
    { label: "5 tỷ - 10 tỷ", min: 2500, max: 3000 },
    { label: "Trên 10 tỷ", min: 3000, max: "" },
  ];

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePriceRangeChange = (e: any) => {
    const [min, max] = e.target.value.split(",");
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    applyFilters(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters); // Reset filters to initial state
    applyFilters(initialFilters); // Apply the reset filters
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      {/* District filter */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            Quận/Huyện
          </label>
          <select
            id="district"
            name="district"
            value={filters.district}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Property type filter */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Loại bất động sản
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Chọn loại bất động sản</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Price range filter */}
        <div>
          <label
            htmlFor="priceRange"
            className="block text-sm font-medium text-gray-700"
          >
            Khoảng giá
          </label>
          <select
            id="priceRange"
            name="priceRange"
            onChange={handlePriceRangeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Chọn khoảng giá</option>
            {priceRanges.map((range) => (
              <option key={range.label} value={`${range.min},${range.max}`}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Has promotion filter */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasPromotion"
            name="hasPromotion"
            checked={filters.hasPromotion}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="hasPromotion"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Có khuyến mãi
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleReset}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Đặt lại
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Áp dụng bộ lọc
        </button>
      </div>
    </form>
  );
};

export default FilterComponent;
