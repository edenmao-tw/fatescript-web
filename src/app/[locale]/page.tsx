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
  {
    symbol: '☊', name: '羅睺', role: '你的靈魂方向',
    desc: '代表你這輩子應該往哪裡走、你的成長方向。它讓你感到陌生，卻又莫名吸引你——那種「我好像應該往那裡去」的感覺，就是羅睺在召喚你。',
    western: '北交點 North Node',
    westernNote: '西洋占星 & 印度占星（Rahu）完全對應。象徵靈魂這一世需要學習與擴張的方向，帶有木星與火星混合的衝勁。',
  },
  {
    symbol: '☋', name: '計都', role: '你帶來的習慣',
    desc: '代表你熟悉的舒適圈和過去生命帶來的本能。它是天生的才能，也可能是讓你原地打轉的慣性——你太熟練了，所以沒有察覺它正在限制你。',
    western: '南交點 South Node',
    westernNote: '西洋占星 & 印度占星（Ketu）完全對應。象徵業力與舊有模式，帶有土星的冷靜與孤獨感，也代表解脫與放下。',
  },
  {
    symbol: '◉', name: '月孛', role: '隱藏的執念',
    desc: '月亮軌道的遠地點，代表你最深層、最難被自己察覺的陰暗面。月孛落在哪裡，那個領域就容易有強烈的執念或糾纏，突破之後成長也最深。',
    western: '黑月莉莉絲 Black Moon Lilith',
    westernNote: '與西洋占星的黑月莉莉絲（月球軌道遠地點）高度吻合。象徵原始慾望、陰暗面與叛逆能量，也是最難被社會接受的那部分自我。',
  },
  {
    symbol: '✦', name: '紫氣', role: '隱藏的貴氣',
    desc: '四餘中唯一純吉的力量點。紫氣落在哪裡，那個領域就有說不清楚的好運氣與守護感，往往在你最需要的時候莫名其妙「安全下莊」。',
    western: '白月 Selena / White Moon',
    westernNote: '對應東歐占星流派的白月（Selena）。象徵神性保護、道德福報與靈性善因，是命盤中的守護天使。若月孛是命盤的「魔」，紫氣就是「佛性」。',
  },
];

const ZODIAC_SEASONS = [
  {
    season: '春', element: '木', note: '木旺——生長、啟動、向外擴張',
    color: 'from-emerald-900/30 to-emerald-900/10',
    border: 'border-emerald-700/30',
    labelColor: 'text-emerald-400',
    signs: [
      { symbol: '♈', zh: '牡羊座', en: 'Aries',       dates: '3/21–4/19',  planet: '火星', planetSymbol: '♂' },
      { symbol: '♉', zh: '金牛座', en: 'Taurus',      dates: '4/20–5/20',  planet: '金星', planetSymbol: '♀' },
      { symbol: '♊', zh: '雙子座', en: 'Gemini',      dates: '5/21–6/20',  planet: '水星', planetSymbol: '☿' },
    ],
  },
  {
    season: '夏', element: '火', note: '火旺——熱情、行動力、能量最強',
    color: 'from-orange-900/30 to-orange-900/10',
    border: 'border-orange-700/30',
    labelColor: 'text-orange-400',
    signs: [
      { symbol: '♋', zh: '巨蟹座', en: 'Cancer',      dates: '6/21–7/22',  planet: '月亮', planetSymbol: '☽' },
      { symbol: '♌', zh: '獅子座', en: 'Leo',         dates: '7/23–8/22',  planet: '太陽', planetSymbol: '☉' },
      { symbol: '♍', zh: '處女座', en: 'Virgo',       dates: '8/23–9/22',  planet: '水星', planetSymbol: '☿' },
    ],
  },
  {
    season: '秋', element: '金', note: '金旺——收斂、成熟、刀鋒最利',
    color: 'from-yellow-900/30 to-yellow-900/10',
    border: 'border-yellow-700/30',
    labelColor: 'text-yellow-400',
    signs: [
      { symbol: '♎', zh: '天秤座', en: 'Libra',       dates: '9/23–10/22', planet: '金星', planetSymbol: '♀' },
      { symbol: '♏', zh: '天蠍座', en: 'Scorpio',     dates: '10/23–11/21',planet: '火星', planetSymbol: '♂' },
      { symbol: '♐', zh: '射手座', en: 'Sagittarius', dates: '11/22–12/21',planet: '木星', planetSymbol: '♃' },
    ],
  },
  {
    season: '冬', element: '水', note: '水旺——潛藏、積蓄、等待出發',
    color: 'from-blue-900/30 to-blue-900/10',
    border: 'border-blue-700/30',
    labelColor: 'text-blue-400',
    signs: [
      { symbol: '♑', zh: '摩羯座', en: 'Capricorn',   dates: '12/22–1/19', planet: '土星', planetSymbol: '♄' },
      { symbol: '♒', zh: '水瓶座', en: 'Aquarius',    dates: '1/20–2/18',  planet: '土星', planetSymbol: '♄' },
      { symbol: '♓', zh: '雙魚座', en: 'Pisces',      dates: '2/19–3/20',  planet: '木星', planetSymbol: '♃' },
    ],
  },
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
  { num: '12', name: '業力玄秘宮', topic: '潛意識、你不自覺的重複' },
];

