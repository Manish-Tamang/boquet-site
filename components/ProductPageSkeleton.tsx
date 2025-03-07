import { Skeleton } from "@/components/ui/skeleton";

export function ProductPageSkeleton() {
    return (
        <div className="max-w-[1024px] mx-auto px-2 py-4 animate-pulse">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <Skeleton className="w-[430px] h-[430px] bg-gray-200 rounded-md" />  {}
                    <div className="flex items-center justify-start space-x-2">  {}
                        <Skeleton className="w-[80px] h-[80px] rounded-md bg-gray-200" />  {}
                        <Skeleton className="w-[80px] h-[80px] rounded-md bg-gray-200" />  {}
                    </div>
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-8 w-3/4 bg-gray-200" />
                    <Skeleton className="h-6 w-1/2 bg-gray-200" />
                    <Skeleton className="h-4 w-1/4 bg-gray-200" />
                    <div>
                        <Skeleton className="h-4 w-1/3 mb-1 bg-gray-200" />
                        <div className="flex flex-wrap gap-1">
                            <Skeleton className="h-8 w-16 rounded-md bg-gray-200" />
                            <Skeleton className="h-8 w-16 rounded-md bg-gray-200" />
                        </div>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-1/3 mb-1 bg-gray-200" />
                        <div className="flex flex-wrap gap-1">
                            <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
                            <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded-md">
                            <Skeleton className="h-8 w-8 rounded-none bg-gray-200" />
                            <Skeleton className="w-8 h-8 rounded-none bg-gray-200" />
                            <Skeleton className="h-8 w-8 rounded-none bg-gray-200" />
                        </div>
                        <Skeleton className="w-[330px] h-[40px] rounded-md bg-gray-200" /> {}
                    </div>
                    <div className="pt-3 border-t">
                        <Skeleton className="h-4 w-1/3 mb-1 bg-gray-200" />
                        <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    </div>
                    <div className="pt-3 border-t">
                        <Skeleton className="h-4 w-1/3 mb-1 bg-gray-200" />
                        <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}