import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
    return (
        <div className="w-full h-50 bg-gray-100 rounded-md animate-pulse overflow-hidden"> { }
            <Skeleton className="w-full h-50 bg-gray-200" />
        </div>
    );
}


export function ProductCardSkeleton() {
    return (
        <div className="border rounded-md shadow-sm p-4 animate-pulse">
            <div className="aspect-w-3 aspect-h-4 mb-4">
                <Skeleton className="h-[180px] w-full rounded-md bg-gray-200" /> { }
            </div>
            <div>
                <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-1/2 bg-gray-200" />
            </div>
        </div>
    );
}


export function HomeSkeleton() {
    return (
        <div>
            <CarouselSkeleton /> { }
            <section className="py-8">
                <div className="flex justify-between mb-6">
                    <Skeleton className="h-6 w-48 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(4).fill(null).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </section>

            <section className="py-8">
                <div className="flex justify-between mb-6">
                    <Skeleton className="h-6 w-48 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(4).fill(null).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </section>

            <section className="py-8">
                <div className="flex justify-between mb-6">
                    <Skeleton className="h-6 w-48 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(4).fill(null).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}