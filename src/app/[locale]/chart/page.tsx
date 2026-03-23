import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '輸入生日 | Enter Birth Data',
};

export default async function ChartPage() {
  const locale = await getLocale();
  const isZh = locale === 'zh-TW';

  return (
    <main className={`min-h-screen ${isZh ? 'bg-[#0a0a1a] text-[#e8d5a3]' : 'bg-[#f8f4ef] text-[#1a1a2e]'}`}>
      <div className="max-w-lg mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {isZh ? '輸入你的生辰資料' : 'Your Birth Information'}
        </h1>
        <p className="text-center opacity-60 mb-10 text-sm">
          {isZh ? '資料僅用於計算命盤，不會儲存個人資料' : 'Used only to calculate your chart. Never stored.'}
        </p>
        {/* ChartInputForm will go here (client component) */}
        <div className="text-center opacity-40 text-sm">表單建置中...</div>
      </div>
    </main>
  );
}
