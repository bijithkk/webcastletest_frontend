// components/buttons/SubmitButton.tsx
"use client";

import Button from "@/components/ui/Button";

export default function SubmitButton({ 
  children = "Submit"
}: { 
  children?: React.ReactNode;
}) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
    >
      {children}
    </Button>
  );
}