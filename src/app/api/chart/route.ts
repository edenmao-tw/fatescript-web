import { NextRequest, NextResponse } from 'next/server';

// ─── Planet pool ─────────────────────────────────────────────────────────────
const PLANETS = [
  {
    id: 'jupiter',
    zh: '木星', en: 'Jupiter',
    symbol: '♃',
    strong: {
      coreTruth: { zh: '你天生看得比別人遠，問題是你走得也比別人快', en: "You see further than others — the problem is you also move faster than they can follow" },
      desc: { zh: '你有強烈的擴張本能，很難被困在一個地方。你不是不穩定，是你的格局天生比別人大。', en: "You have an innate drive to expand. You're not unstable — your vision is simply bigger than your environment." },
    },
    balanced: {
      coreTruth: { zh: '你的智慧是把別人的混亂變成機會', en: "Your gift is turning other people's chaos into your opportunity" },
      desc: { zh: '你擅長在看似無解的局面裡找到出口。這不是運氣，是你天生的思維模式。', en: "You find exits where others see dead ends. That's not luck — it's how your mind works." },
    },
    challenged: {
      coreTruth: { zh: '你總覺得自己差一步，其實你早就夠了', en: "You always feel one step behind — but you've actually been enough for a long time" },
      desc: { zh: '你對自己的要求比任何人都嚴，但你給自己的認可永遠不夠。這個模式從小就開始了。', en: "You hold yourself to standards no one else could meet — and the approval you give yourself is never enough. This pattern started young." },
    },
  },
  {
    id: 'venus',
    zh: '金星', en: 'Venus',
    symbol: '♀',
    strong: {
      coreTruth: { zh: '你以為自己在找愛，其實你一直在找一個懂你的人', en: "You think you're looking for love — you're actually looking for someone who truly sees you" },
      desc: { zh: '你的感情天賦極強，但你選人的眼光往往被表面吸引。真正適合你的人，可能讓你覺得太平淡。', en: "Your capacity for love is extraordinary, but you're drawn to surfaces. The person who's truly right for you might feel 'too easy' at first." },
    },
    balanced: {
      coreTruth: { zh: '你的魅力不在外表，在你讓人覺得被看見的方式', en: "Your magnetism isn't in how you look — it's in how you make people feel seen" },
      desc: { zh: '你天生有讓人放下防備的能力。這是禮物，但也讓你容易被需要你的人消耗。', en: "You have a natural gift for making people let their guard down. That's a gift — and also why draining people find their way to you." },
    },
    challenged: {
      coreTruth: { zh: '你不是不值得被愛，你是把自己給得太快太多', en: "You're not unlovable — you just give yourself away too fast, too completely" },
      desc: { zh: '你習慣付出，害怕成為別人的負擔。但這讓你的感情總是失衡。', en: "You're used to giving, terrified of being a burden. But this keeps tipping your relationships out of balance." },
    },
  },
  {
    id: 'saturn',
    zh: '土星', en: 'Saturn',
    symbol: '♄',
    strong: {
      coreTruth: { zh: '你不是慢，你是在等一個真正對的時機', en: "You're not slow — you're waiting for the moment that's actually right" },
      desc: { zh: '你的人生節奏比別人慢，但你的成就往往更紮實。你不是走錯路，你是在走一條別人看不懂的路。', en: "Your pace is slower than others, but your foundations are deeper. You're not on the wrong path — just one others can't yet read." },
    },
    balanced: {
      coreTruth: { zh: '你的穩定是你最大的資產，但有時候也是你的牢籠', en: "Your stability is your greatest asset — and sometimes your cage" },
      desc: { zh: '你很擅長建立結構，但也容易因為「太穩」而錯過真正的機會。', en: "You build structure beautifully — but 'too stable' sometimes means the real opportunities pass you by." },
    },
    challenged: {
      coreTruth: { zh: '你比任何人都努力，但你一直在跟一個不存在的標準比較', en: "You work harder than anyone — and you keep measuring yourself against a standard that doesn't exist" },
      desc: { zh: '你對自己苛刻，怕不夠好。這個「不夠」的感覺跟你的實際成就沒有關係。', en: "You're harsh on yourself, afraid of falling short. That 'not enough' feeling has nothing to do with what you've actually built." },
    },
  },
  {
    id: 'moon',
    zh: '月亮', en: 'Moon',
    symbol: '☽',
    strong: {
      coreTruth: { zh: '你感覺到的事，往往比你說得出的更正確', en: "What you sense is almost always more accurate than what you can put into words" },
      desc: { zh: '你的直覺極強，但你常常懷疑自己的感覺。事實是：你的感覺大部分時候都是對的。', en: "Your intuition is sharp — but you doubt it constantly. The truth is, your gut is right most of the time." },
    },
    balanced: {
      coreTruth: { zh: '你的情緒不是弱點，是你看世界最精準的工具', en: "Your emotions aren't a weakness — they're the most accurate tool you have" },
      desc: { zh: '你比大多數人更能感受環境的變化。這讓你容易被影響，但也讓你能看到別人看不到的。', en: "You pick up on shifts others miss. That sensitivity makes you vulnerable — and gives you access to what others can't see." },
    },
    challenged: {
      coreTruth: { zh: '你表現得夠強了，但你內心那個需要被安撫的部分還在等', en: "You perform strength well — but the part of you that needs reassurance is still waiting" },
      desc: { zh: '你學會了不讓別人看到你在乎。但你其實非常在乎，只是不知道怎麼說。', en: "You've learned not to show how much you care. But you care deeply — you just never learned how to say it." },
    },
  },
  {
    id: 'mars',
    zh: '火星', en: 'Mars',
    symbol: '♂',
    strong: {
      coreTruth: { zh: '你不是好鬥，你只是不能接受浪費', en: "You're not aggressive — you just can't stand waste: wasted time, wasted potential, wasted truth" },
      desc: { zh: '你的行動力極強，但你的衝動也讓你錯過需要等待的時機。你最大的挑戰是學會「策略性地等」。', en: "Your drive is extraordinary — but your impulse costs you the moments that required waiting. Your biggest challenge: learning to wait strategically." },
    },
    balanced: {
      coreTruth: { zh: '你保護別人的本能比保護自己強得多', en: "Your instinct to protect others is far stronger than your instinct to protect yourself" },
      desc: { zh: '你很會替別人衝，但自己遇到困難時卻不知道怎麼求助。', en: "You fight hard for others — but when you're struggling, asking for help doesn't come naturally." },
    },
    challenged: {
      coreTruth: { zh: '你的憤怒底下有一個很深的受傷', en: "Underneath your anger is a wound that runs much deeper than the surface" },
      desc: { zh: '你不是容易生氣，你是長期沒有人真正回應你。這個憤怒有來源。', en: "You're not quick to anger — you've just gone too long without being truly heard. This anger has an origin." },
    },
  },
  {
    id: 'mercury',
    zh: '水星', en: 'Mercury',
    symbol: '☿',
    strong: {
      coreTruth: { zh: '你的腦子一直在轉，但你不確定這樣是好事還是壞事', en: "Your mind never stops — and you're not sure if that's a gift or a curse" },
      desc: { zh: '你的思維速度比別人快，這讓你看到機會，但也讓你陷入過度分析。', en: "Your thinking runs faster than most — that's why you spot opportunities, and why you also spiral into overthinking." },
    },
    balanced: {
      coreTruth: { zh: '你擅長理解別人，但沒有人用同樣的方式理解你', en: "You're good at understanding people — but no one has understood you quite the same way back" },
      desc: { zh: '你是很好的溝通者，但你真正想說的話，往往說不出口。', en: "You communicate well — but the things you most need to say are the ones you never quite manage to." },
    },
    challenged: {
      coreTruth: { zh: '你的懷疑不是悲觀，是你見過太多承諾沒有兌現', en: "Your skepticism isn't pessimism — you've just seen too many promises break" },
      desc: { zh: '你的謹慎源自於曾經信任過不該信任的事。這讓你保護自己，但也讓你錯過真心。', en: "Your caution comes from trusting things that didn't deserve it. It protects you — and costs you genuine connection." },
    },
  },
  {
    id: 'sun',
    zh: '太陽', en: 'Sun',
    symbol: '☉',
    strong: {
      coreTruth: { zh: '你天生就該站在聚光燈下，但你一直假裝不在意', en: "You were born to be seen — and you've spent years pretending you don't care about that" },
      desc: { zh: '你有強烈的存在感，但你對被看見這件事又愛又怕。你的野心和你的恐懼一樣大。', en: "Your presence is undeniable — but being seen both thrills and terrifies you. Your ambition and your fear are the same size." },
    },
    balanced: {
      coreTruth: { zh: '你不是需要被認可，你是需要知道自己做的事是有意義的', en: "You don't need approval — you need to know what you're doing actually matters" },
      desc: { zh: '你很能扛責任，但如果長期感覺「這有什麼用」，你會悄悄崩潰。', en: "You carry responsibility well — but if you go too long without a sense of meaning, you quietly start to crumble." },
    },
    challenged: {
      coreTruth: { zh: '你習慣讓別人先，但你心裡其實很清楚你想要什麼', en: "You've learned to defer — but you know exactly what you want, and that clarity scares you" },
      desc: { zh: '你把自己的需求排在最後，久了你已經不確定那些需求是否值得被滿足。', en: "You've put your needs last for so long, you've started questioning whether they deserve to be met." },
    },
  },
] as const;

