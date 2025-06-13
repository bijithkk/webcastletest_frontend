// components/buttons/DeleteButton.tsx
"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";

export default function DeleteButton({ 
  onDelete,
  isLoading 
}: { 
  onDelete: () => Promise<void>;
  isLoading: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // const handleConfirm = async () => {
  //   try {
  //     await onDelete();
  //   } finally {
  //     setShowConfirm(false);
  //   }
  // };
  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      setDeleteSuccess(true);
      // Auto-close after success shown
      setTimeout(() => {
        setShowConfirm(false);
        setDeleteSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowConfirm(true)}
        variant="danger"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Deleting...
          </span>
        ) : (
          "Delete"
        )}
      </Button>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        isLoading={isDeleting}
        isSuccess={deleteSuccess}
      />
    </>
  );
}