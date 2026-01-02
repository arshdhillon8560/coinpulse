/// <reference path="../../../../type.d.ts" />
import { NextResponse } from 'next/server';
import { fetcher } from '@/lib/coingecko.actions';

export async function GET() {
  try {
    const data = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return NextResponse.json({ coins: [] }, { status: 500 });
  }
}