type Planet = typeof PLANETS[number];
type DignityKey = 'strong' | 'balanced' | 'challenged';

// Deterministic picker from birth date
function pickFromDate(date: string) {
  const d = new Date(date);
  const month = d.getMonth(); // 0–11
  const day = d.getDate();    // 1–31
  const planet = PLANETS[month % PLANETS.length] as Planet;
  const dignityKeys: DignityKey[] = ['strong', 'balanced', 'challenged'];
  const dignity = dignityKeys[day % 3];
  return { planet, dignity };
}

// Free module content pool
function generateModuleContent(planetId: string, dignity: DignityKey, moduleId: string, lang: 'zh' | 'en') {
  const contentMap: Record<string, Record<string, Record<DignityKey, { zh: string; en: string }>>> = {
    '01': { // 核心人格 / Core Identity
      preview: {
        strong: {
          zh: '你天生就不適合被安排，你需要自己選擇自己的路。這不是任性，這是你的本質。',
          en: "You were never meant to follow a script. Choosing your own path isn't stubbornness — it's your nature.",
        },
        balanced: {
          zh: '你的核心性格是「橋樑」。你天生懂得在不同的人之間建立連結，這是你最深層的禮物。',
          en: "Your core nature is the bridge-builder. You instinctively connect people across differences — that's your deepest gift.",
        },
        challenged: {
          zh: '你表現出來的和你心裡真正想要的，往往不一樣。這個落差讓你很累。',
          en: "What you show the world and what you actually want are often different. That gap is exhausting.",
        },
      },
    },
    '02': { // 思維決策 / Thinking Pattern
      preview: {
        strong: {
          zh: '你做決定很快，但你的直覺比你的分析更可信。問題是你不相信自己的直覺。',
          en: "You decide fast, but your instincts are more reliable than your analysis. The problem is you don't trust them.",
        },
        balanced: {
          zh: '你習慣先想清楚再行動，但有時候想太多讓你錯過了時機。',
          en: "You think before you act — but sometimes the thinking outlasts the window of opportunity.",
        },
        challenged: {
          zh: '你的腦子裡有太多聲音。那個最小聲的，往往才是真的你。',
          en: "There are too many voices in your head. The quietest one is usually the real you.",
        },
      },
    },
    '03': { // 人生節奏 / Life Timing
      preview: {
        strong: {
          zh: '你的黃金期不是別人說的「應該要成功的年紀」。你的時鐘跑得不一樣。',
          en: "Your peak years don't follow the schedule others set. Your clock runs differently.",
        },
        balanced: {
          zh: '你現在感覺卡住，可能是因為你正在走一個「蓄力期」，不是真的失敗。',
          en: "If you feel stuck right now, it may be because you're in a building phase — not a failing one.",
        },
        challenged: {
          zh: '你過去吃了很多虧，但那些虧讓你建起了別人沒有的判斷力。',
          en: "You've paid more than your share of dues — but those costs bought you a judgment others don't have.",
        },
      },
    },
    '06': { // 家庭原生 / Family Roots
      preview: {
        strong: {
          zh: '你從小就知道自己和家裡其他人不太一樣。這不是問題，這是線索。',
          en: "You knew from a young age that you were different from the rest of your family. That's not a problem — it's a clue.",
        },
        balanced: {
          zh: '你的原生家庭給了你力量，但也給了你一個你一直在試圖超越的框框。',
          en: "Your family gave you strength — and a frame you've been trying to grow beyond ever since.",
        },
        challenged: {
          zh: '你花了很多能量在修復一些不是你造成的事情。是時候停下來問：這是我的責任嗎？',
          en: "You've spent enormous energy fixing things you didn't break. It's time to ask: is this mine to carry?",
        },
      },
    },
    '10': { // 健康壓力 / Health & Stress
      preview: {
        strong: {
          zh: '你的身體承受壓力的能力很強，但你習慣忽略訊號，直到它大聲說話。',
          en: "Your body handles pressure well — but you're used to ignoring its signals until they're impossible to miss.",
        },
        balanced: {
          zh: '你的壓力通常不來自工作，而來自「沒有被理解」的感覺。',
          en: "Your stress usually isn't from workload — it's from feeling fundamentally misunderstood.",
        },
        challenged: {
          zh: '你的焦慮往往在深夜最重。那是你終於停下來，沒有辦法再假裝沒事的時候。',
          en: "Your anxiety peaks at night — when you finally stop moving and can no longer pretend everything's fine.",
        },
      },
    },
  };

  const mod = contentMap[moduleId];
  if (!mod) return lang === 'zh' ? '解讀生成中...' : 'Generating reading...';
  return mod.preview?.[dignity]?.[lang] ?? (lang === 'zh' ? '解讀生成中...' : 'Generating reading...');
}

