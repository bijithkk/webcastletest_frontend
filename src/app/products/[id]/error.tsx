// src/app/products/[id]/error.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaExclamationTriangle, FaChevronLeft } from 'react-icons/fa'

export default function ProductErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  
  useEffect(() => {
    console.error('Product Error:', error)
  }, [error])

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="flex justify-center text-red-500 mb-4">
          <FaExclamationTriangle size={32} />
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">
          Product Error
        </h3>
        <p className="text-red-600 mb-6">
          {error.message || 'Failed to load product'}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            <FaChevronLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}