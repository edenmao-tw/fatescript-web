import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['zh-TW', 'en'] as const;
export type Locale = (typeof locales)[number];

function getLocaleFromHost(host: string): Locale {
  if (host.startsWith('tw.')) return 'zh-TW';
  return 'en';
}

export default getRequestConfig(async () => {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const locale = getLocaleFromHost(host);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