// ─── Locked module previews (curiosity hooks) ────────────────────────────────
const LOCKED_PREVIEWS: Record<string, { zh: string; en: string }> = {
  '04': {
    zh: '你的感情模式有一個很深的規律——你一直在重複一種選擇。解鎖看清楚是什麼。',
    en: "Your love pattern has a deep consistency — you keep making one specific choice. Unlock to see what it is.",
  },
  '05': {
    zh: '你身邊有一種人，是你的真正貴人。但你可能一直認錯了方向。',
    en: "There's one type of person who's genuinely your catalyst — and you've probably been looking in the wrong direction.",
  },
  '07': {
    zh: '你和孩子（或下一代）的關係，會照出你最想改變的那個部分。',
    en: "Your relationship with the next generation will mirror exactly the part of yourself you most want to change.",
  },
  '08': {
    zh: '你和錢之間有一個隱藏的模式。不是能力問題，是信念問題。解鎖看見它。',
    en: "You and money have a hidden pattern. It's not about skill — it's about a belief you don't know you're carrying.",
  },
  '09': {
    zh: '你現在的工作，可能不是你最適合的舞台。你真正的位置，命盤早就寫好了。',
    en: "Your current role may not be your right stage. Where you belong has already been written — unlock to read it.",
  },
  '11': {
    zh: '今年有一個關鍵轉折點，準確到可以標注月份。訂閱後查看。',
    en: "This year has a key turning point specific enough to mark on a calendar. Subscribe to see when.",
  },
  '12': {
    zh: '本月有一件事你適合推進，有一件事你應該停下來。具體行動在訂閱內容裡。',
    en: "This month has one thing to push and one thing to pause. The specific actions are inside the subscription.",
  },
  '13': {
    zh: '根據你的命盤，有三個具體行動可以改變你現在的卡關狀態。訂閱查看。',
    en: "Based on your chart, there are three specific actions that can shift your current block. Subscribe to access them.",
  },
};

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { birthDate, birthTime, city, gender, name } = body;

  if (!birthDate) {
    return NextResponse.json({ error: 'birthDate required' }, { status: 400 });
  }

  const { planet, dignity } = pickFromDate(birthDate);
  const dignityLabel = {
    zh: { strong: '命強', balanced: '命平', challenged: '命弱' },
    en: { strong: 'Strong', balanced: 'Balanced', challenged: 'Challenged' },
  };

  const freeModules = ['01', '02', '03', '06', '10'];
  const paidModules = ['04', '05', '07', '08', '09'];
  const subModules = ['11', '12', '13'];

  const modules: Record<string, object> = {};

  for (const id of freeModules) {
    modules[id] = {
      tier: 'free',
      content: {
        zh: generateModuleContent(planet.id, dignity, id, 'zh'),
        en: generateModuleContent(planet.id, dignity, id, 'en'),
      },
    };
  }
  for (const id of paidModules) {
    modules[id] = {
      tier: 'paid',
      preview: LOCKED_PREVIEWS[id],
    };
  }
  for (const id of subModules) {
    modules[id] = {
      tier: 'subscription',
      preview: LOCKED_PREVIEWS[id],
    };
  }

  return NextResponse.json({
    lifeStar: {
      planetId: planet.id,
      planetName: { zh: planet.zh, en: planet.en },
      symbol: planet.symbol,
      dignity,
      dignityLabel: { zh: dignityLabel.zh[dignity], en: dignityLabel.en[dignity] },
      coreTruth: planet[dignity].coreTruth,
      description: planet[dignity].desc,
    },
    name: name || null,
    birthDate,
    birthTime: birthTime || null,
    cityName: city?.name || null,
    gender,
    modules,
  });
}
