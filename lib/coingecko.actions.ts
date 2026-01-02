'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
  timeout = 5000
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json',
      } as Record<string, string>,
      next: { revalidate },
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody: CoinGeckoErrorBody = await response
        .json()
        .catch(() => ({}));

      throw new Error(
        `API Error: ${response.status}: ${errorBody.error || response.statusText} `
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getPools(coinId: string, network?: string, contractAddress?: string): Promise<PoolData | null> {
  // For demo plan, return null as pool data requires pro plan
  // This function is kept for compatibility but doesn't fetch real data
  return null;
}