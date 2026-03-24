'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ADMIN_KEY = 's9033127';
const LS_KEY = 'fsAdmin';

export default function AdminPage() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem(LS_KEY) === 'true');
  }, []);

  function handleUnlock() {
    if (input === ADMIN_KEY) {
      localStorage.setItem(LS_KEY, 'true');
      setIsAdmin(true);
      setStatus('ok');
    } else {
      setStatus('error');
    }
  }

  function handleRevoke() {
    localStorage.removeItem(LS_KEY);
    setIsAdmin(false);
    setStatus('idle');
    setInput('');
  }

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-[#e8d5a3] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs tracking-widest text-[#e8d5a3]/30 mb-2">FATESCRIPT</p>
          <h1 className="text-xl font-bold">作者專區</h1>
          <p className="text-sm text-[#e8d5a3]/40 mt-1">Author Preview Mode</p>
        </div>

        {isAdmin ? (
          /* ── Already unlocked ── */
          <div className="border border-emerald-500/30 rounded-2xl p-6 bg-emerald-900/10 text-center">
            <div className="text-2xl mb-3">✓</div>
            <p className="font-semibold text-emerald-400 mb-1">作者模式已啟用</p>
            <p className="text-xs text-[#e8d5a3]/40 mb-6">所有付費模組在此瀏覽器上均顯示完整內容</p>

            <div className="flex flex-col gap-3">
              <Link
                href="/chart"
                className="w-full py-3 rounded-full bg-[#e8d5a3] text-[#0a0a1a] font-semibold text-sm text-center"
              >
                進入命盤輸入 →
              </Link>
              <Link
                href="/chart/result"
                className="w-full py-3 rounded-full border border-[#e8d5a3]/30 text-[#e8d5a3]/70 text-sm text-center"
              >
                直接查看上次結果
              </Link>
              <button
                onClick={handleRevoke}
                className="w-full py-2.5 rounded-full border border-red-500/20 text-red-400/60 text-xs mt-2 hover:border-red-500/40 hover:text-red-400 transition-all"
              >
                關閉作者模式
              </button>
            </div>
          </div>
        ) : (
          /* ── Login ── */
          <div className="border border-[#e8d5a3]/15 rounded-2xl p-6">
            <label className="block text-xs text-[#e8d5a3]/40 mb-2 tracking-widest">ADMIN KEY</label>
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setStatus('idle'); }}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="輸入密碼"
              className="w-full bg-[#1a1a2e] border border-[#e8d5a3]/15 rounded-xl px-4 py-3 text-sm text-[#e8d5a3] placeholder-[#e8d5a3]/20 focus:outline-none focus:border-[#e8d5a3]/40 mb-4"
            />
            {status === 'error' && (
              <p className="text-xs text-red-400/70 mb-3">密碼錯誤，請再試一次</p>
            )}
            <button
              onClick={handleUnlock}
              className="w-full py-3 rounded-full bg-[#e8d5a3] text-[#0a0a1a] font-semibold text-sm hover:bg-[#f0e4b8] transition-all"
            >
              解鎖作者模式
            </button>
          </div>
        )}

        <p className="text-center text-xs text-[#e8d5a3]/20 mt-6">
          此頁面僅供內部測試使用
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-[#e8d5a3]/30 hover:text-[#e8d5a3]/50">
            ← 回首頁
          </Link>
        </div>
      </div>
    </main>
  );
}
