import { trustItems } from "@/app/_content/home";

export function TrustSection() {
  return (
    <section
      aria-label="Najważniejsze informacje o KOLSS Polska"
      className="border-b border-border bg-kolss-surface"
    >
      <div className="mx-auto grid w-full max-w-[1440px] divide-y divide-border px-5 sm:px-8 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-10">
        {trustItems.map((item) => (
          <article key={item.title} className="py-6 md:px-6 lg:py-7">
            <h2 className="text-[13px] font-bold uppercase leading-none text-foreground">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-[1.45] text-muted">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
