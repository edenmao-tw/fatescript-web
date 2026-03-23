import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ChartInputForm from '@/components/ChartInputForm';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '輸入生辰資料 | 命運圖譜' : 'Enter Birth Data | FateScript',
    description: isZh
      ? '輸入你的出生日期、時間與地點，七政四餘為你精準解析命盤。'
      : 'Enter your birth date, time, and place to reveal your Qi Zheng Si Yu chart.',
  };
}

export default async function ChartPage() {
  const locale = await getLocale();
  const isZh = locale === 'zh-TW';

  return (
    <main
      className={`min-h-screen ${
        isZh ? 'bg-[#0a0a1a] text-[#e8d5a3]' : 'bg-[#f8f4ef] text-[#1a1a2e]'
      }`}
    >
      {/* Back link */}
      <div className="max-w-lg mx-auto px-4 pt-8">
        <a
          href={isZh ? '/' : '/'}
          className={`text-sm opacity-50 hover:opacity-80 transition-opacity ${
            isZh ? 'text-[#e8d5a3]' : 'text-[#1a1a2e]'
          }`}
        >
          ← {isZh ? '返回首頁' : 'Back'}
        </a>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">
            {isZh ? '輸入你的生辰資料' : 'Your Birth Information'}
          </h1>
          <p className={`text-sm ${isZh ? 'text-[#e8d5a3]/50' : 'text-gray-400'}`}>
            {isZh
              ? '資料僅用於計算命盤，不會儲存個人資料'
              : 'Used only to calculate your chart. Never stored.'}
          </p>
        </div>

        {/* Form card */}
        <div
          className={`rounded-2xl p-6 ${
            isZh
              ? 'bg-[#111128] border border-[#e8d5a3]/10'
              : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          <ChartInputForm locale={locale as 'zh-TW' | 'en'} />
        </div>

        {/* Trust note */}
        <p className={`text-center text-xs mt-6 ${isZh ? 'text-[#e8d5a3]/30' : 'text-gray-400'}`}>
          {isZh
            ? '🔒 資料不會上傳至伺服器，僅本地計算'
            : '🔒 Your data is never sent to our servers'}
        </p>
      </div>
    </main>
  );
}
