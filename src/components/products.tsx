import ProductsProvider from "~/providers/productsProvider";
import { api } from "~/trpc/server";
import { Button } from "./ui/button";
import ProductImage from "./productImage";
import ProductsPaginator from "./productsPaginator";

interface ProductsDisplayProps {
  query: string;
  page: number;
}

export default async function ProductsDisplay({
  query,
  page,
}: ProductsDisplayProps) {
  const products = await api.products.getProductsByName({
    query,
    page,
    isImageUrl: false,
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <ProductsProvider productsResponse={products} pageNum={page} query={query}>
      <section className="py-12 md:py-24">
        <div className="container mb-12 px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Our Products</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.data.html.data.map((product) => {
              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-lg bg-background shadow-md"
                >
                  <ProductImage src={product.imgurl} name={product.name} />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold">${product.price}</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ProductsPaginator />
      </section>
    </ProductsProvider>
  );
}