function ZhHomePage() {
  const t = useTranslations('landing');

  return (
    <main className="bg-[#0a0a1a] text-[#e8d5a3]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex flex-col items-center px-4 text-center pt-20 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1040_0%,_#0a0a1a_70%)]" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle, #e8d5a3 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 px-4 py-1.5 border border-[#e8d5a3]/30 rounded-full text-sm tracking-widest text-[#e8d5a3]/70">
            七政四餘 · 天文命理
          </div>
          <p className="text-base md:text-lg text-[#e8d5a3]/60 mb-3 tracking-wide">
            「12 星座是制服，七政四餘是量身定做。」
          </p>
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

        {/* Scroll hint */}
        <div className="mt-10 flex flex-col items-center gap-1 z-10">
          <p className="text-sm text-white/70 tracking-widest">什麼是七政四餘？</p>
          <svg
            className="w-5 h-5 text-white/50 animate-bounce"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 什麼是七政四餘 ── */}
      <section className="relative px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest text-[#e8d5a3]/40 mb-3">ABOUT THE SYSTEM</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">什麼是七政四餘？</h2>
          <p className="text-[#e8d5a3]/75 leading-relaxed text-base md:text-lg mb-4 max-w-3xl mx-auto">
            大部分人熟悉的「12 星座」是按出生月份劃分的，如同大數據下的集體標籤，全球有數億人共享同一個星座。但「七政四餘」截然不同——它是根據你出生那一刻，<strong className="text-[#e8d5a3]">天上星體的真實位置</strong>，為你拍下的「星空斷層掃描」。這是一張只屬於你的個人命盤，而非大眾化的通用模板。
          </p>
          <p className="text-[#e8d5a3]/60 leading-relaxed text-sm md:text-base mb-8 max-w-2xl mx-auto">
            這套系統由兩個核心維度交織而成：
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8 text-left max-w-3xl mx-auto">
            <div className="bg-[#e8d5a3]/5 border border-[#e8d5a3]/15 rounded-2xl p-6">
              <p className="text-[#e8d5a3] font-bold text-lg mb-2">「七政」</p>
              <p className="text-[#e8d5a3]/70 text-sm leading-relaxed">天空中真實運行的七顆行星，勾勒出你的天賦才華與行為模式——你的驅動力、思維方式、與人互動的本能。</p>
            </div>
            <div className="bg-[#e8d5a3]/5 border border-[#e8d5a3]/15 rounded-2xl p-6">
              <p className="text-[#e8d5a3] font-bold text-lg mb-2">「四餘」</p>
              <p className="text-[#e8d5a3]/70 text-sm leading-relaxed">月亮軌道上四個看不見的能量交點，埋藏著你靈魂深處的執念、業力與福報——那些你自己也說不清楚的深層模式。</p>
            </div>
          </div>
          <p className="text-[#e8d5a3]/75 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
            這張完整的星體地圖不只告訴你「你是誰」，更深層地揭示了你為何會這樣思考、為何在特定之處卡住，以及最重要的：<strong className="text-[#e8d5a3]">你什麼時候會迎來屬於自己的風口與好運。</strong>
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

        {/* ── 星座 × 季節 × 七政 ── */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
          <span className="text-[#e8d5a3]/30 text-sm tracking-widest">星座 × 季節 × 七政</span>
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
        </div>

        <div className="mb-8 text-center">
          <p className="text-[#e8d5a3]/55 text-sm leading-relaxed">
            你知道自己是什麼星座——但七政四餘告訴你的，是那個星座背後的<strong className="text-[#e8d5a3]">主宰行星</strong>，才是你真正的能量來源。<br />
            而且出生的季節，決定了那顆星的力量是強是弱。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {ZODIAC_SEASONS.map((s) => (
            <div key={s.season} className={`rounded-2xl p-5 border bg-gradient-to-b ${s.color} ${s.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-lg font-bold ${s.labelColor}`}>{s.season}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${s.border} ${s.labelColor} opacity-80`}>
                  {s.element}旺
                </span>
              </div>
              <p className="text-xs text-[#e8d5a3]/40 mb-4">{s.note}</p>
              <div className="flex flex-col gap-3">
                {s.signs.map((z) => (
                  <div key={z.zh} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl w-7 text-center">{z.symbol}</span>
                      <div>
                        <span className="text-sm font-semibold text-[#e8d5a3]">{z.zh}</span>
                        <span className="ml-1.5 text-xs text-[#e8d5a3]/40">{z.en}</span>
                        <span className="ml-1.5 text-xs text-[#e8d5a3]/30">{z.dates}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-base text-[#e8d5a3]/70">{z.planetSymbol}</span>
                      <span className="text-xs text-[#e8d5a3]/50">{z.planet}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Insight callout */}
        <div className="border border-[#e8d5a3]/15 rounded-2xl p-5 mb-16 bg-[#e8d5a3]/3">
          <p className="text-sm text-[#e8d5a3]/65 leading-relaxed">
            <span className="text-[#e8d5a3] font-semibold">💡 跟一般星座的差別是什麼？</span><br /><br />
            一般的「星座運勢」只看你出生時太陽在哪個星座——全球幾億人共用同一篇文章。
            七政四餘不同，它同時計算七顆行星在你出生那一刻的確切位置，
            以及你的<strong className="text-[#e8d5a3]">上升星座</strong>（命宮）的主宰星，才是你真正的「命主星」。
            <br /><br />
            同樣是獅子座，但如果你的上升在射手（木星主宰）和上升在金牛（金星主宰），
            整個人生主題完全不同——這才是七政四餘解讀的核心。
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
          <span className="text-[#e8d5a3]/30 text-sm tracking-widest">四餘</span>
          <div className="flex-1 h-px bg-[#e8d5a3]/15" />
        </div>

        {/* 四餘 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SIYU.map((s) => (
            <div key={s.name} className="border border-[#9b8fd4]/20 rounded-2xl p-5 bg-[#9b8fd4]/5 hover:bg-[#9b8fd4]/8 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-[#9b8fd4]">{s.symbol}</span>
                <div>
                  <span className="font-bold text-base">{s.name}</span>
                  <span className="ml-2 text-xs text-[#9b8fd4]/60">{s.role}</span>
                </div>
              </div>
              <p className="text-sm text-[#e8d5a3]/60 leading-relaxed mb-3">{s.desc}</p>
              {/* Western astrology correspondence */}
              <div className="border-t border-[#9b8fd4]/10 pt-3">
                <p className="text-xs text-[#9b8fd4]/70 font-semibold mb-1">
                  ≈ {s.western}
                </p>
                <p className="text-xs text-[#e8d5a3]/35 leading-relaxed">{s.westernNote}</p>
              </div>
            </div>
          ))}
        </div>
        {/* 四餘 callout */}
        <div className="border border-[#9b8fd4]/15 rounded-2xl p-5 mb-16 bg-[#9b8fd4]/3">
          <p className="text-sm text-[#e8d5a3]/60 leading-relaxed">
            <span className="text-[#9b8fd4] font-semibold">💡 為什麼四餘和西洋占星有對應？</span><br /><br />
            羅睺和計都是唐代從印度占星（Vedic Astrology）傳入中國的，本質上就是西洋占星的南北交點。
            月孛和黑月莉莉絲都是月球軌道上的特殊點，代表同一種陰暗面能量。
            東西方各自獨立發展出相似的觀察，說明這些點有其天文上的真實性。
            <br /><br />
            <span className="text-[#e8d5a3]/40">用西洋占星軟體如 Astro.com 可直接找到北交點（North Node）、黑月莉莉絲（Lilith）的位置，用於輔助參考。</span>
          </p>
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
