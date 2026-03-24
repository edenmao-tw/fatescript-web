import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage() {
  const locale = await getLocale();
  const isZh = locale === 'zh-TW';

  return isZh ? <ZhHomePage /> : <EnHomePage />;
}

const PLANETS = [
  { symbol: '☉', name: '太陽', role: '你的本質與生命力', desc: '你的自我表達方式、你想被世界怎麼看見。太陽落在哪個宮位，那裡就是你這輩子最想發光的地方。' },
  { symbol: '☽', name: '月亮', role: '你的情緒與直覺', desc: '你在壓力下的反應、你的安全感來源。月亮揭示你私下的模樣，也就是只有親近的人才看得到的那個你。' },
  { symbol: '♂', name: '火星', role: '你的行動力與欲望', desc: '你怎麼採取行動、你在衝突裡怎麼反應。火星也代表你對什麼事情充滿熱情，卻又容易在哪裡發火。' },
  { symbol: '☿', name: '水星', role: '你的思維與溝通', desc: '你怎麼思考、怎麼學習、怎麼做決定。水星決定你的大腦喜歡怎樣處理資訊，也影響你說話的方式。' },
  { symbol: '♃', name: '木星', role: '你的運氣與擴張', desc: '你的幸運領域在哪裡、你何時會迎來格局打開的機會。木星代表機會和成長，它在哪裡，那裡就容易有意外之喜。' },
  { symbol: '♀', name: '金星', role: '你的感情與吸引力', desc: '你愛上什麼樣的人、你被什麼樣的美所吸引。金星也揭示你的消費模式和你在關係裡扮演的角色。' },
  { symbol: '♄', name: '土星', role: '你的人生功課', desc: '你這輩子必須面對的挑戰和限制。土星很嚴格，但它也代表努力後最紮實的長期回報——別人的成功是衝刺，土星的成功是建築。' },
];

const SIYU = [
  { symbol: '☊', name: '羅睺', role: '你的靈魂方向', desc: '北交點。代表你這輩子應該往哪裡走、你的成長方向。它讓你感到陌生，卻又莫名吸引你。' },
  { symbol: '☋', name: '計都', role: '你帶來的習慣', desc: '南交點。代表你熟悉的舒適圈和過去生命帶來的本能。它是才能，也可能是讓你原地打轉的習慣。' },
  { symbol: '☯', name: '紫氣', role: '隱藏的貴氣', desc: '月亮軌道的隱形力量點。紫氣落在哪裡，那個領域就有一種說不清楚的好運氣，機緣往往在意料之外出現。' },
  { symbol: '◉', name: '月孛', role: '隱藏的阻力', desc: '月亮的暗面。月孛代表你最難突破的慣性，那個領域特別容易感覺卡住、繞圈子，但突破之後成長也最深。' },
];

const HOUSES = [
  { num: '01', name: '命宮', topic: '你是誰' },
  { num: '02', name: '財帛宮', topic: '錢與財富' },
  { num: '03', name: '兄弟宮', topic: '溝通與學習' },
  { num: '04', name: '田宅宮', topic: '家庭與原生' },
  { num: '05', name: '子女宮', topic: '創意與戀愛' },
  { num: '06', name: '奴僕宮', topic: '健康與工作' },
  { num: '07', name: '夫妻宮', topic: '婚姻與伴侶' },
  { num: '08', name: '疾厄宮', topic: '危機與轉化' },
  { num: '09', name: '遷移宮', topic: '遠行與視野' },
  { num: '10', name: '官祿宮', topic: '事業與名聲' },
  { num: '11', name: '福德宮', topic: '貴人與夢想' },
  { num: '12', name: '相貌宮', topic: '隱藏的自己' },
];

