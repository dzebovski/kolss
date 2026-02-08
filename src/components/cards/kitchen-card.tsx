import {formatCurrency} from '@/src/lib/utils/format';

type KitchenCardProps = {
  title: string;
  style: string;
  price: number;
  locale?: string;
  currency?: string;
};

export function KitchenCard({
  title,
  style,
  price,
  locale = 'uk-UA',
  currency = 'UAH'
}: KitchenCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs" data-testid="kitchen-style-badge">
        {style}
      </span>
      <p className="mt-3 text-sm font-medium" data-testid="kitchen-price">
        {formatCurrency(price, locale, currency)}
      </p>
    </article>
  );
}
