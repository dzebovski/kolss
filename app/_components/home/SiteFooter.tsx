import Link from "next/link";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  navigation: readonly NavigationItem[];
};

export function SiteFooter({ navigation }: SiteFooterProps) {
  return (
    <footer className="bg-kolss-charcoal text-kolss-warm-white">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.4fr_0.6fr] lg:px-10">
        <div>
          <p className="text-base font-semibold uppercase text-kolss-lime">
            KOLSS Polska
          </p>
          <p className="mt-3 max-w-sm text-sm leading-[1.5] text-kolss-warm-white/66">
            Kuchnie i zabudowy na wymiar dla Warszawy i okolic. Salon w
            Legionowie, projekt, produkcja, dostawa i montaż.
          </p>
        </div>

        <nav aria-label="Nawigacja w stopce">
          <ul className="grid gap-3 text-sm text-kolss-warm-white/66 sm:grid-cols-2 lg:grid-cols-4">
            {navigation.slice(1).map((item) => (
              <li key={`footer-${item.href}`}>
                <Link
                  href={item.href}
                  className="underline decoration-kolss-lime/0 underline-offset-4 transition hover:text-kolss-warm-white hover:decoration-kolss-lime"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
