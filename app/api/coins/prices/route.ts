import { NextRequest, NextResponse } from 'next/server';
import { fetcher } from '@/lib/coingecko.actions';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json({}, { status: 400 });
    }

    const data = await fetcher<Record<string, { usd: number; usd_24h_change: number }>>(
      '/simple/price',
      {
        ids: ids,
        vs_currencies: 'usd',
        include_24hr_change: true,
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching coin prices:', error);
    return NextResponse.json({}, { status: 500 });
  }
}

