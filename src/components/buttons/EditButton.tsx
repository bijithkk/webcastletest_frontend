// components/buttons/EditButton.tsx
"use client";

import Button from "@/components/ui/Button";

export default function EditButton({ href }: { href: string }) {
  return (
    <Button href={href} variant="secondary" size="lg">
      Edit
    </Button>
  );
}