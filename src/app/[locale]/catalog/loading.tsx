import {cn} from '@/lib/utils';

type SkeletonProps = {
  className?: string;
};

function Skeleton({className}: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-slate-200', className)} />;
}

function CatalogSkeletonCard() {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Skeleton className="aspect-[3/2] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </article>
  );
}

export default function CatalogLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <CatalogSkeletonCard />
          <CatalogSkeletonCard />
          <CatalogSkeletonCard />
          <CatalogSkeletonCard />
          <CatalogSkeletonCard />
          <CatalogSkeletonCard />
        </div>
      </section>
    </main>
  );
}
