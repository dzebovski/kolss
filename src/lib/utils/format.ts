export function formatCurrency(
  amount: number,
  locale: string = 'uk-UA',
  currency: string = 'UAH'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}
