import {notFound} from 'next/navigation';

export default function UIKitPage() {
  // DEV-ONLY: This page is only accessible in development
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <h1 className="text-2xl font-bold">UI Kit / Design System</h1>
      <p className="mt-4 text-slate-600">
        This page will contain the design system components and UI patterns.
      </p>
    </div>
  );
}
