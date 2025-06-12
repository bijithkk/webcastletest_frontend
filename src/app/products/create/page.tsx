// src/app/products/create/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { useProducts } from '@/context/ProductContext'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { fetchProducts } = useProducts()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
    const form = new FormData()
    form.append('title', formData.title)
    form.append('description', formData.description)
    form.append('price', formData.price.toString())
    form.append('category', formData.category)
    if (file) form.append('image', file)

      await axios.post('http://localhost:3002/api/v1/product/add', form , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      await fetchProducts()
      router.push('/products')
      router.refresh()
    } catch (err) {
      setError('Failed to create product')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0]
  if (selectedFile) {
    setFile(selectedFile) // Store file for form submission

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result as string // base64 for preview only
      }))
    }
    reader.readAsDataURL(selectedFile)
  }
}


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price *
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
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

        {/* <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {formData.image && (
            <div className="mt-2">
              <img 
                src={formData.image} 
                alt="Product preview" 
                className="h-40 object-contain"
              />
            </div>
          )}
        </div> */}

        <div>
  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
    Upload Image
  </label>
  <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={handleImageUpload}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
  />
  
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
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}