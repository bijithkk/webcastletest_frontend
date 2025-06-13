"use client";

import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import ProductFilters from "@/components/ProductFilters";
import ProductItem from "@/components/ProductItem";
import Title from "@/components/Title";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";


export default function ProductList() {
  const {
    products,
    loading: initialLoading,
    error,
    pagination,
    filters,
    updateFilter,
    fetchProducts,
    deleteProduct,
    categories,
  } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // useEffect(() => {
  //   updateFilter("category", selectedCategories.join(","));
  // }, [selectedCategories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFilterLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [products, initialLoading]);

  if (initialLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
        {/* Filter Options */}
        {/* <ProductFilters
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        /> */}

        {/* Right side */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-base md:text-2xl gap-2 md:gap-0 mb-4">
            <Title text1={`ALL`} text2={`COLLECTIONS`} />

            <Link
              href="/products/create"
              className="flex items-center gap-2 bg-black text-white font-light px-4 py-2 mt-4 text-sm rounded-xl"
            >
              ADD
              <FaPlus />
            </Link>
          </div>

          {/* Active filters display */}
          {/* {(filters.search || filters.category) && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              {filters.search && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  Search: "{filters.search}"
                  <button
                    onClick={() => updateFilter("search", "")}
                    className="ml-2 text-gray-500 hover:text-black"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.category &&
                filters.category.split(",").map((cat) => (
                  <span
                    key={cat}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {cat.toLowerCase()}
                    <button
                      onClick={() => {
                        const newCats = selectedCategories.filter(
                          (c) => c !== cat
                        );
                        setSelectedCategories(newCats);
                        updateFilter("category", newCats.join(","));
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
                    updateFilter("search", "");
                    updateFilter("category", "");
                    setSelectedCategories([]);
                  }}
                  className="text-sm text-gray-500 hover:text-black ml-2"
                >
                  Clear all
                </button>
              )}
            </div>
          )} */}

          {/* Products grid with loading state */}
        <div className="relative">
          {isFilterLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
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
                <p className="text-gray-500">
                  No products found matching your filters
                </p>
                <button
                  onClick={() => {
                    updateFilter("search", "");
                    updateFilter("category", "");
                    // setSelectedCategories([]);
                  }}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
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
    </div>
  );
}
