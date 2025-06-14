"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product, useProducts } from "@/context/ProductContext";
import { IoIosCloseCircle } from "react-icons/io";
import ProductLoading from "./ProductLoading";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });
  const { updateProduct,error } = useProducts();
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/v1/product/get/${id}`
        );
        setProduct(response.data.product);
        setFormData({
          title: response.data.product.title,
          description: response.data.product.description,
          price: response.data.product.price,
          category: response.data.product.category,
          image: response.data.product.image,
        });
      } catch (err) {
        // setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    if (isNaN(formData.price)) {
      newErrors.price = "Price must be a number";
      isValid = false;
    } else if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
      isValid = false;
    }

    // Image validation (if new file is being uploaded)
    if (!formData.image && !file) {
      newErrors.image = "Image is required";
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
    const { name, value, files } = e.target as HTMLInputElement;

    // Check if file input
    if (name === "image" && files && files.length > 0) {
      const file = files[0];

      // Validate file type
      if (!file.type.match("image.*")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file (JPEG, PNG, etc.)",
        }));
        return;
      }

      setFile(file);
      setErrors((prev) => ({ ...prev, image: "" }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string, // base64 string for preview
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || 0 : value,
      }));

      // Clear error when user types
      if (errors[name as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setIsSuccess(false);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("price", formData.price.toString());
      form.append("category", formData.category);
      if (file) form.append("image", file);

      await updateProduct(id, form);
      setIsSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push("/products");
        router.refresh();
      }, 2000);
    } catch (err) {
      
      console.error(err);
      setIsSuccess(false);
    } finally {
      if (!isSuccess) {
      setLoading(false);
    }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setFile(null);
    // Set error immediately when image is removed
    setErrors((prev) => ({ ...prev, image: "Image is required" }));
  };

  if (error) throw new Error('Failed to edit product')
  
  if (!product) throw new Error('Failed to fetch product')

  return (
    <div className="container border border-gray-500 rounded-2xl shadow-sm mx-auto px-8 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

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

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          {formData.image ? (
            <div className="relative mt-2 w-fit">
              <img
                src={formData.image}
                alt="Product preview"
                className="h-40 object-contain"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-white rounded-full text-red-500 hover:text-red-700"
                title="Remove image"
              >
                <IoIosCloseCircle size={24} />
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="image"
                name="image"
                // value={formData.image}
                onChange={handleImageUpload}
                // placeholder="Enter image URL"
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-600`}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
