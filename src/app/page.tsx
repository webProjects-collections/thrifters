import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import ProductsDisplay from "~/components/products";
import { DEFAULT_QUERY_SEARCH } from "~/constants";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  /*
  const hello = await api.products.getProductsByName({
    query: "netflix",
    page: 1,
  });
  console.log(hello);
  const session = await getServerAuthSession();


  */
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <ProductsDisplay query={DEFAULT_QUERY_SEARCH} page={1} />
    </HydrateClient>
  );
}
