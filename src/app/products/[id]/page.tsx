// src/app/products/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductDetail from '@/components/ProductDetail/ProductDetail'
import { FaChevronLeft } from "react-icons/fa";
import Loading from '@/components/Loading'

interface Product {
  _id: string
  title: string
  description: string
  price: number
  category: string
  image: string
}

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get/${id}`)
        if (!response.data.product) {
          throw new Error('Product not found') // Will be caught by error boundary
        }
        setProduct(response.data.product)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch product')
        throw error 
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleBack = () => {
    router.back() 
  }

  if (loading) return <Loading/>
  if (!product) throw new Error('Product data not available')

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Back button */}
      <button 
        onClick={handleBack}
        className="flex items-center mb-6 text-gray-600 hover:text-black transition-colors"
      >
        <FaChevronLeft className="mr-2" />
        Back
      </button>
      
      {/* Product detail */}
      <div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl shadow-sm">
        <ProductDetail product={product} />
      </div>
    </div>
  )
}