import { NextRequest, NextResponse } from 'next/server';

// Placeholder - will connect to Python/Railway calculator
export async function POST(req: NextRequest) {
  const body = await req.json();

  // TODO: Call Railway Python calculator endpoint
  // const calcUrl = process.env.CALCULATOR_URL + '/calculate';
  // const result = await fetch(calcUrl, { method: 'POST', body: JSON.stringify(body) });

  return NextResponse.json({
    success: true,
    message: 'Calculator endpoint pending Railway deployment',
    received: body,
  });
}
