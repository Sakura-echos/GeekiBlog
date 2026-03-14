import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton for a single BlogCard — mirrors the real card structure */
function BlogCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-border bg-background-secondary">
      {/* title */}
      <Skeleton className="h-6 w-4/5 mb-3" />
      {/* excerpt: 3 lines */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/5 mb-4" />
      {/* tags */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-14 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      {/* meta: date / read-time / views */}
      <div className="flex gap-4">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-3.5 w-12" />
        <Skeleton className="h-3.5 w-10" />
      </div>
    </div>
  );
}

export default function ArticlesLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Skeleton className="h-12 w-36 mx-auto mb-4" />
        <Skeleton className="h-5 w-72 mx-auto" />
      </div>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-8 flex gap-2">
        <Skeleton className="flex-1 h-11 rounded-xl" />
        <Skeleton className="h-11 w-20 rounded-xl" />
      </div>

      {/* Category tabs + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-10 w-64 rounded-xl" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>

      {/* Card grid — masonry-like 3-col placeholder */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-6">
            <BlogCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
