import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        <Skeleton className="w-48 h-8" />
      </h1>
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar skeleton (actual structure) */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {Array(4).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-8 w-32" />
              ))}
            </div>
          </div>
        </div>
        {/* Main content: just square boxes */}
        <div>
          <div className="flex flex-wrap gap-6 justify-center">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="w-[180px] h-[180px] bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

