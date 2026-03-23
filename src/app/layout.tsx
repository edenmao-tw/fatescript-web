import type { Metadata } from 'next';
import { Noto_Serif_TC, Inter } from 'next/font/google';
import './globals.css';

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-zh',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-en',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'FateScript | 命運圖譜',
    template: '%s | FateScript',
  },
  description: '七政四餘命盤 — 精準斷點的人生決策工具',
  metadataBase: new URL('https://fatescript.pro'),
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: 'en_US',
    siteName: 'FateScript',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${notoSerifTC.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
