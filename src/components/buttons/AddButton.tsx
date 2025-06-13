"use client";

import Button from "@/components/ui/Button";
import { FaPlus } from "react-icons/fa6";

export default function AddButton({ href }: { href: string }) {
  return (
    <Button href={href} variant="primary" size="md" icon={<FaPlus />}>
      ADD
    </Button>
  );
}