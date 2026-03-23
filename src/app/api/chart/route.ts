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
      insights: {
        zh: ['你最大的天賦是讓人相信一件事是可能的——即使你自己還沒確定', '你會不斷往前，直到有一天你突然累了，然後你才發現你一直沒有停下來過'],
        en: ["Your greatest gift is making others believe something is possible — even when you're not sure yourself", "You keep moving until one day you're suddenly exhausted — and realize you never stopped to rest"],
      },
    },
    balanced: {
      coreTruth: { zh: '你的智慧是把別人的混亂變成機會', en: "Your gift is turning other people's chaos into your opportunity" },
      desc: { zh: '你擅長在看似無解的局面裡找到出口。這不是運氣，是你天生的思維模式。', en: "You find exits where others see dead ends. That's not luck — it's how your mind works." },
      insights: {
        zh: ['你對人有一種本能的好奇——你真的想知道每個人背後的故事', '你最危險的狀態是：你可以幫所有人找到方向，卻唯獨找不到自己的'],
        en: ['You have a genuine curiosity about people — you actually want to know the story behind each person', "Your most dangerous state: you can find direction for everyone else, but not for yourself"],
      },
    },
    challenged: {
      coreTruth: { zh: '你總覺得自己差一步，其實你早就夠了', en: "You always feel one step behind — but you've actually been enough for a long time" },
      desc: { zh: '你對自己的要求比任何人都嚴，但你給自己的認可永遠不夠。這個模式從小就開始了。', en: "You hold yourself to standards no one else could meet — and the approval you give yourself is never enough. This pattern started young." },
      insights: {
        zh: ['你在別人面前表現得比實際更有自信——這是保護機制，不是虛假', '你最需要的那句話，你從來沒有從最想聽到的人那裡聽到過'],
        en: ['You project more confidence than you feel — that\'s a protective mechanism, not dishonesty', "The words you most need to hear, you've never received from the person you most wanted them from"],
      },
    },
  },
  {
    id: 'venus',
    zh: '金星', en: 'Venus',
    symbol: '♀',
    strong: {
      coreTruth: { zh: '你以為自己在找愛，其實你一直在找一個懂你的人', en: "You think you're looking for love — you're actually looking for someone who truly sees you" },
      desc: { zh: '你的感情天賦極強，但你選人的眼光往往被表面吸引。真正適合你的人，可能讓你覺得太平淡。', en: "Your capacity for love is extraordinary, but you're drawn to surfaces. The person who's truly right for you might feel 'too easy' at first." },
      insights: {
        zh: ['你在感情裡付出的時候比任何時候都覺得自己活著', '你最怕的不是失去對方，是失去那個在愛裡的自己'],
        en: ['You feel most alive when you\'re giving in love', 'What you fear most isn\'t losing them — it\'s losing the version of yourself that exists in love'],
      },
    },
    balanced: {
      coreTruth: { zh: '你的魅力不在外表，在你讓人覺得被看見的方式', en: "Your magnetism isn't in how you look — it's in how you make people feel seen" },
      desc: { zh: '你天生有讓人放下防備的能力。這是禮物，但也讓你容易被需要你的人消耗。', en: "You have a natural gift for making people let their guard down. That's a gift — and also why draining people find their way to you." },
      insights: {
        zh: ['你很少拒絕別人，不是因為你沒有界線，是因為你不忍心看到對方失望', '你周圍的人感覺比你更輕鬆——你不自覺在承擔一種你沒被要求的重量'],
        en: ['You rarely say no — not because you lack boundaries, but because you can\'t bear seeing disappointment', 'The people around you feel lighter than you — you\'re quietly carrying weight no one asked you to hold'],
      },
    },
    challenged: {
      coreTruth: { zh: '你不是不值得被愛，你是把自己給得太快太多', en: "You're not unlovable — you just give yourself away too fast, too completely" },
      desc: { zh: '你習慣付出，害怕成為別人的負擔。但這讓你的感情總是失衡。', en: "You're used to giving, terrified of being a burden. But this keeps tipping your relationships out of balance." },
      insights: {
        zh: ['你在感情裡最大的傷，不是被拋棄，是覺得自己的存在讓對方不自由', '你值得一段不需要你一直努力的關係——但你還沒相信這件事'],
        en: ['Your deepest wound in love isn\'t abandonment — it\'s feeling like your presence made someone feel trapped', 'You deserve a relationship that doesn\'t require constant effort — but you haven\'t believed that yet'],
      },
    },
  },
  {
    id: 'saturn',
    zh: '土星', en: 'Saturn',
    symbol: '♄',
    strong: {
      coreTruth: { zh: '你不是慢，你是在等一個真正對的時機', en: "You're not slow — you're waiting for the moment that's actually right" },
      desc: { zh: '你的人生節奏比別人慢，但你的成就往往更紮實。你不是走錯路，你是在走一條別人看不懂的路。', en: "Your pace is slower than others, but your foundations are deeper. You're not on the wrong path — just one others can't yet read." },
      insights: {
        zh: ['你對品質的要求讓你慢，但也讓你做出來的東西能撐很久', '你最不需要的是別人催你——你已經是全場對自己最嚴格的那個人'],
        en: ['Your standards slow you down — and make everything you build last', "The last thing you need is someone pushing you — you're already the most demanding person in the room, toward yourself"],
      },
    },
    balanced: {
      coreTruth: { zh: '你的穩定是你最大的資產，但有時候也是你的牢籠', en: "Your stability is your greatest asset — and sometimes your cage" },
      desc: { zh: '你很擅長建立結構，但也容易因為「太穩」而錯過真正的機會。', en: "You build structure beautifully — but 'too stable' sometimes means the real opportunities pass you by." },
      insights: {
        zh: ['你在別人眼裡是那個可以依靠的人——但你自己靠在誰身上？', '你最怕的不是失敗，是亂——所以你用穩定來管理你對未知的恐懼'],
        en: ['To everyone else, you\'re the reliable one — but who do you lean on?', 'What you fear most isn\'t failure — it\'s chaos. You use stability to manage your fear of the unknown'],
      },
    },
    challenged: {
      coreTruth: { zh: '你比任何人都努力，但你一直在跟一個不存在的標準比較', en: "You work harder than anyone — and you keep measuring yourself against a standard that doesn't exist" },
      desc: { zh: '你對自己苛刻，怕不夠好。這個「不夠」的感覺跟你的實際成就沒有關係。', en: "You're harsh on yourself, afraid of falling short. That 'not enough' feeling has nothing to do with what you've actually built." },
      insights: {
        zh: ['你花了很多時間準備，因為你害怕在沒準備好的時候失敗——但完美的準備永遠不會來', '你的努力是真實的，你的成就是真實的，只有你對自己的評分是扭曲的'],
        en: ['You over-prepare because you fear failing before you\'re ready — but perfect readiness never arrives', 'Your effort is real. Your results are real. Only your self-assessment is distorted'],
      },
    },
  },
  {
    id: 'moon',
    zh: '月亮', en: 'Moon',
    symbol: '☽',
    strong: {
      coreTruth: { zh: '你感覺到的事，往往比你說得出的更正確', en: "What you sense is almost always more accurate than what you can put into words" },
      desc: { zh: '你的直覺極強，但你常常懷疑自己的感覺。事實是：你的感覺大部分時候都是對的。', en: "Your intuition is sharp — but you doubt it constantly. The truth is, your gut is right most of the time." },
      insights: {
        zh: ['你進入一個房間就能感覺到氣氛——你不只是敏感，你是一個活的情緒偵測器', '你最累的時候不是工作過多，而是在太多人身邊待太久'],
        en: ['You can read a room the moment you enter — you\'re not just sensitive, you\'re a living emotional sensor', 'You\'re most drained not by overwork but by too much time surrounded by too many people'],
      },
    },
    balanced: {
      coreTruth: { zh: '你的情緒不是弱點，是你看世界最精準的工具', en: "Your emotions aren't a weakness — they're the most accurate tool you have" },
      desc: { zh: '你比大多數人更能感受環境的變化。這讓你容易被影響，但也讓你能看到別人看不到的。', en: "You pick up on shifts others miss. That sensitivity makes you vulnerable — and gives you access to what others can't see." },
      insights: {
        zh: ['你在人群裡很能撐，但回到獨處的時候你才知道你今天消耗了多少', '你渴望一種深度的被理解——不是被同情，是真正被看懂'],
        en: ['You hold it together in crowds — but only alone do you realize how much today cost you', 'You crave deep understanding — not sympathy, but being truly seen'],
      },
    },
    challenged: {
      coreTruth: { zh: '你表現得夠強了，但你內心那個需要被安撫的部分還在等', en: "You perform strength well — but the part of you that needs reassurance is still waiting" },
      desc: { zh: '你學會了不讓別人看到你在乎。但你其實非常在乎，只是不知道怎麼說。', en: "You've learned not to show how much you care. But you care deeply — you just never learned how to say it." },
      insights: {
        zh: ['你有一個習慣：在沒人看的時候才允許自己難過', '你給了很多人情緒上的支持——但你自己的情緒，你習慣一個人扛'],
        en: ['You have a habit: only letting yourself feel sad when no one\'s watching', 'You\'ve supported many people emotionally — but your own feelings, you carry alone'],
      },
    },
  },
  {
    id: 'mars',
    zh: '火星', en: 'Mars',
    symbol: '♂',
    strong: {
      coreTruth: { zh: '你不是好鬥，你只是不能接受浪費', en: "You're not aggressive — you just can't stand waste: wasted time, wasted potential, wasted truth" },
      desc: { zh: '你的行動力極強，但你的衝動也讓你錯過需要等待的時機。你最大的挑戰是學會「策略性地等」。', en: "Your drive is extraordinary — but your impulse costs you the moments that required waiting. Your biggest challenge: learning to wait strategically." },
      insights: {
        zh: ['你的能量可以帶動一個房間——但你也可以在一瞬間讓氣氛變得緊張', '你最大的弱點是：你知道對方說錯了，你忍不住直接說出來'],
        en: ['Your energy can lift a room — and in a moment, make it tense', 'Your biggest weakness: when you know someone\'s wrong, you can\'t stop yourself from saying it directly'],
      },
    },
    balanced: {
      coreTruth: { zh: '你保護別人的本能比保護自己強得多', en: "Your instinct to protect others is far stronger than your instinct to protect yourself" },
      desc: { zh: '你很會替別人衝，但自己遇到困難時卻不知道怎麼求助。', en: "You fight hard for others — but when you're struggling, asking for help doesn't come naturally." },
      insights: {
        zh: ['你的存在讓身邊的人覺得安全——但你在誰的旁邊才覺得安全？', '你說「沒事」的時候，通常是有事的時候'],
        en: ['Your presence makes others feel safe — but whose presence makes you feel safe?', 'When you say "I\'m fine", that\'s usually when things aren\'t fine'],
      },
    },
    challenged: {
      coreTruth: { zh: '你的憤怒底下有一個很深的受傷', en: "Underneath your anger is a wound that runs much deeper than the surface" },
      desc: { zh: '你不是容易生氣，你是長期沒有人真正回應你。這個憤怒有來源。', en: "You're not quick to anger — you've just gone too long without being truly heard. This anger has an origin." },
      insights: {
        zh: ['你小時候可能學會了：要得到關注，就要表現出強度', '你的憤怒不是針對對方，是針對那個你一直在等、卻從沒出現過的回應'],
        en: ['You may have learned young: intensity is how you get attention', 'Your anger isn\'t really at the person in front of you — it\'s at the response you\'ve been waiting for that never came'],
      },
    },
  },
  {
    id: 'mercury',
    zh: '水星', en: 'Mercury',
    symbol: '☿',
    strong: {
      coreTruth: { zh: '你的腦子一直在轉，但你不確定這樣是好事還是壞事', en: "Your mind never stops — and you're not sure if that's a gift or a curse" },
      desc: { zh: '你的思維速度比別人快，這讓你看到機會，但也讓你陷入過度分析。', en: "Your thinking runs faster than most — that's why you spot opportunities, and why you also spiral into overthinking." },
      insights: {
        zh: ['你在腦子裡模擬了太多種對話，結果你說出口的版本反而是最簡化的', '你最享受的狀態是：和另一個能跟你快速思考的人交談'],
        en: ['You\'ve rehearsed too many versions of the conversation — so what you actually say is the most simplified version', 'Your favorite state: talking with someone whose mind moves as fast as yours'],
      },
    },
    balanced: {
      coreTruth: { zh: '你擅長理解別人，但沒有人用同樣的方式理解你', en: "You're good at understanding people — but no one has understood you quite the same way back" },
      desc: { zh: '你是很好的溝通者，但你真正想說的話，往往說不出口。', en: "You communicate well — but the things you most need to say are the ones you never quite manage to." },
      insights: {
        zh: ['你習慣把事情說得很清楚——除了自己心裡真正在想的事', '你最孤獨的時候，不是一個人，而是在一群人裡沒有人真的在聽'],
        en: ['You\'re good at explaining everything — except what\'s actually on your mind', 'Your loneliest moments aren\'t when you\'re alone — they\'re when you\'re surrounded by people who aren\'t really listening'],
      },
    },
    challenged: {
      coreTruth: { zh: '你的懷疑不是悲觀，是你見過太多承諾沒有兌現', en: "Your skepticism isn't pessimism — you've just seen too many promises break" },
      desc: { zh: '你的謹慎源自於曾經信任過不該信任的事。這讓你保護自己，但也讓你錯過真心。', en: "Your caution comes from trusting things that didn't deserve it. It protects you — and costs you genuine connection." },
      insights: {
        zh: ['你需要很長時間才能信任一個人——但一旦信任，你是最忠實的那個', '你的大腦一直在幫你找反例，因為它想保護你不再受傷'],
        en: ['You take a long time to trust — but once you do, you\'re the most loyal person in the room', 'Your mind keeps looking for counterexamples — because it\'s trying to protect you from being hurt again'],
      },
    },
  },
  {
    id: 'sun',
    zh: '太陽', en: 'Sun',
    symbol: '☉',
    strong: {
      coreTruth: { zh: '你天生就該站在聚光燈下，但你一直假裝不在意', en: "You were born to be seen — and you've spent years pretending you don't care about that" },
      desc: { zh: '你有強烈的存在感，但你對被看見這件事又愛又怕。你的野心和你的恐懼一樣大。', en: "Your presence is undeniable — but being seen both thrills and terrifies you. Your ambition and your fear are the same size." },
      insights: {
        zh: ['你走進一個房間，人們會注意到——就算你沒有開口', '你最害怕的事：成功之後，人們才發現你其實沒有自己說的那麼好'],
        en: ['People notice when you enter a room — even before you speak', 'Your deepest fear: succeeding, and then being found out as less than what you claimed'],
      },
    },
    balanced: {
      coreTruth: { zh: '你不是需要被認可，你是需要知道自己做的事是有意義的', en: "You don't need approval — you need to know what you're doing actually matters" },
      desc: { zh: '你很能扛責任，但如果長期感覺「這有什麼用」，你會悄悄崩潰。', en: "You carry responsibility well — but if you go too long without a sense of meaning, you quietly start to crumble." },
      insights: {
        zh: ['你在一件事上全力投入的樣子，會讓旁邊的人覺得不好意思不努力', '你不是需要更多資源，你需要的是一個讓你覺得「這值得」的理由'],
        en: ['When you commit to something fully, it makes everyone around you feel compelled to try harder', 'You don\'t need more resources — you need a reason that makes it feel worth it'],
      },
    },
    challenged: {
      coreTruth: { zh: '你習慣讓別人先，但你心裡其實很清楚你想要什麼', en: "You've learned to defer — but you know exactly what you want, and that clarity scares you" },
      desc: { zh: '你把自己的需求排在最後，久了你已經不確定那些需求是否值得被滿足。', en: "You've put your needs last for so long, you've started questioning whether they deserve to be met." },
      insights: {
        zh: ['你很少說「我想要」，你習慣說「如果大家都同意的話」', '你其實知道你想走哪條路——你只是還在等一個人告訴你可以'],
        en: ['You rarely say "I want" — you say "if everyone agrees"', 'You already know which path you want — you\'re just waiting for someone to tell you it\'s okay'],
      },
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

// Compute timing window for 人生節奏 module (based on birth date + today)
function computeTimingWindow(birthDate: string) {
  const now = new Date();
  const birthMonth = new Date(birthDate).getMonth() + 1; // 1–12
  // Different birth-month quartiles map to different wait periods
  const offsetMonths = birthMonth <= 3 ? 2 : birthMonth <= 6 ? 3 : birthMonth <= 9 ? 4 : 2;
  const breakthroughDate = new Date(now.getFullYear(), now.getMonth() + offsetMonths, 1);
  const zhMonths = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  const enMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return {
    zhLabel: `${breakthroughDate.getFullYear()}年${zhMonths[breakthroughDate.getMonth()]}`,
    enLabel: `${enMonths[breakthroughDate.getMonth()]} ${breakthroughDate.getFullYear()}`,
    offsetMonths,
  };
}

// Free module content pool
function generateModuleContent(planetId: string, dignity: DignityKey, moduleId: string, lang: 'zh' | 'en', birthDate?: string) {
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
    '03': { // 人生節奏 / Life Timing — content injected dynamically below
      preview: {
        strong: { zh: '', en: '' },
        balanced: { zh: '', en: '' },
        challenged: { zh: '', en: '' },
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

  // Module 03: 7 planets × 3 dignities = 21 unique life timing readings
  if (moduleId === '03') {
    const { zhLabel: t, enLabel: te } = computeTimingWindow(birthDate ?? '1990-01-01');
    type TimingMap = Record<string, Record<DignityKey, { zh: string; en: string }>>;
    const content03: TimingMap = {
      jupiter: {
        strong: {
          zh: `木星命強的人，擴張週期比別人明顯。從${t}開始，你會進入一段格局打開的節奏——過去幾年播的種，開始長出你看得到的東西。現在做的每一件事都在算數。`,
          en: `With a strong Jupiter, your expansion cycles are vivid. From ${te}, you enter a phase where what you've planted starts visibly growing. Everything you're doing right now is counting.`,
        },
        balanced: {
          zh: `木星命平的人，運氣不是突然來的，是積累後爆發的。從現在到${t}你在蓄積期——別人看起來沒動靜，但你的命盤在算時間。${t}後，機會會自己找上門。`,
          en: `With Jupiter balanced, luck doesn't arrive suddenly — it accumulates then breaks. Until ${te} you're in the buildup phase. After ${te}, opportunities start arriving on their own.`,
        },
        challenged: {
          zh: `木星命弱的人，不是沒機會，是時機還沒對。你過去可能在錯的時間點全力衝、撞了很多牆。${t}是一個節點——這之後你對方向的判斷會明顯比現在準。`,
          en: `With Jupiter challenged, it's not that opportunities don't exist — the timing hasn't aligned yet. You may have pushed hard at the wrong moments. ${te} is the pivot where your direction sense sharpens significantly.`,
        },
      },
      venus: {
        strong: {
          zh: `金星命強，你的緣分和吸引力有明顯的週期高峰。從${t}開始，身邊的關係會有質量上的提升——不是數量增加，而是深度增加，你會遇到讓你覺得「值得的」那種連結。`,
          en: `With Venus strong, your magnetism and connections peak in clear cycles. From ${te}, the quality of your relationships rises — not more, but deeper. You'll find connections that feel worth it.`,
        },
        balanced: {
          zh: `金星命平，你的緣分有淡季有旺季。從現在到${t}是緣分的過渡期，適合整理關係、放下消耗你的人。${t}後你會遇到讓你覺得「對了」的人或機會。`,
          en: `With Venus balanced, your connection cycles have off-seasons and peak seasons. Until ${te} is a transition — good time to clear out draining relationships. After ${te}, you'll meet people and opportunities that feel right.`,
        },
        challenged: {
          zh: `金星命弱的人，感情和人際走得比別人坎坷一些。但${t}是一個轉換點——之後你對「什麼樣的關係是對的」的判斷會清晰很多，你會更清楚自己真正想要什麼。`,
          en: `With Venus challenged, love and connection have been harder than average. But ${te} is a clarity point — after that, your sense of what's right for you sharpens considerably.`,
        },
      },
      saturn: {
        strong: {
          zh: `土星命強的人，黃金期比別人晚，但比別人紮實。從${t}開始，你之前一磚一瓦建起來的東西，開始被別人看見了。別人的成功是衝刺，你的成功是建築。`,
          en: `With Saturn strong, your peak arrives later but lands harder. From ${te}, what you've built brick by brick starts being seen by others. Their success is a sprint — yours is architecture.`,
        },
        balanced: {
          zh: `土星命平，你需要比別人多一點耐心，但成果比別人更持久。從現在到${t}，適合夯實基礎，不適合冒進。${t}後，你的穩定開始變成真正的優勢。`,
          en: `With Saturn balanced, you need more patience than most, but your results outlast theirs. Until ${te}, focus on foundations, not breakthroughs. After ${te}, your steadiness becomes a real competitive edge.`,
        },
        challenged: {
          zh: `土星命弱的人，你一直在努力，但感覺像在推一顆停不下來的石頭。好消息是：${t}之後那個阻力會明顯變小——不是消失，是你終於找到了施力的角度。`,
          en: `With Saturn challenged, effort has felt like pushing a boulder uphill. The good news: after ${te} that resistance noticeably eases — not gone, but you finally find the right angle to push from.`,
        },
      },
      moon: {
        strong: {
          zh: `月亮命強，你的節奏跟著直覺和情緒的潮汐走。從${t}開始，你的直覺會特別靈——這段時間做的決定，多信任自己的感覺，少找人商量。你比自己以為的更準。`,
          en: `With the Moon strong, your rhythm follows intuition and emotional tides. From ${te}, your gut becomes especially reliable — trust your instincts more, seek less outside input. You're more accurate than you think.`,
        },
        balanced: {
          zh: `月亮命平，你的能量有潮汐，起起落落是正常的。從現在到${t}是低潮期，保存能量比展開行動重要。${t}後你的狀態會明顯好轉，那時候推進需要情感投入的事，事半功倍。`,
          en: `With Moon balanced, your energy ebbs and flows — that's normal. Until ${te} you're in an ebb phase; conserving matters more than expanding. After ${te}, your state improves noticeably. That's when to push emotionally-driven work.`,
        },
        challenged: {
          zh: `月亮命弱的人，情緒週期比別人激烈，高的時候很高，低的時候很低。${t}是一個平衡點——之後你對自己情緒的理解會深很多，你會更知道怎麼讓自己穩下來。`,
          en: `With Moon challenged, your emotional cycles are more intense than most — high highs, low lows. ${te} is a stabilization point — after that, your self-understanding deepens and you get better at knowing how to steady yourself.`,
        },
      },
      mars: {
        strong: {
          zh: `火星命強，你的行動力有爆發週期。從${t}開始，你會進入一段「做什麼都有動力」的狀態——這段時間適合啟動你一直想做卻一直在等的事，窗口是真實的。`,
          en: `With Mars strong, your drive comes in surge cycles. From ${te}, you enter a phase where motivation flows naturally — this is the real window to start what you've been waiting to launch.`,
        },
        balanced: {
          zh: `火星命平，你的動力是間歇性的，不是長期穩定的。從現在到${t}你可能感覺力氣使不上。${t}後你的執行力會回來——那時候行動，比現在硬撐有效三倍。`,
          en: `With Mars balanced, your drive comes in bursts, not a steady stream. Until ${te} you may feel like you're pushing through mud. After ${te}, execution capacity returns — acting then is three times more effective than forcing it now.`,
        },
        challenged: {
          zh: `火星命弱的人，你不是沒有衝勁，是你的衝勁常常找不到對的出口，白白耗掉了。${t}是一個方向變清晰的時間點——你會開始知道哪些事值得衝，哪些事放掉反而更輕鬆。`,
          en: `With Mars challenged, it's not that you lack drive — it's that it often has nowhere useful to go. ${te} is when direction clarifies. You'll start knowing which things are worth the push, and which to let go.`,
        },
      },
      mercury: {
        strong: {
          zh: `水星命強，你的思維清晰度有週期高峰。從${t}開始，你的判斷力和表達都會特別到位——適合談判、做重要決定、說出你一直想說但說不出口的話。`,
          en: `With Mercury strong, your mental clarity has peak cycles. From ${te}, your judgment and communication hit a high — ideal for negotiations, key decisions, and finally saying what you've needed to say.`,
        },
        balanced: {
          zh: `水星命平，你的思維有時清晰有時混沌。從現在到${t}，你可能感覺想不清楚、說不到位。${t}後你的思路會突然打開——很多現在看不懂的事，那時候會自動想通。`,
          en: `With Mercury balanced, your mind alternates between sharp and foggy. Until ${te}, clarity may feel elusive. After ${te}, your thinking opens up — many things that seem opaque right now will resolve on their own.`,
        },
        challenged: {
          zh: `水星命弱的人，你常常有很好的想法，但傳達出去就走樣，或者時機不對。${t}是一個表達力提升的節點——之後你說的話更容易被聽到、被理解，你的想法開始有它應有的重量。`,
          en: `With Mercury challenged, you often have good ideas that get lost in translation or land at the wrong time. ${te} is when that shifts — what you say starts being heard and understood the way you intended.`,
        },
      },
      sun: {
        strong: {
          zh: `太陽命強，你的能見度和存在感有週期高峰。從${t}開始，你的光會特別亮——適合讓自己被看見，不管是升職、發表、還是開始新的事情，這個窗口是真的。`,
          en: `With the Sun strong, your visibility peaks in cycles. From ${te}, your presence becomes especially magnetic — ideal for stepping forward, whether in career, creative work, or new beginnings. This window is real.`,
        },
        balanced: {
          zh: `太陽命平，你的光不是一直亮著的，需要對的舞台。從現在到${t}是蓄光期，適合打磨自己，不急著曝光。${t}後，你會找到一個讓你真正發光的位置——不是所有人的舞台，是你的舞台。`,
          en: `With Sun balanced, your light needs the right stage. Until ${te} is a polishing phase — refine, don't rush to be seen. After ${te}, you'll find the platform where you genuinely shine — not everyone's stage, yours.`,
        },
        challenged: {
          zh: `太陽命弱的人，你常常感覺付出沒有被看見，努力和回報不成比例。${t}是一個轉折——之後你會開始被對的人看見。不是所有人，但是真正重要的那些人。`,
          en: `With Sun challenged, your efforts often feel invisible — input and recognition rarely match. ${te} is the turning point. After that, the right people start noticing. Not everyone — but the ones who matter.`,
        },
      },
    };
    const planetContent = content03[planetId] ?? content03['jupiter'];
    return planetContent[dignity][lang];
  }

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
    zh: '今年有三個月份需要特別注意——一個是機會窗口，一個是高風險期，一個是你該收割的時間點。流年全解讀裡有完整的月份標注。',
    en: "This year has three months worth marking — one opening, one danger zone, one harvest window. The Full Year Reading names all three.",
  },
  '12': {
    zh: '本月你的命盤有一件事特別適合推進，另一件事如果現在動手會耗費兩倍力氣。流月更新每月告訴你哪個是哪個。',
    en: "This month your chart has one thing worth pushing — and one that will cost you double the effort if you start now. Monthly updates tell you which is which.",
  },
  '13': {
    zh: '這一季你的命盤有一個最值得做的方向調整——不是努力更多，是換一個施力點。季度開運策略每季給你這一個具體建議。',
    en: "This season your chart points to one specific pivot — not working harder, but shifting where you apply effort. Quarterly strategy gives you that one move each season.",
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
        zh: generateModuleContent(planet.id, dignity, id, 'zh', birthDate),
        en: generateModuleContent(planet.id, dignity, id, 'en', birthDate),
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
      insights: planet[dignity].insights,
    },
    name: name || null,
    birthDate,
    birthTime: birthTime || null,
    cityName: city?.name || null,
    gender,
    modules,
  });
}
