"use client";

import { Product, useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { deleteProduct } = useProducts();

  const handleDelete = async () => {
    try {
      router.push("/products");
      router.refresh(); 
      await deleteProduct(product._id);
      
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="max-w-4xl">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4 capitalize">{product.category}</p>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-500">{product.description}</p>
          </div>

          <div className="flex space-x-4">
            <EditButton href={`/products/edit/${product._id}`} />
            <DeleteButton onDelete={handleDelete} />
          </div>

        </div>
      </div>
    </div>
  );
}
