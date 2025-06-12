'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

export interface Product {
  _id: string
  title: string
  description: string
  price: number
  category: string
  image: string
}

interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

interface Filters {
  search: string
  category: string
}

interface ProductContextType {
  products: Product[]
  categories: string[]
  loading: boolean
  error: string | null
  pagination: Pagination
  filters: Filters
  fetchProducts: () => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  updateFilter: (key: keyof Filters, value: string) => void
}


const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  })
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: ''
  })

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true)
      console.log("filters",filters);
      const response = await axios.get('http://localhost:3002/api/v1/product/get', {
        params: {
          page,
          limit: pagination.itemsPerPage,
          ...filters
        }
      })
      console.log("response",response.data)
      setProducts(response.data.data)
      setPagination(response.data.pagination)
      setError(null)
    } catch (err) {
      setError('Failed to fetch products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
    // No need to call fetchProducts here - useEffect will handle it
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/v1/product/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3002/api/v1/product/delete/${id}`)
      await fetchProducts() // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete product')
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts(1)
  }, [filters]) 

  useEffect(() => {
    fetchCategories();
  }, [])

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
        updateFilter
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}