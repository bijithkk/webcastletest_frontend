"use client";

import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface LoadingProps {
  isLoading: boolean;
  isSuccess?: boolean;
  successMessage?: string;
  loadingMessage?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loading({
  isLoading,
  isSuccess = false,
  successMessage = "Success!",
  loadingMessage = "Loading!",
  size = "md",
}: LoadingProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const sizeClasses = {
    sm: "h-8 w-8 border-t-2 border-b-2",
    md: "h-12 w-12 border-t-2 border-b-2",
    lg: "h-16 w-16 border-t-4 border-b-4",
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-2">
        <FaCheck className={`text-green-500 ${
          size === "sm" ? "h-8 w-8" :
          size === "md" ? "h-12 w-12" :
          "h-16 w-16"
        }`} />
        <p className="text-green-500 font-medium">{successMessage}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-64">
        <div
          className={`animate-spin rounded-full border-black ${sizeClasses[size]}`}
        ></div>
        <p className="text-red-500 font-medium">{loadingMessage}</p>
      </div>
    );
  }

  return null;
}