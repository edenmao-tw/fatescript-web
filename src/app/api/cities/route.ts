import { NextRequest, NextResponse } from 'next/server';

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  name: string;
  class: string;
  type: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
    country_code?: string;
  };
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q');
  if (!q || q.trim().length < 2) {
    return NextResponse.json({ cities: [] });
  }

  try {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', q.trim());
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', '10');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('featuretype', 'city');

    const res = await fetch(url.toString(), {
      headers: { 'User-Agent': 'FateScript/1.0 (contact@fatescript.pro)' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return NextResponse.json({ cities: [] });

    const data: NominatimResult[] = await res.json();

    const seen = new Set<string>();
    const cities = data
      .filter(item => {
        const isPlace = ['place', 'boundary'].includes(item.class);
        const cityName = item.address?.city || item.address?.town || item.address?.village || item.name;
        const key = `${cityName}-${item.address?.country_code}`;
        if (!isPlace || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 8)
      .map(item => {
        const cityName = item.address?.city || item.address?.town || item.address?.village || item.name;
        const country = item.address?.country || '';
        return {
          name: cityName,
          country,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          displayName: country ? `${cityName}, ${country}` : cityName,
        };
      });

    return NextResponse.json({ cities });
  } catch {
    return NextResponse.json({ cities: [] });
  }
}
