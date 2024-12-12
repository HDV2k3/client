import { addressHCM } from "@/constants/HCM_address";
import React, { useState, useEffect } from "react";

interface FilterProps {
  applyFilters: (filters: FilterCriteria) => void;
}

interface FilterCriteria {
  minPrice?: string;
  maxPrice?: string;
  district?: string;
  type?: string;
  hasPromotion?: boolean;
  sortByPrice?: string;
  sortByCreated?: string;
  page?: number;
  size?: number;
}

const FilterComponent: React.FC<FilterProps> = ({ applyFilters }) => {
  const initialFilters: FilterCriteria = {
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

  const [filters, setFilters] = useState<FilterCriteria>(initialFilters);
  const [priceRanges, setPriceRanges] = useState<
    Array<{ label: string; min: number; max: number }>
  >([]);

  const district = addressHCM.district;

  // const districts = [
  //   "Quận 1",
  //   "Quận 2",
  //   "Quận 3",
  //   "Quận 4",
  //   "Quận 5",
  //   "Quận 6",
  //   "Quận 7",
  //   "Quận 8",
  //   "Quận 9",
  //   "Quận 10",
  //   "Quận 11",
  //   "Quận 12",
  //   "Bình Thạnh",
  //   "Gò Vấp",
  //   "Phú Nhuận",
  //   "Tân Bình",
  //   "Tân Phú",
  //   "Thủ Đức",
  // ];
  const districts: Record<string, string[]> = {
    "Quận 1": [
      "Phường Bến Nghé",
      "Phường Bến Thành",
      "Phường Cầu Kho",
      "Phường Cầu Ông Lãnh",
    ],
    "Quận 2": [
      "Phường Thảo Điền",
      "Phường An Phú",
      "Phường Bình An",
      "Phường An Khánh",
    ],
    // ...
  };
  const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // Quận được chọn
  const [wards, setWards] = useState<string[]>([]); // Danh sách phường
  const [selectedWard, setSelectedWard] = useState<string>(""); // Phường được chọn

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const ward = event.target.value;

    // Cập nhật phường được chọn
    setSelectedWard(ward);

    // Cập nhật bộ lọc
    setFilters((prev) => ({ ...prev, ward }));
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const district = event.target.value;

    // Cập nhật quận được chọn
    setSelectedDistrict(district);

    // Cập nhật danh sách phường tương ứng
    setWards(districts[district as keyof typeof districts] || []);

    // Cập nhật bộ lọc
    setFilters((prev) => ({ ...prev, district }));
    console.log(filters);
  };

  const propertyTypes = [
    "Căn hộ",
    "Nhà phố",
    "Biệt thự",
    "Đất nền",
    "Văn phòng",
    "Phòng trọ",
  ];

  useEffect(() => {
    updatePriceRanges(filters.type);
  }, [filters.type]);

  const updatePriceRanges = (type: string | undefined) => {
    switch (type) {
      case "Căn hộ":
        setPriceRanges([
          { label: "Dưới 10 triệu", min: 0, max: 10 },
          { label: "10 - 20 triệu", min: 10, max: 20 },
          { label: "20 - 30 triệu", min: 20, max: 30 },
          { label: "30 - 40 triệu", min: 30, max: 40 },
          { label: "40 - 50 triệu", min: 40, max: 50 },
          { label: "Trên 50 triệu", min: 50, max: Number.MAX_SAFE_INTEGER },
        ]);
        break;
      case "Nhà phố":
        setPriceRanges([
          { label: "Dưới 2 tỷ", min: 0, max: 2000 },
          { label: "2 - 4 tỷ", min: 2000, max: 4000 },
          { label: "4 - 6 tỷ", min: 4000, max: 6000 },
          { label: "6 - 8 tỷ", min: 6000, max: 8000 },
          { label: "8 - 10 tỷ", min: 8000, max: 10000 },
          { label: "Trên 10 tỷ", min: 10000, max: Number.MAX_SAFE_INTEGER },
        ]);
        break;
      case "Phòng trọ":
        setPriceRanges([
          { label: "Dưới 1 triệu", min: 0, max: 1 },
          { label: "1 - 2 triệu", min: 1, max: 2 },
          { label: "2 - 3 triệu", min: 2, max: 3 },
          { label: "3 - 4 triệu", min: 3, max: 4 },
          { label: "4 - 5 triệu", min: 4, max: 5 },
          { label: "Trên 5 triệu", min: 5, max: Number.MAX_SAFE_INTEGER },
        ]);
        break;
      default:
        setPriceRanges([
          { label: "Tất cả khoảng giá", min: 0, max: Number.MAX_SAFE_INTEGER },
        ]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFilters((prev) => ({ ...prev, [name]: newValue }));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [min, max] = e.target.value.split(",").map(Number);
    setFilters((prev) => ({
      ...prev,
      minPrice: min.toString(),
      maxPrice: max === Number.MAX_SAFE_INTEGER ? "" : max.toString(),
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setFilters((prev) => ({
        ...prev,
        sortByPrice:
          name === "sortByPriceAsc"
            ? "ASC"
            : name === "sortByPriceDesc"
              ? "DESC"
              : "",
        sortByCreated: name === "sortByNewest" ? "DESC" : "",
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        sortByPrice: "",
        sortByCreated: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    applyFilters(initialFilters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* <div>
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
        </div> */}
        {/* Dropdown chọn Quận */}
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
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Chọn Quận/Huyện</option>
            {Object.keys(districts).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown chọn Phường */}
        <div>
          <label
            htmlFor="ward"
            className="block text-sm font-medium text-gray-700"
          >
            Phường/Xã
          </label>
          <select
            id="ward"
            name="ward"
            value={selectedWard}
            onChange={handleWardChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Chọn Phường/Xã</option>
            {wards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Sắp xếp
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="sortByPriceAsc"
              checked={filters.sortByPrice === "ASC"}
              onChange={handleSortChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Giá tăng dần</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="sortByPriceDesc"
              checked={filters.sortByPrice === "DESC"}
              onChange={handleSortChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Giá giảm dần</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="sortByNewest"
              checked={filters.sortByCreated === "DESC"}
              onChange={handleSortChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Mới nhất</span>
          </label>
        </div>
      </div>

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
