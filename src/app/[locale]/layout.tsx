import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '命運圖譜 — 七政四餘命盤' : 'FateScript — Life Navigation',
    description: isZh
      ? '七政四餘命盤｜精準斷點的人生決策工具｜感情、財運、事業、流年'
      : 'Ancient Chinese astrology for modern life decisions. Understand your patterns, timing, and path.',
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
