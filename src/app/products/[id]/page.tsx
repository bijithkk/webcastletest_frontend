// src/app/products/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductDetail from '@/components/ProductDetail/ProductDetail'

interface Product {
  _id: string
  title: string
  description: string
  price: number
  category: string
  image: string
  // Add any additional fields you need
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/v1/product/get/${id}`)
        console.log("single product :- ",response.data)
        setProduct(response.data.product)
      } catch (err) {
        setError('Failed to fetch product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>
  if (!product) return <div className="text-center py-8">Product not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  )
}