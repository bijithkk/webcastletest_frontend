import { useProducts } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  const { updateFilter } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilter("search", searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, updateFilter]);

  return (
    <div className="container mx-auto mb-2 flex items-center justify-between font-medium">
      <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <CiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
    </div>
  );
}
