import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO: ensure static generation where possible
  output: 'standalone',
};

export default withNextIntl(nextConfig);
