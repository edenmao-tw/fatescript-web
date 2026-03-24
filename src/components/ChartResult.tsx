'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChartInput {
  name: string;
  birthDate: string;
  birthTime: string;
  birthTimeUnknown: boolean;
  city: { name: string; country: string; lat: number; lng: number; displayName: string } | null;
  gender: string;
}

interface ModuleData {
  tier: 'free' | 'paid' | 'subscription';
  tag?: string | null;
  content?: { zh: string; en: string };
  preview?: { zh: string; en: string };
}

interface ChartData {
  lifeStar: {
    planetId: string;
    planetName: { zh: string; en: string };
    symbol: string;
    dignity: 'strong' | 'balanced' | 'challenged';
    dignityLabel: { zh: string; en: string };
    coreTruth: { zh: string; en: string };
    description: { zh: string; en: string };
    insights: { zh: string[]; en: string[] };
  };
  name: string | null;
  modules: Record<string, ModuleData>;
}

// ─── Module metadata ──────────────────────────────────────────────────────────
const MODULE_META: Record<string, { zh: { title: string; sub: string }; en: { title: string; sub: string } }> = {
  '01': { zh: { title: '核心人格', sub: '你天生是什麼樣的人' }, en: { title: 'Core Identity', sub: 'Who you truly are' } },
  '02': { zh: { title: '思維決策', sub: '你怎麼想、怎麼選擇' }, en: { title: 'Thinking Pattern', sub: 'How your mind works' } },
  '03': { zh: { title: '人生節奏', sub: '你什麼時候開始走運' }, en: { title: 'Life Timing', sub: 'When your moments arrive' } },
  '04': { zh: { title: '感情婚姻', sub: '你的感情模式與婚姻時機' }, en: { title: 'Love & Marriage', sub: 'Your relationship pattern' } },
  '05': { zh: { title: '人際貴人', sub: '誰是你的助力、誰是消耗' }, en: { title: 'Relationships', sub: 'Who lifts you, who drains you' } },
  '06': { zh: { title: '家庭原生', sub: '原生家庭怎麼影響你' }, en: { title: 'Family Roots', sub: 'How your origins shaped you' } },
  '07': { zh: { title: '子女教養', sub: '子女緣與教養方式' }, en: { title: 'Children & Legacy', sub: 'Your connection to the next generation' } },
  '08': { zh: { title: '財運金錢', sub: '你怎麼賺、怎麼花、守不守得住' }, en: { title: 'Money Pattern', sub: 'How money moves through your life' } },
  '09': { zh: { title: '事業定位', sub: '你適合做什麼、何時轉型' }, en: { title: 'Career Path', sub: 'Where you belong and when to pivot' } },
  '10': { zh: { title: '健康壓力', sub: '你的身體弱點與壓力來源' }, en: { title: 'Health & Stress', sub: 'Your body and burnout patterns' } },
  '11': { zh: { title: '流年全解讀', sub: '今年完整運勢＋全年流月＋每季開運（一次購買）' }, en: { title: 'Full Year Reading', sub: 'Complete year forecast + monthly guide + quarterly strategy (one-time)' } },
  '12': { zh: { title: '流月更新', sub: '本月適合推進什麼、暫停什麼' }, en: { title: 'Monthly Update', sub: 'What to push, what to pause this month' } },
  '13': { zh: { title: '季度開運', sub: '當季最值得做的 1 件事' }, en: { title: 'Quarterly Strategy', sub: 'The one move that matters most this season' } },
};

const FREE_ORDER = ['01', '02', '03', '06', '10'];
const PAID_ORDER = ['04', '05', '07', '08', '09'];
const SUB_ORDER  = ['11', '12', '13'];

