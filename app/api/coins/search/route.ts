/// <reference path="../../../../type.d.ts" />
import { NextRequest, NextResponse } from 'next/server';
import { fetcher } from '@/lib/coingecko.actions';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ coins: [] }, { status: 400 });
    }

    const data = await fetcher<{ coins: SearchCoin[] }>('/search', {
      query: query,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching coins:', error);
    return NextResponse.json({ coins: [] }, { status: 500 });
  }
}

