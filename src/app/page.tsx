import { redirect } from 'next/navigation';

export default async function RootPage() {
  // Next-intl middleware handles locale routing
  // This fallback redirects root to home
  redirect('/');
}
