"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface Filters {
  search: string;
  category: string;
}

interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  filters: Filters;
  fetchProducts: (page?: number) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateFilter: (key: keyof Filters, value: string) => void;
  fetchCategories: () => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
  });

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      console.log("filters", filters);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get`,
        {
          params: {
            page,
            limit: pagination.itemsPerPage,
            ...filters,
          },
        }
      );
      console.log("response", response.data);
      setProducts(response.data.data);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      // Only update if value actually changed
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`
      );
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete/${id}`);
      await fetchProducts();
      await fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const updateProduct = async (id: string, formData: FormData) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchProducts();
      await fetchCategories();
    } catch (err) {
      setError("Failed to edit product");
      throw err; 
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        pagination,
        filters,
        fetchProducts,  
        deleteProduct,
        updateFilter,
        fetchCategories,
        updateProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
