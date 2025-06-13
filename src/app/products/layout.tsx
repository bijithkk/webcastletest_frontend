"use client";

import { usePathname } from "next/navigation";
import ProductFilters from "@/components/ProductFilters";
import { useProducts } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { categories, filters,updateFilter } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.category ? filters.category.split(",") : []
  );

  useEffect(() => {
    const globalCategories = filters.category ? filters.category.split(",") : [];
    setSelectedCategories(globalCategories);
  }, [filters.category]);

  useEffect(() => {
    updateFilter("category", selectedCategories.join(","));
  }, [selectedCategories,updateFilter]);

  return (
    // <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
    //   {/* Show filters only on /products route */}
    //   {pathname === "/products" && (
    //     <div className="min-w-60">
    //       <ProductFilters
    //         categories={categories}
    //         selectedCategories={selectedCategories}
    //         setSelectedCategories={setSelectedCategories}
    //       />
    //     </div>
    //   )}
    //   <div className="flex-1">{children}</div>
    // </div>
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the very top */}
      {pathname === "/products" && <Navbar />}
      
      {/* Main content area */}
      <div className="flex flex-1 flex-col sm:flex-row gap-1 sm:gap-10">
        {/* Filters sidebar - only on /products route */}
        {pathname === "/products" && (
          <div className="min-w-60 p-6">
            <ProductFilters
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        )}
        
        {/* Page content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}