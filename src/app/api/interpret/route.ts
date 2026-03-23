import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { moduleId, chartData, locale, isPaid } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const isZh = locale === 'zh-TW';
  const systemPrompt = isZh ? ZH_SYSTEM : EN_SYSTEM;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: isPaid ? 1200 : 300,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: `命盤資料：${JSON.stringify(chartData)}\n請解讀模組 ${moduleId}`,
        }],
      }),
    });

    const data = await response.json();
    return NextResponse.json({ content: data.content[0].text });
  } catch {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}

const ZH_SYSTEM = `你是七政四餘命理師，用白話文解讀命盤。
規則：
1. 語氣直接有點狠但不嚇人
2. 一定有具體年份
3. 輸出格式：
【命運斷語】15字以內，讓人想截圖
【核心解讀】2-3段，每段2-3句
【時間節點】具體年份
【行動建議】3個條列行動
4. 不說可能也許，要說「你的命格顯示」`;

const EN_SYSTEM = `You are a Qi Zheng Si Yu astrology interpreter. Warm, insightful, never fatalistic.
Output format:
[Core Truth] One powerful quotable sentence
[Your Pattern] 2-3 paragraphs, 2-3 sentences each
[Key Timing] Specific years
[Your Actions] 3 bullet point actions
Use "you tend to", never "you will" or "you must".`;
