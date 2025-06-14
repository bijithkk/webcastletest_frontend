"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useProducts } from "@/context/ProductContext";
import Button from "@/components/ui/Button";
import SubmitButton from "@/components/buttons/SubmitButton";
import ProductLoading from "./ProductLoading";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { fetchProducts, fetchCategories } = useProducts();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    image: "",
  });

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      price: "",
      image: "",
    };

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
      isValid = false;
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
      isValid = false;
    }

    // Image validation (either URL or file)
    if (!formData.image && !file) {
      newErrors.image = "Please upload an image or provide an image URL";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // setError("");
    setIsSuccess(false);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("price", formData.price.toString());
      form.append("category", formData.category);
      if (file) form.append("image", file);

      const response = await axios.post("http://localhost:3002/api/v1/product/add", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        setError(true)
      }
      
      setIsSuccess(true);
      setLoading(false);
      await fetchProducts();
      await fetchCategories();

      setTimeout(() => {
        router.push("/products");
        router.refresh();
      }, 1000);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create product")
      throw error
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.match("image.*")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload an image file (JPEG, PNG, etc.)",
        }));
        return;
      }

      setFile(selectedFile); // Store file for form submission

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string, // base64 for preview only
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  if (error) throw new Error('Failed to create product')

  return (
    <div className="container border border-gray-500 rounded-2xl shadow-sm mx-auto px-8 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">New Product</h1>

      {/* Show loading/success overlay */}
       <ProductLoading isLoading={loading} isSuccess={isSuccess} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Price Field */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price *
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Image Field */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}

          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Product preview"
                className="h-40 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => router.push("/products")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <SubmitButton loading={loading}>
            Create
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
