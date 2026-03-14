import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePostLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <article className="max-w-4xl mx-auto">
        {/* Back link */}
        <Skeleton className="h-4 w-28 mb-8" />

        {/* Title */}
        <Skeleton className="h-12 w-5/6 mb-3" />
        <Skeleton className="h-12 w-3/5 mb-6" />

        {/* Meta: date / read-time / views */}
        <div className="flex items-center gap-6 mb-8 flex-wrap">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-14 rounded-full" />
        </div>

        <Skeleton className="h-px w-full mb-8" />

        {/* Article body — staggered paragraphs */}
        <div className="space-y-3 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <Skeleton className="h-7 w-2/5 mb-4 mt-8" />
        <div className="space-y-3 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-7 w-1/3 mb-4 mt-8" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Comment section placeholder */}
        <div className="mt-16">
          <Skeleton className="h-6 w-24 mb-6" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-border bg-background-secondary space-y-2"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20 ml-auto" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