function ZhHomePage() {
  const t = useTranslations('landing');

  return (
    <main className="bg-[#0a0a1a] text-[#e8d5a3]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1040_0%,_#0a0a1a_70%)]" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle, #e8d5a3 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 px-4 py-1.5 border border-[#e8d5a3]/30 rounded-full text-sm tracking-widest text-[#e8d5a3]/70">
            七政四餘 · 天文命理
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight max-w-2xl">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-[#e8d5a3]/70 mb-10 max-w-xl">
            {t('hero_sub')}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10 w-full max-w-sm">
            {(['love','money','career','family'] as const).map((key) => (
              <Link key={key} href={`/chart?focus=${key}`}
                className="px-4 py-3 border border-[#e8d5a3]/20 rounded-xl bg-[#e8d5a3]/5 hover:bg-[#e8d5a3]/10 transition-all text-sm">
                {t(`sections.${key}`)}
              </Link>
            ))}
          </div>

          <Link href="/chart"
            className="px-8 py-4 bg-[#e8d5a3] text-[#0a0a1a] rounded-full font-bold text-lg hover:bg-[#f5e6b8] transition-all shadow-[0_0_30px_rgba(232,213,163,0.3)]">
            {t('cta_free')}
          </Link>
          <p className="mt-4 text-xs text-[#e8d5a3]/40">{t('trust')}</p>
        </div>
      </section>

      {/* ── 什麼是七政四餘 ── */}
      <section className="relative px-6 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest text-[#e8d5a3]/40 mb-3">ABOUT THE SYSTEM</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">什麼是七政四餘？</h2>
          <p className="text-[#e8d5a3]/65 leading-relaxed text-base md:text-lg">
            大部分人熟悉的「12 星座」，是按出生月份分的——全球有幾億人跟你「同一個星座」。<br className="hidden md:block" />
            七政四餘不一樣。它根據你出生那一刻，<strong className="text-[#e8d5a3]">天上星體的真實位置</strong>，計算出只屬於你的命盤。
          </p>
          <p className="mt-4 text-[#e8d5a3]/65 leading-relaxed text-base md:text-lg">
            七政指的是七顆行星，四餘是月亮軌道上四個看不見的力量點。
            兩者加在一起，構成一張完整的星體地圖——
            說的是你<strong className="text-[#e8d5a3]">為什麼會這樣想、這樣選擇、這樣卡住</strong>，以及你什麼時候會走運。
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
          <span className="text-[#e8d5a3]/30 text-sm tracking-widest">七政</span>
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
        </div>

        {/* 七政 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {PLANETS.map((p) => (
            <div key={p.name} className="border border-[#e8d5a3]/15 rounded-2xl p-5 bg-[#e8d5a3]/3 hover:bg-[#e8d5a3]/6 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-[#e8d5a3]">{p.symbol}</span>
                <div>
                  <span className="font-bold text-base">{p.name}</span>
                  <span className="ml-2 text-xs text-[#e8d5a3]/50">{p.role}</span>
                </div>
              </div>
              <p className="text-sm text-[#e8d5a3]/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
          <span className="text-[#e8d5a3]/30 text-sm tracking-widest">四餘</span>
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
        </div>

        {/* 四餘 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {SIYU.map((s) => (
            <div key={s.name} className="border border-[#9b8fd4]/20 rounded-2xl p-5 bg-[#9b8fd4]/5 hover:bg-[#9b8fd4]/8 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-[#9b8fd4]">{s.symbol}</span>
                <div>
                  <span className="font-bold text-base">{s.name}</span>
                  <span className="ml-2 text-xs text-[#9b8fd4]/60">{s.role}</span>
                </div>
              </div>
              <p className="text-sm text-[#e8d5a3]/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
          <span className="text-[#e8d5a3]/30 text-sm tracking-widest">12 宮位</span>
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
        </div>

        {/* 宮位說明 */}
        <p className="text-center text-[#e8d5a3]/55 text-sm mb-8 leading-relaxed">
          命盤被分成 12 個宮位，每個宮位掌管人生的一個領域。<br />
          行星落在哪個宮位，就把那顆星的能量帶進那個生命區塊。
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
          {HOUSES.map((h) => (
            <div key={h.num} className="border border-[#e8d5a3]/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-xs text-[#e8d5a3]/30 font-mono w-5 shrink-0">{h.num}</span>
              <div>
                <div className="text-sm font-semibold">{h.name}</div>
                <div className="text-xs text-[#e8d5a3]/45">{h.topic}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center border border-[#e8d5a3]/15 rounded-3xl p-10 bg-[#e8d5a3]/3">
          <h3 className="text-2xl font-bold mb-3">你的命盤，現在就能看</h3>
          <p className="text-[#e8d5a3]/55 mb-8 text-sm leading-relaxed">
            輸入出生年月日、時間、地點<br />
            30 秒計算出你的命主星與五個免費解讀模組
          </p>
          <Link href="/chart"
            className="inline-block px-8 py-4 bg-[#e8d5a3] text-[#0a0a1a] rounded-full font-bold text-base hover:bg-[#f5e6b8] transition-all shadow-[0_0_30px_rgba(232,213,163,0.2)]">
            免費看我的命盤 →
          </Link>
          <p className="mt-4 text-xs text-[#e8d5a3]/30">不用下載・不用登入・完全免費</p>
        </div>
      </section>
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
