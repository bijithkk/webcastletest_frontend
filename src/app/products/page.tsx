"use client";

import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import Title from "@/components/Title";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FaAngleDown } from "react-icons/fa6";

export default function ProductList() {
  const { products, loading, error, pagination, filters, updateFilter, fetchProducts , deleteProduct, categories } = useProducts();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Handle category selection
  const toggleCategory = (category: string) => {
  setSelectedCategories(prev =>
    prev.includes(category)
      ? prev.filter(c => c !== category)
      : [...prev, category]
  )
}

useEffect(() => {
  updateFilter('category', selectedCategories.join(','));
}, [selectedCategories]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
      {/* Filter Options */}
      <div className="min-w-60">
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
            {categories.map(category => (
              <p className="flex gap-2" key={category}>
              <input
                type="checkbox"
                className="w-3"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />{" "}
              {category}
            </p>
            ) )}
          </div>
        </div>
        
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-base md:text-2xl gap-2 md:gap-0 mb-4">
          <Title text1={`ALL`} text2={`COLLECTIONS`} />
          
          <Link href="/products/create" className="bg-black text-white font-light px-4 py-2 mt-4 text-sm rounded-2xl">
            New Product
          </Link >
        </div>

        {/* Active filters display */}
        {(filters.search || filters.category) && (
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            {filters.search && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Search: "{filters.search}"
                <button 
                  onClick={() => updateFilter('search', '')}
                  className="ml-2 text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </span>
            )}
            {filters.category && filters.category.split(',').map(cat => (
              <span key={cat} className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
                {cat.toLowerCase()}
                <button 
                  onClick={() => {
                    const newCats = selectedCategories.filter(c => c !== cat);
                    setSelectedCategories(newCats);
                    updateFilter('category', newCats.join(','));
                  }}
                  className="ml-2 text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </span>
            ))}
            {(filters.search || filters.category) && (
              <button 
                onClick={() => {
                  updateFilter('search', '');
                  updateFilter('category', '');
                  setSelectedCategories([]);
                }}
                className="text-sm text-gray-500 hover:text-black ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {products.length > 0 ? (
            products.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                category={item.category}
                image={item.image}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No products found matching your filters</p>
              <button 
                onClick={() => {
                  updateFilter('search', '');
                  updateFilter('category', '');
                  setSelectedCategories([]);
                }}
                className="mt-2 text-sm text-blue-500 hover:text-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

         {/* Pagination - only show if there are products */}
        {products.length > 0 && (
          <Pagination 
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => fetchProducts(page)}
          />
        )}
        
      </div>
    </div>
  );
}
