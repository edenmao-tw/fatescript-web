import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage() {
  const locale = await getLocale();
  const isZh = locale === 'zh-TW';

  return isZh ? <ZhHomePage /> : <EnHomePage />;
}

function ZhHomePage() {
  const t = useTranslations('landing');

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-[#e8d5a3] relative overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1040_0%,_#0a0a1a_70%)]" />
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle, #e8d5a3 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 border border-[#e8d5a3]/30 rounded-full text-sm tracking-widest text-[#e8d5a3]/70">
          七政四餘 · 天文命理
        </div>

        {/* Main title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-lg md:text-xl text-[#e8d5a3]/70 mb-10 max-w-xl">
          {t('hero_sub')}
        </p>

        {/* Entry points */}
        <div className="grid grid-cols-2 gap-3 mb-10 w-full max-w-sm">
          {(['love','money','career','family'] as const).map((key) => (
            <Link
              key={key}
              href={`/chart?focus=${key}`}
              className="px-4 py-3 border border-[#e8d5a3]/20 rounded-xl bg-[#e8d5a3]/5 hover:bg-[#e8d5a3]/10 transition-all text-sm"
            >
              {t(`sections.${key}`)}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/chart"
          className="px-8 py-4 bg-[#e8d5a3] text-[#0a0a1a] rounded-full font-bold text-lg hover:bg-[#f5e6b8] transition-all shadow-[0_0_30px_rgba(232,213,163,0.3)]"
        >
          {t('cta_free')}
        </Link>

        <p className="mt-4 text-xs text-[#e8d5a3]/40">{t('trust')}</p>
      </div>
    </main>
  );
}

function EnHomePage() {
  const t = useTranslations('landing');

  return (
    <main className="min-h-screen bg-[#f8f4ef] text-[#1a1a2e]">
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <span className="font-bold text-xl tracking-tight">FateScript</span>
        <Link href="/pricing" className="text-sm text-[#1a1a2e]/60 hover:text-[#1a1a2e]">Pricing</Link>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center max-w-3xl mx-auto">
        <div className="mb-6 px-4 py-1.5 bg-[#1a1a2e]/8 rounded-full text-sm text-[#1a1a2e]/60">
          Qi Zheng Si Yu · Ancient Chinese Astrology
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          {t('hero_title')}
        </h1>
        <p className="text-xl text-[#1a1a2e]/60 mb-10 max-w-lg">
          {t('hero_sub')}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-10 w-full max-w-md">
          {(['love','money','career','family'] as const).map((key) => (
            <Link
              key={key}
              href={`/chart?focus=${key}`}
              className="px-4 py-3 border border-[#1a1a2e]/15 rounded-xl hover:bg-[#1a1a2e]/5 transition-all text-sm text-left"
            >
              {t(`sections.${key}`)}
            </Link>
          ))}
        </div>

        <Link
          href="/chart"
          className="px-8 py-4 bg-[#1a1a2e] text-white rounded-full font-semibold text-lg hover:bg-[#2a2a4e] transition-all"
        >
          {t('cta_free')} →
        </Link>

        <p className="mt-4 text-sm text-[#1a1a2e]/40">Free · No signup required · Global cities supported</p>
      </div>
    </main>
  );
}
