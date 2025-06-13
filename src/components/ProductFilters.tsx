"use client";

import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-w-50">
      <p
        onClick={() => setShowFilter(!showFilter)}
        className="my-2 text-xl flex items-center cursor-pointer gap-2"
      >
        FILTERS
        <FaAngleDown
          className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
        />
      </p>

      {/* Category filter */}
      <div
        className={`border border-gray-300 pl-5 py-3 mt-6 ${
          showFilter ? "" : "hidden"
        } sm:block`}
      >
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {categories.map((category) => (
            <label className="flex gap-2 items-center" key={category}>
              <input
                type="checkbox"
                className="w-3"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
