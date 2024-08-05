/* eslint-disable @typescript-eslint/no-empty-function */
"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { DEFAULT_QUERY_SEARCH } from "~/constants";
import { type Z2UQuerySearchResponse } from "~/types";

interface ProductsProviderProps {
  productsResponse: Z2UQuerySearchResponse;

  pageNum: number;
  query: string;
  children: ReactNode;
}

interface ProductContextCotent {
  products: Z2UQuerySearchResponse | null;
  setProducts: Dispatch<SetStateAction<Z2UQuerySearchResponse>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}
export const ProductsContext = createContext<ProductContextCotent>({
  products: null,
  setQuery() {},
  setPageNum() {},
  setProducts() {},
  query: DEFAULT_QUERY_SEARCH,
  pageNum: 1,
});

export default function ProductsProvider({
  productsResponse,
  children,
}: ProductsProviderProps) {
  const [products, setProducts] = useState(productsResponse);
  const [query, setQuery] = useState(DEFAULT_QUERY_SEARCH);
  const [pageNum, setPageNum] = useState(1);

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        setProducts: setProducts,
        pageNum: 1,
        setQuery: setQuery,

        query: DEFAULT_QUERY_SEARCH,
        setPageNum: setPageNum,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
