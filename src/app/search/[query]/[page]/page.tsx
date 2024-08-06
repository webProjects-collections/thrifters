import ProductsDisplay from "~/components/products";

export default function Search({
  params,
}: {
  params: { query: string; page: number };
}) {
  return <ProductsDisplay query={params.query} page={params.page} />;
}
