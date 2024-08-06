import ProductsDisplay from "~/components/products";
import { DEFAULT_QUERY_SEARCH } from "~/constants";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <ProductsDisplay query={DEFAULT_QUERY_SEARCH} page={1} />
    </HydrateClient>
  );
}
