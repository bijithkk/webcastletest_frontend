// src/components/ProductDetail/ProductDetail.tsx
"use client";

import { Product, useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { deleteProduct } = useProducts();
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      router.push("/products");
      router.refresh(); // Refresh the page to see updated product list
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmDialog(false)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder-product.jpg"}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4 capitalize">{product.category}</p>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex space-x-4">
            <Link
              href={`/products/edit/${product._id}`}
              className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Edit Product
            </Link>
            <button 
              onClick={() => setShowConfirmDialog(true)}
              disabled={isDeleting}
              className={`bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </span>
              ) : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
