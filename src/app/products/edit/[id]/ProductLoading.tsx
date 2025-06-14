// src/app/products/edit/[id]/ProductLoading.tsx
"use client";

import { FaCheck } from "react-icons/fa";

interface ProductLoadingProps {
  isLoading?: boolean;
  isSuccess?: boolean;
}

export default function ProductLoading({ isLoading, isSuccess }: ProductLoadingProps) {
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <div className="flex flex-col justify-center items-center h-64 gap-2">
            <FaCheck className="text-green-500 h-12 w-12" />
            <p className="text-green-500 font-medium">Product updated successfully!</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <div className="flex flex-col gap-2 justify-center items-center h-64">
            <div className="animate-spin rounded-full border-black h-12 w-12 border-t-2 border-b-2"></div>
            <p className="text-red-500 font-medium">Updating product...</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}