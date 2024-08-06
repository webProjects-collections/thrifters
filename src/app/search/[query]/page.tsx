"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Search({ params }: { params: { query: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/search/${params.query}/1`);
  }, [params.query, router]);

  return null;
}
