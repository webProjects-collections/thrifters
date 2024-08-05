"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Input } from "./input";
import { Button } from "./button";

export default function QuerySearch() {
  const querySearchParameterRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const value = querySearchParameterRef?.current?.value;

  function handleSearch() {
    if (value != null) {
      router.push(`/search/${value}`);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Input ref={querySearchParameterRef} placeholder="Search products" />
      <Button onClick={handleSearch}>search</Button>
    </div>
  );
}
