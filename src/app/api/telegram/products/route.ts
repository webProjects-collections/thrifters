import { api } from "~/trpc/server";

type ProductsRequest = {
  query: string;
  page: number;
};

export async function POST(req: Request) {
  const { query, page } = (await req.json()) as ProductsRequest;

  try {
    const products = await api.products.getProductsByName({
      query,
      page,
      isImageUrl: true,
    });
    return Response.json(products);
  } catch (e) {
    return Response.json(e, { status: 500 });
  }
}
