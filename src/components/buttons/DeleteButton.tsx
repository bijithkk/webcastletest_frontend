// components/buttons/DeleteButton.tsx
"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";

export default function DeleteButton({ 
  onDelete, 
}: { 
  onDelete: () => Promise<void>;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
      >
        Delete
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