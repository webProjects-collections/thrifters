"use client";

import { useContext } from "react";
import { ProductsContext } from "~/providers/productsProvider";
import {
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationNext,
  Pagination,
  PaginationContent,
} from "./ui/pagination";
export default function ProductsPaginator() {
  const { query, pageNum, products } = useContext(ProductsContext);

  const totalPages = products?.data.html.totalPage ?? 0;

  const generatePaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; // Maximum number of pages to show in pagination
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`/search/${query}/${i}`}
              isActive={i === pageNum}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      if (pageNum > 1) {
        items.push(
          <PaginationItem key="prev">
            <PaginationPrevious href={`/search/${query}/${pageNum - 1}`} />
          </PaginationItem>,
        );
      }

      if (pageNum > halfMaxPages + 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink href={`/search/${query}/1`}>1</PaginationLink>
          </PaginationItem>,
        );
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      let startPage = Math.max(pageNum - halfMaxPages, 1);
      let endPage = Math.min(pageNum + halfMaxPages, totalPages);

      if (pageNum <= halfMaxPages) {
        endPage = maxPagesToShow;
      }
      if (pageNum > totalPages - halfMaxPages) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`/search/${query}/${i}`}
              isActive={i === pageNum}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (pageNum < totalPages - halfMaxPages) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href={`/search/${query}/${totalPages}`}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (pageNum < totalPages) {
        items.push(
          <PaginationItem key="next">
            <PaginationNext href={`/search/${query}/${pageNum + 1}`} />
          </PaginationItem>,
        );
      }
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>{generatePaginationItems()}</PaginationContent>
    </Pagination>
  );
}
