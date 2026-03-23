// Claude API integration for paid module interpretations
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;

export interface InterpretRequest {
  moduleId: string;
  chartSummary: string;
  locale: 'zh-TW' | 'en';
  isPaid: boolean;
}

export async function generateInterpretation(req: InterpretRequest): Promise<string> {
  const systemPrompt = req.locale === 'zh-TW' ? ZH_SYSTEM_PROMPT : EN_SYSTEM_PROMPT;
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: req.isPaid ? 1200 : 300,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: buildPrompt(req),
      }],
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}

const ZH_SYSTEM_PROMPT = `你是一位七政四餘命理師，用白話文幫人解讀命盤。
規則：
1. 語氣：直接、有點狠、但不嚇人
2. 一定要有具體年份或時間節點
3. 輸出格式固定：
   【命運斷語】一句話（15字以內，要讓人想截圖）
   【核心解讀】2-3段，每段2-3句
   【時間節點】具體年份
   【行動建議】3個具體行動（條列）
4. 不說「可能」「也許」「或許」，要說「你的命格顯示」「你這種人」
5. 絕對不超過輸出格式範圍`;

const EN_SYSTEM_PROMPT = `You are a Qi Zheng Si Yu (Seven Luminaries) astrology interpreter. Write in plain English.
Rules:
1. Tone: warm, insightful, empowering — never fatalistic
2. Always include specific timeframes or years
3. Fixed output format:
   [Core Truth] One powerful sentence (make it quotable)
   [Your Pattern] 2-3 paragraphs, 2-3 sentences each
   [Key Timing] Specific years or periods
   [Your Actions] 3 specific action items (bullet points)
4. Use "you tend to", "your energy suggests" — not "you will" or "you must"
5. Never exceed the output format`;

function buildPrompt(req: InterpretRequest): string {
  return `命盤資料：${req.chartSummary}\n\n請解讀模組 ${req.moduleId}`;
}
