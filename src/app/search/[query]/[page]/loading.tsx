import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingProducts() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Our Products</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 10 }).map((_, i) => {
            return <LoadingProductSkeleton key={i * -1} id={i} />;
          })}
        </div>
      </div>
    </section>
  );
}

interface LoadingProductSkeletonProps {
  id: string | number;
}

function LoadingProductSkeleton({ id }: LoadingProductSkeletonProps) {
  return (
    <div
      key={id}
      className="overflow-hidden rounded-lg bg-background shadow-md"
    >
      <Skeleton className="h-48 w-full object-cover" />
      <div className="p-4">
        <Skeleton className="mb-2 h-6 w-full" />
        <Skeleton className="mb-4 h-4 w-full" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}
