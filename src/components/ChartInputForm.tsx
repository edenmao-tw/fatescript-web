'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────
interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  displayName: string;
}

interface FormData {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  birthMinute: string;
  birthTimeUnknown: boolean;
  city: City | null;
  gender: 'male' | 'female' | 'other' | '';
}

interface ChartInputFormProps {
  locale: 'zh-TW' | 'en';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function daysInMonth(year: string, month: string) {
  if (!year || !month) return 31;
  return new Date(parseInt(year), parseInt(month), 0).getDate();
}

function pad(n: number) { return String(n).padStart(2, '0'); }

// ─── Sub-components ───────────────────────────────────────────────────────────
function SelectBox({
  value, onChange, options, placeholder, isZh,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  isZh: boolean;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`flex-1 px-3 py-3 rounded-xl text-sm appearance-none cursor-pointer transition-colors ${
        isZh
          ? 'bg-[#0d0d25] border border-[#e8d5a3]/20 text-[#e8d5a3] focus:border-[#e8d5a3]/60 focus:outline-none'
          : 'bg-white border border-gray-200 text-[#1a1a2e] focus:border-[#1a1a2e] focus:outline-none'
      } ${!value ? (isZh ? 'text-[#e8d5a3]/30' : 'text-gray-400') : ''}`}
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChartInputForm({ locale }: ChartInputFormProps) {
  const isZh = locale === 'zh-TW';
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthHour: '',
    birthMinute: '',
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

  // Dynamic day list based on selected year/month
  const maxDays = daysInMonth(form.birthYear, form.birthMonth);
  const DAYS = useMemo(
    () => Array.from({ length: maxDays }, (_, i) => i + 1),
    [maxDays]
  );

  // Reset day if it exceeds new month's max
  useEffect(() => {
    if (form.birthDay && parseInt(form.birthDay) > maxDays) {
      setForm(f => ({ ...f, birthDay: String(maxDays) }));
    }
  }, [form.birthDay, maxDays]);

  // City search with debounce
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
    const { birthYear, birthMonth, birthDay, city, gender } = form;
    if (!birthYear || !birthMonth || !birthDay || !city || !gender) return;
    setSubmitting(true);

    const birthDate = `${birthYear}-${pad(parseInt(birthMonth))}-${pad(parseInt(birthDay))}`;
    const birthTime = form.birthTimeUnknown
      ? ''
      : form.birthHour !== '' && form.birthMinute !== ''
        ? `${pad(parseInt(form.birthHour))}:${pad(parseInt(form.birthMinute))}`
        : '';

    const payload = { ...form, birthDate, birthTime, city };
    sessionStorage.setItem('chartInput', JSON.stringify(payload));
    router.push('/chart/result');
  };

  const labelCls = `block text-sm mb-1.5 ${isZh ? 'text-[#e8d5a3]/70' : 'text-gray-600'}`;
  const inputCls = `w-full px-4 py-3 rounded-xl text-sm transition-colors ${
    isZh
      ? 'bg-[#0d0d25] border border-[#e8d5a3]/20 text-[#e8d5a3] placeholder-[#e8d5a3]/30 focus:border-[#e8d5a3]/60 focus:outline-none'
      : 'bg-white border border-gray-200 text-[#1a1a2e] placeholder-gray-400 focus:border-[#1a1a2e] focus:outline-none'
  }`;

  const dividerCls = `text-sm ${isZh ? 'text-[#e8d5a3]/30' : 'text-gray-300'}`;

  const isDateComplete = form.birthYear && form.birthMonth && form.birthDay;
  const isTimeComplete = form.birthTimeUnknown || (form.birthHour !== '' && form.birthMinute !== '');
  const canSubmit = isDateComplete && isTimeComplete && form.city && form.gender;

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

      {/* Birth date — 3 dropdowns */}
      <div>
        <label className={labelCls}>
          {isZh ? '出生日期' : 'Date of birth'}{' '}
          <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-2 items-center">
          {/* Year */}
          <SelectBox
            value={form.birthYear}
            onChange={v => setForm(f => ({ ...f, birthYear: v }))}
            options={YEARS.map(y => ({ value: String(y), label: String(y) }))}
            placeholder={isZh ? '年' : 'Year'}
            isZh={isZh}
          />
          <span className={dividerCls}>/</span>
          {/* Month */}
          <SelectBox
            value={form.birthMonth}
            onChange={v => setForm(f => ({ ...f, birthMonth: v }))}
            options={MONTHS.map(m => ({
              value: String(m),
              label: isZh ? `${m}月` : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1],
            }))}
            placeholder={isZh ? '月' : 'Month'}
            isZh={isZh}
          />
          <span className={dividerCls}>/</span>
          {/* Day */}
          <SelectBox
            value={form.birthDay}
            onChange={v => setForm(f => ({ ...f, birthDay: v }))}
            options={DAYS.map(d => ({ value: String(d), label: isZh ? `${d}日` : String(d) }))}
            placeholder={isZh ? '日' : 'Day'}
            isZh={isZh}
          />
        </div>
      </div>

      {/* Birth time — 2 dropdowns */}
      <div>
        <label className={labelCls}>
          {isZh ? '出生時間' : 'Time of birth'}
        </label>
        <div className={`flex gap-2 items-center ${form.birthTimeUnknown ? 'opacity-30 pointer-events-none' : ''}`}>
          {/* Hour */}
          <SelectBox
            value={form.birthHour}
            onChange={v => setForm(f => ({ ...f, birthHour: v }))}
            options={HOURS.map(h => ({ value: String(h), label: isZh ? `${pad(h)} 時` : `${pad(h)}:00` }))}
            placeholder={isZh ? '時' : 'Hour'}
            isZh={isZh}
          />
          <span className={dividerCls}>:</span>
          {/* Minute */}
          <SelectBox
            value={form.birthMinute}
            onChange={v => setForm(f => ({ ...f, birthMinute: v }))}
            options={MINUTES.map(m => ({ value: String(m), label: `${pad(m)} ${isZh ? '分' : 'min'}` }))}
            placeholder={isZh ? '分' : 'Min'}
            isZh={isZh}
          />
        </div>
        <label className={`flex items-center gap-2 mt-2.5 text-sm cursor-pointer select-none ${
          isZh ? 'text-[#e8d5a3]/60' : 'text-gray-500'
        }`}>
          <input
            type="checkbox"
            checked={form.birthTimeUnknown}
            onChange={e => setForm(f => ({
              ...f,
              birthTimeUnknown: e.target.checked,
              birthHour: '',
              birthMinute: '',
            }))}
            className="w-4 h-4 rounded"
          />
          {isZh ? '不知道出生時間' : "I don't know my birth time"}
        </label>
      </div>

      {/* Birth place — city search */}
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
                <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${
                  isZh ? 'text-[#e8d5a3]/40' : 'text-gray-400'
                }`}>
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
          {[
            { val: 'male',   zh: '男', en: 'Male' },
            { val: 'female', zh: '女', en: 'Female' },
            { val: 'other',  zh: '其他', en: 'Other' },
          ].map(g => {
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
        disabled={!canSubmit || submitting}
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
