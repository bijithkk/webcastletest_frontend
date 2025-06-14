// components/buttons/SubmitButton.tsx
"use client";

import Button from "@/components/ui/Button";

export default function SubmitButton({
  loading, 
  children = "Submit"
}: {
  loading: boolean; 
  children?: React.ReactNode;
}) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      disabled={loading}
    >
      {children}
    </Button>
  );
}