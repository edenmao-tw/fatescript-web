import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ChartResult from '@/components/ChartResult';

export const metadata: Metadata = {
  title: '你的命盤 | FateScript',
  robots: { index: false },
};

export default async function ResultPage() {
  const locale = await getLocale();
  return <ChartResult locale={locale as 'zh-TW' | 'en'} />;
}
