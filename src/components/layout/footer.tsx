import {getTranslations} from 'next-intl/server';

export async function Footer() {
  const tFooter = await getTranslations('Footer');

  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto w-full max-w-6xl px-4 text-sm text-slate-600 md:px-6">
        {tFooter('copyright')}
      </div>
    </footer>
  );
}
