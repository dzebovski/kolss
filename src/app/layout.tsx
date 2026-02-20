import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';

import '@/src/lib/config/init';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext', 'cyrillic']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'latin-ext', 'cyrillic']
});

export const metadata: Metadata = {
  title: 'KOLSS',
  description: 'Custom kitchens'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