// Per-module price labels
const SUB_PRICE: Record<string, { zh: string; en: string }> = {
  '11': { zh: 'NT$399 一次', en: '$14 one-time' },
  '12': { zh: 'NT$99/月',    en: '$3.99/mo' },
  '13': { zh: 'NT$199/季',   en: '$6.99/qtr' },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function LifeStarCard({ data, isZh }: { data: ChartData; isZh: boolean }) {
  const { lifeStar, name } = data;
  return (
    <div className={`rounded-2xl p-6 mb-8 relative overflow-hidden ${
      isZh
        ? 'bg-gradient-to-br from-[#1a1040] to-[#111128] border border-[#e8d5a3]/20'
        : 'bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] text-white'
    }`}>
      {/* Star dot grid — same as homepage */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #e8d5a3 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Soft glow top-right */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,213,163,0.12) 0%, transparent 70%)' }} />
      {/* Scattered accent stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '15%', left: '80%', size: '3px', opacity: 0.5 },
          { top: '60%', left: '88%', size: '2px', opacity: 0.35 },
          { top: '30%', left: '92%', size: '4px', opacity: 0.4 },
          { top: '75%', left: '75%', size: '2px', opacity: 0.3 },
        ].map((s, i) => (
          <div key={i} className="absolute rounded-full bg-[#e8d5a3]"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }} />
        ))}
      </div>

      {/* Content — above decorations */}
      <div className="relative z-10">
      {name && (
        <p className={`text-xs mb-3 ${isZh ? 'text-[#e8d5a3]/50' : 'text-white/50'}`}>
          {isZh ? `${name} 的命盤` : `${name}'s Chart`}
        </p>
      )}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl text-white">{lifeStar.symbol}</span>
        <div>
          <p className={`text-xs mb-0.5 ${isZh ? 'text-[#e8d5a3]/50' : 'text-white/50'}`}>
            {isZh ? '命主星' : 'Life Star'}
          </p>
          <p className={`font-bold text-xl ${isZh ? 'text-[#e8d5a3]' : 'text-white'}`}>
            {isZh ? lifeStar.planetName.zh : lifeStar.planetName.en}
            <span className={`ml-2 text-sm font-normal px-2 py-0.5 rounded-full ${
              lifeStar.dignity === 'strong'
                ? 'bg-amber-400/20 text-amber-300'       // 亮金
                : lifeStar.dignity === 'balanced'
                ? 'bg-emerald-400/20 text-emerald-300'    // 淺綠
                : 'bg-gray-400/20 text-gray-400'          // 淡灰
            }`}>
              {isZh ? lifeStar.dignityLabel.zh : lifeStar.dignityLabel.en}
            </span>
          </p>
        </div>
      </div>
      <p className="text-base font-semibold mb-2 leading-snug text-white">
        「{isZh ? lifeStar.coreTruth.zh : lifeStar.coreTruth.en}」
      </p>
      <p className={`text-sm leading-relaxed mb-4 ${isZh ? 'text-[#e8d5a3]/70' : 'text-white/70'}`}>
        {isZh ? lifeStar.description.zh : lifeStar.description.en}
      </p>
      {/* Extra insights */}
      {lifeStar.insights && (
        <div className={`border-t pt-4 space-y-2 ${isZh ? 'border-[#e8d5a3]/10' : 'border-white/10'}`}>
          {(isZh ? lifeStar.insights.zh : lifeStar.insights.en).map((line, i) => (
            <p key={i} className={`text-sm leading-relaxed flex gap-2 ${isZh ? 'text-[#e8d5a3]/60' : 'text-white/60'}`}>
              <span className={`mt-0.5 shrink-0 ${isZh ? 'text-[#e8d5a3]/30' : 'text-white/30'}`}>·</span>
              <span>{line}</span>
            </p>
          ))}
        </div>
      )}
      </div>{/* end z-10 content wrapper */}
    </div>
  );
}

function FreeModuleCard({ id, content, tag, dignity, isZh }: {
  id: string; content: string; tag?: string | null; dignity?: string; isZh: boolean;
}) {
  const meta = MODULE_META[id];
  const dignityColor = dignity === 'strong'
    ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
    : dignity === 'balanced'
    ? 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30'
    : dignity === 'challenged'
    ? 'bg-gray-400/15 text-gray-400 border-gray-400/30'
    : '';
  return (
    <div className={`rounded-2xl p-5 mb-4 ${
      isZh
        ? 'bg-[#111128] border border-[#e8d5a3]/10'
        : 'bg-white border border-gray-200 shadow-sm'
    }`}>
      <div className="flex items-start gap-3 mb-3">
        <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${
          isZh ? 'bg-[#e8d5a3]/10 text-[#e8d5a3]/50' : 'bg-gray-100 text-gray-400'
        }`}>{id}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-semibold text-base ${isZh ? 'text-[#e8d5a3]' : 'text-[#1a1a2e]'}`}>
              {isZh ? meta.zh.title : meta.en.title}
            </p>
            {tag && (
              <span className={`text-xs px-2 py-0.5 rounded-full border ${dignityColor}`}>
                {tag}
              </span>
            )}
          </div>
          <p className={`text-xs ${isZh ? 'text-[#e8d5a3]/40' : 'text-gray-400'}`}>
            {isZh ? meta.zh.sub : meta.en.sub}
          </p>
        </div>
      </div>
      <p className={`text-sm leading-relaxed whitespace-pre-line ${isZh ? 'text-[#e8d5a3]/80' : 'text-gray-600'}`}>
        {content}
      </p>
    </div>
  );
}

function LockedModuleCard({ id, preview, tier, isZh }: {
  id: string; preview: string; tier: 'paid' | 'subscription'; isZh: boolean;
}) {
  const meta = MODULE_META[id];
  const tierLabel = isZh
    ? (tier === 'subscription' ? (SUB_PRICE[id]?.zh ?? 'NT$99') : 'NT$299')
    : (tier === 'subscription' ? (SUB_PRICE[id]?.en ?? '$3.99') : '$9.99');
  return (
    <div className={`rounded-2xl p-5 mb-4 relative overflow-hidden ${
      isZh
        ? 'bg-[#111128] border border-[#e8d5a3]/8'
        : 'bg-white border border-gray-150 shadow-sm'
    }`}>
      <div className="flex items-start gap-3 mb-3">
        <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${
          isZh ? 'bg-[#e8d5a3]/8 text-[#e8d5a3]/30' : 'bg-gray-50 text-gray-300'
        }`}>{id}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className={`font-semibold text-base ${isZh ? 'text-[#e8d5a3]/60' : 'text-gray-400'}`}>
              {isZh ? meta.zh.title : meta.en.title}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              tier === 'subscription'
                ? isZh ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-500'
                : isZh ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-600'
            }`}>{tierLabel}</span>
          </div>
          <p className={`text-xs ${isZh ? 'text-[#e8d5a3]/30' : 'text-gray-300'}`}>
            {isZh ? meta.zh.sub : meta.en.sub}
          </p>
        </div>
      </div>
      {/* Preview text — the curiosity hook */}
      <p className={`text-sm leading-relaxed ${isZh ? 'text-[#e8d5a3]/50' : 'text-gray-400'}`}>
        {preview}
      </p>
      {/* Lock overlay */}
      <div className={`absolute inset-0 flex items-end justify-center pb-4 ${
        isZh
          ? 'bg-gradient-to-t from-[#111128] via-[#111128]/70 to-transparent'
          : 'bg-gradient-to-t from-white via-white/70 to-transparent'
      }`}>
        <span className={`text-lg ${isZh ? 'text-[#e8d5a3]/30' : 'text-gray-300'}`}>🔒</span>
      </div>
    </div>
  );
}

