"use client";

import { useEffect } from "react";

interface ProductImageProps {
  src: string;
  name: string;
}

export default function ProductImage({ src, name }: ProductImageProps) {
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [src]);

  return (
    <img
      src={src}
      width={300}
      height={200}
      alt={name}
      className="h-48 w-full object-cover"
    />
  );
}
