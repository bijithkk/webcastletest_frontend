// src/components/ConfirmDialog.tsx
"use client";

import ProductLoading from "@/app/products/[id]/ProductLoading";
import Button from "./ui/Button";


interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isSuccess?: boolean
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  isSuccess = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <ProductLoading
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
          {!isLoading && !isSuccess && (
          <>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="mb-6">{message}</p>
            <div className="flex justify-end space-x-3">
              <Button onClick={onCancel} variant="secondary">
                Cancel
              </Button>
              <Button 
                onClick={async () => await onConfirm()} 
                variant="danger"
              >
                Confirm
              </Button>
            </div>
          </>
        )}
         
      </div>
    </div>
  );
}