function PaywallBanner({ isZh, freeCount, totalCount }: {
  isZh: boolean; freeCount: number; totalCount: number;
}) {
  return (
    <div className={`rounded-2xl p-6 mb-6 text-center ${
      isZh
        ? 'bg-gradient-to-r from-[#2a1a5e] to-[#1a1040] border border-[#e8d5a3]/20'
        : 'bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4e] text-white'
    }`}>
      <p className={`text-xs mb-2 ${isZh ? 'text-[#e8d5a3]/50' : 'text-white/50'}`}>
        {isZh
          ? `你已看完 ${freeCount} / ${totalCount} 個解讀`
          : `${freeCount} of ${totalCount} readings revealed`}
      </p>
      <p className={`font-bold text-lg mb-1 ${isZh ? 'text-[#e8d5a3]' : 'text-white'}`}>
        {isZh ? '剩下 8 個解讀，正在等你' : '8 more readings are waiting'}
      </p>
      <p className={`text-sm mb-5 ${isZh ? 'text-[#e8d5a3]/60' : 'text-white/60'}`}>
        {isZh
          ? '包括你的感情模式、財運規律、和今年的關鍵轉折點'
          : `Including your love pattern, money blueprint, and this year's turning point`}
      </p>
      <div className="flex flex-col gap-3">
        {/* Primary: complete chart report (one-time, most comprehensive) */}
        <a href="/pricing?plan=full" className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all ${
          isZh
            ? 'bg-[#e8d5a3] text-[#0a0a1a] hover:bg-[#f0e4b8]'
            : 'bg-white text-[#1a1a2e] hover:bg-gray-100'
        }`}>
          {isZh ? '完整星盤解讀 NT$588（詳細報告）→' : 'Complete Chart Report · $19 one-time →'}
        </a>
        <p className={`text-xs ${isZh ? 'text-[#e8d5a3]/50' : 'text-white/50'}`}>
          {isZh ? '全 13 個模組完整版 ＋ 個人化詳細解說 ＋ 一份完整 PDF 報告' : 'All 13 modules in full + personalised deep-dive + complete PDF report'}
        </p>

        {/* Secondary: full year (ongoing value) */}
        <a href="/pricing?plan=year" className={`w-full py-3 rounded-full font-semibold text-sm transition-all border ${
          isZh
            ? 'border-[#e8d5a3]/40 text-[#e8d5a3]/80 hover:border-[#e8d5a3]/70'
            : 'border-white/40 text-white/80 hover:border-white/70'
        }`}>
          {isZh ? '流年全解讀 NT$399（今年運勢）→' : 'Full Year Reading · $14 one-time →'}
        </a>
        <p className={`text-xs ${isZh ? 'text-[#e8d5a3]/35' : 'text-white/35'}`}>
          {isZh ? '今年完整運勢 ＋ 全年流月更新 ＋ 每季開運策略' : 'Full year forecast + 12 monthly updates + 4 quarterly strategies'}
        </p>

        {/* Tertiary options */}
        <div className={`flex gap-2`}>
          <a href="/pricing?plan=quarter" className={`flex-1 py-2.5 rounded-full text-xs transition-all border text-center ${
            isZh
              ? 'border-[#e8d5a3]/20 text-[#e8d5a3]/50 hover:border-[#e8d5a3]/40'
              : 'border-white/20 text-white/50 hover:border-white/40'
          }`}>
            {isZh ? '季度開運 NT$199' : 'Quarterly $6.99'}
          </a>
          <a href="/pricing?plan=month" className={`flex-1 py-2.5 rounded-full text-xs transition-all border text-center ${
            isZh
              ? 'border-[#e8d5a3]/20 text-[#e8d5a3]/50 hover:border-[#e8d5a3]/40'
              : 'border-white/20 text-white/50 hover:border-white/40'
          }`}>
            {isZh ? '流月更新 NT$99' : 'Monthly $3.99'}
          </a>
        </div>

        <p className={`text-xs ${isZh ? 'text-[#e8d5a3]/25' : 'text-white/25'}`}>
          {isZh ? '或單次解鎖個別模組 NT$299' : 'Or unlock individual modules for $9.99'}
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChartResult({ locale }: { locale: 'zh-TW' | 'en' }) {
  const isZh = locale === 'zh-TW';
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('fsAdmin') === 'true');
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const raw = sessionStorage.getItem('chartInput');
        if (!raw) {
          setError('no-input');
          return;
        }
        const input: ChartInput = JSON.parse(raw);
        const res = await fetch('/api/chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (!res.ok) throw new Error('api-error');
        const data = await res.json();
        setChartData(data);
      } catch {
        setError('load-error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isZh ? 'bg-[#0a0a1a] text-[#e8d5a3]' : 'bg-[#f8f4ef] text-[#1a1a2e]'
      }`}>
        <div className="text-4xl mb-4 animate-pulse">{isZh ? '☽' : '✦'}</div>
        <p className="text-sm opacity-60">
          {isZh ? '正在解析你的命盤...' : 'Reading your chart...'}
        </p>
      </div>
    );
  }

  // Error: no birth data
  if (error === 'no-input') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 text-center ${
        isZh ? 'bg-[#0a0a1a] text-[#e8d5a3]' : 'bg-[#f8f4ef] text-[#1a1a2e]'
      }`}>
        <p className="text-lg font-semibold mb-2">
          {isZh ? '找不到你的生辰資料' : 'No birth data found'}
        </p>
        <p className="text-sm opacity-60 mb-6">
          {isZh ? '請重新輸入' : 'Please enter your information again'}
        </p>
        <Link href="/chart" className={`px-6 py-3 rounded-full text-sm font-semibold ${
          isZh ? 'bg-[#e8d5a3] text-[#0a0a1a]' : 'bg-[#1a1a2e] text-white'
        }`}>
          {isZh ? '重新輸入' : 'Try again'}
        </Link>
      </div>
    );
  }

  if (!chartData) return null;

  const freeContent = FREE_ORDER.map(id => ({
    id,
    content: (chartData.modules[id]?.content?.[isZh ? 'zh' : 'en']) ?? '',
    tag: chartData.modules[id]?.tag ?? null,
  }));

  // Admin: collect full content for all paid/sub modules
  const adminPaidContent = isAdmin
    ? [...PAID_ORDER, ...SUB_ORDER].map(id => ({
        id,
        content: (chartData.modules[id]?.content?.[isZh ? 'zh' : 'en'])
          ?? (chartData.modules[id]?.preview?.[isZh ? 'zh' : 'en'])
          ?? '',
        tag: chartData.modules[id]?.tag ?? null,
      }))
    : [];

  return (
    <main className={`min-h-screen ${isZh ? 'bg-[#0a0a1a]' : 'bg-[#f8f4ef]'}`}>
      {/* Top nav */}
      <div className={`px-4 pt-6 pb-2 flex items-center justify-between max-w-lg mx-auto`}>
        <Link href="/chart" className={`text-sm opacity-40 hover:opacity-70 transition-opacity ${
          isZh ? 'text-[#e8d5a3]' : 'text-[#1a1a2e]'
        }`}>
          ← {isZh ? '重新輸入' : 'Edit'}
        </Link>
        <Link href="/" className={`text-sm font-bold ${
          isZh ? 'text-[#e8d5a3]/60' : 'text-[#1a1a2e]/60'
        }`}>
          {isZh ? '命運圖譜' : 'FateScript'}
        </Link>
      </div>

      <div className="max-w-lg mx-auto px-4 pb-16 pt-4">
        {/* Life Star hero */}
        <LifeStarCard data={chartData} isZh={isZh} />

        {/* Section label */}
        <p className={`text-xs font-semibold tracking-widest mb-4 ${
          isZh ? 'text-[#e8d5a3]/40' : 'text-gray-400'
        }`}>
          {isZh ? '免費解讀' : 'FREE READINGS'}
        </p>

        {/* Free modules */}
        {freeContent.map(m => (
          <FreeModuleCard key={m.id} id={m.id} content={m.content} tag={m.tag} dignity={chartData.lifeStar.dignity} isZh={isZh} />
        ))}

        {/* Admin badge */}
        {isAdmin && (
          <div className="mb-4 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-900/10 flex items-center justify-between">
            <span className="text-xs text-emerald-400">✓ 作者模式：顯示所有完整內容</span>
            <a href="/admin" className="text-xs text-emerald-400/60 hover:text-emerald-400 underline">管理</a>
          </div>
        )}

        {/* Paywall banner — hidden in admin mode */}
        {!isAdmin && <PaywallBanner isZh={isZh} freeCount={5} totalCount={13} />}

        {/* Paid modules */}
        <p className={`text-xs font-semibold tracking-widest mb-4 ${
          isZh ? 'text-[#e8d5a3]/30' : 'text-gray-300'
        }`}>
          {isZh ? '付費解讀' : 'PAID READINGS'}
        </p>
        {isAdmin
          ? adminPaidContent.filter(m => PAID_ORDER.includes(m.id)).map(m => (
              <FreeModuleCard key={m.id} id={m.id} content={m.content} tag={m.tag} dignity={chartData.lifeStar.dignity} isZh={isZh} />
            ))
          : PAID_ORDER.map(id => {
              const mod = chartData.modules[id];
              return (
                <LockedModuleCard
                  key={id} id={id}
                  preview={isZh ? (mod.preview?.zh ?? '') : (mod.preview?.en ?? '')}
                  tier="paid" isZh={isZh}
                />
              );
            })
        }

        {/* Subscription modules */}
        <p className={`text-xs font-semibold tracking-widest mb-4 mt-2 ${
          isZh ? 'text-[#e8d5a3]/30' : 'text-gray-300'
        }`}>
          {isZh ? '訂閱制解讀' : 'SUBSCRIPTION READINGS'}
        </p>
        {isAdmin
          ? adminPaidContent.filter(m => SUB_ORDER.includes(m.id)).map(m => (
              <FreeModuleCard key={m.id} id={m.id} content={m.content} tag={m.tag} dignity={chartData.lifeStar.dignity} isZh={isZh} />
            ))
          : SUB_ORDER.map(id => {
              const mod = chartData.modules[id];
              return (
                <LockedModuleCard
                  key={id} id={id}
                  preview={isZh ? (mod.preview?.zh ?? '') : (mod.preview?.en ?? '')}
                  tier="subscription" isZh={isZh}
                />
              );
            })
        }

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <a href="/pricing" className={`inline-block px-8 py-4 rounded-full font-bold text-base transition-all ${
            isZh
              ? 'bg-[#e8d5a3] text-[#0a0a1a] hover:bg-[#f0e4b8] shadow-[0_0_30px_rgba(232,213,163,0.2)]'
              : 'bg-[#1a1a2e] text-white hover:bg-[#2d2d4e]'
          }`}>
            {isZh ? '解鎖完整命盤 →' : 'Unlock Full Chart →'}
          </a>
          <p className={`mt-3 text-xs ${isZh ? 'text-[#e8d5a3]/30' : 'text-gray-400'}`}>
            {isZh ? '隨時可取消 · 安全付款' : 'Cancel anytime · Secure payment'}
          </p>
        </div>
      </div>
    </main>
  );
}
