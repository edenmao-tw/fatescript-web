'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  displayName: string;
}

interface FormData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthTimeUnknown: boolean;
  city: City | null;
  gender: 'male' | 'female' | 'other' | '';
}

interface ChartInputFormProps {
  locale: 'zh-TW' | 'en';
}

export default function ChartInputForm({ locale }: ChartInputFormProps) {
  const isZh = locale === 'zh-TW';
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthTimeUnknown: false,
    city: null,
    gender: '',
  });

  const [cityQuery, setCityQuery] = useState('');
  const [cityResults, setCityResults] = useState<City[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!cityQuery.trim() || cityQuery.length < 2) {
      setCityResults([]);
      setShowDropdown(false);
      return;
    }
    setCityLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(cityQuery)}`);
        const data = await res.json();
        setCityResults(data.cities || []);
        setShowDropdown(true);
      } catch {
        setCityResults([]);
      } finally {
        setCityLoading(false);
      }
    }, 350);
  }, [cityQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.birthDate || !form.city || !form.gender) return;
    setSubmitting(true);
    sessionStorage.setItem('chartInput', JSON.stringify(form));
    router.push('/chart/result');
  };

  // Shared style tokens per locale
  const zhInput = 'bg-[#0d0d25] border border-[#e8d5a3]/20 text-[#e8d5a3] placeholder-[#e8d5a3]/30 focus:border-[#e8d5a3]/60 focus:outline-none';
  const enInput = 'bg-white border border-gray-200 text-[#1a1a2e] placeholder-gray-400 focus:border-[#1a1a2e] focus:outline-none';
  const inputCls = `w-full px-4 py-3 rounded-xl text-sm transition-colors ${isZh ? zhInput : enInput}`;

  const labelCls = `block text-sm mb-1.5 ${isZh ? 'text-[#e8d5a3]/70' : 'text-gray-600'}`;

  const genderGenders = [
    { val: 'male', zh: '男', en: 'Male' },
    { val: 'female', zh: '女', en: 'Female' },
    { val: 'other', zh: '其他', en: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name (optional) */}
      <div>
        <label className={labelCls}>
          {isZh ? '你的名字' : 'Your name'}{' '}
          <span className="opacity-40">({isZh ? '選填' : 'optional'})</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder={isZh ? '輸入你的名字' : 'Enter your name'}
          className={inputCls}
        />
      </div>

      {/* Birth date */}
      <div>
        <label className={labelCls}>
          {isZh ? '出生日期' : 'Date of birth'}{' '}
          <span className="text-red-400">*</span>
        </label>
        <input
          type="date"
          required
          value={form.birthDate}
          onChange={e => setForm(f => ({ ...f, birthDate: e.target.value }))}
          className={inputCls}
        />
      </div>

      {/* Birth time */}
      <div>
        <label className={labelCls}>
          {isZh ? '出生時間' : 'Time of birth'}
        </label>
        <input
          type="time"
          value={form.birthTimeUnknown ? '' : form.birthTime}
          disabled={form.birthTimeUnknown}
          onChange={e => setForm(f => ({ ...f, birthTime: e.target.value }))}
          className={`${inputCls} ${form.birthTimeUnknown ? 'opacity-30 cursor-not-allowed' : ''}`}
        />
        <label className={`flex items-center gap-2 mt-2 text-sm cursor-pointer select-none ${isZh ? 'text-[#e8d5a3]/60' : 'text-gray-500'}`}>
          <input
            type="checkbox"
            checked={form.birthTimeUnknown}
            onChange={e => setForm(f => ({ ...f, birthTimeUnknown: e.target.checked, birthTime: '' }))}
            className="rounded w-4 h-4"
          />
          {isZh ? '不知道出生時間' : "I don't know my birth time"}
        </label>
      </div>

      {/* Birth place */}
      <div className="relative">
        <label className={labelCls}>
          {isZh ? '出生地點' : 'Place of birth'}{' '}
          <span className="text-red-400">*</span>
        </label>

        {form.city ? (
          <div className={`w-full px-4 py-3 rounded-xl text-sm flex items-center justify-between ${
            isZh
              ? 'bg-[#e8d5a3]/10 border border-[#e8d5a3]/40 text-[#e8d5a3]'
              : 'bg-gray-50 border border-gray-300 text-[#1a1a2e]'
          }`}>
            <span>{form.city.displayName}</span>
            <button
              type="button"
              onClick={() => { setForm(f => ({ ...f, city: null })); setCityQuery(''); }}
              className="opacity-40 hover:opacity-80 transition-opacity ml-2 text-xl leading-none"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <div className="relative">
              <input
                type="text"
                value={cityQuery}
                onChange={e => setCityQuery(e.target.value)}
                onFocus={() => cityResults.length > 0 && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder={isZh ? '搜尋城市...' : 'Search city...'}
                className={inputCls}
                autoComplete="off"
              />
              {cityLoading && (
                <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${isZh ? 'text-[#e8d5a3]/40' : 'text-gray-400'}`}>
                  {isZh ? '搜尋中' : 'Searching'}…
                </span>
              )}
            </div>

            {showDropdown && cityResults.length > 0 && (
              <ul className={`absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-xl max-h-56 overflow-y-auto ${
                isZh
                  ? 'bg-[#111128] border border-[#e8d5a3]/20'
                  : 'bg-white border border-gray-200'
              }`}>
                {cityResults.map((city, i) => (
                  <li
                    key={i}
                    onMouseDown={() => {
                      setForm(f => ({ ...f, city }));
                      setShowDropdown(false);
                      setCityQuery('');
                    }}
                    className={`px-4 py-2.5 text-sm cursor-pointer ${
                      isZh
                        ? 'hover:bg-[#e8d5a3]/10 text-[#e8d5a3]'
                        : 'hover:bg-gray-50 text-[#1a1a2e]'
                    }`}
                  >
                    <span className="font-medium">{city.name}</span>
                    {city.country && (
                      <span className="opacity-40 ml-1.5 text-xs">{city.country}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className={labelCls}>
          {isZh ? '性別' : 'Gender'}{' '}
          <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-3">
          {genderGenders.map(g => {
            const selected = form.gender === g.val;
            return (
              <button
                key={g.val}
                type="button"
                onClick={() => setForm(f => ({ ...f, gender: g.val as 'male' | 'female' | 'other' }))}
                className={`flex-1 py-2.5 rounded-xl text-sm transition-all border ${
                  selected
                    ? isZh
                      ? 'bg-[#e8d5a3]/15 border-[#e8d5a3]/60 text-[#e8d5a3]'
                      : 'bg-[#1a1a2e] border-[#1a1a2e] text-white'
                    : isZh
                      ? 'bg-transparent border-[#e8d5a3]/20 text-[#e8d5a3]/50 hover:border-[#e8d5a3]/40'
                      : 'bg-white border-gray-200 text-gray-400 hover:border-gray-400'
                }`}
              >
                {isZh ? g.zh : g.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!form.birthDate || !form.city || !form.gender || submitting}
        className={`w-full py-4 rounded-full text-base font-semibold transition-all mt-2 ${
          isZh
            ? 'bg-[#e8d5a3] text-[#0a0a1a] hover:bg-[#f0e4b8]'
            : 'bg-[#1a1a2e] text-white hover:bg-[#2d2d4e]'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        {submitting
          ? (isZh ? '計算中...' : 'Calculating...')
          : (isZh ? '解析我的命盤 →' : 'Reveal My Chart →')}
      </button>
    </form>
  );
}
