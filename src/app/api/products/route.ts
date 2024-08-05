import { api } from "~/trpc/server";

type ProductsRequest = {
  query: string;
  page: number;
};

export async function POST(req: Request) {
  const { query, page } = (await req.json()) as ProductsRequest;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const products = await api.products.getProductsByName({ query, page });
    return Response.json(products);
  } catch (e) {
    return Response.json(e, { status: 500 });
  }
}
