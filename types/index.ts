// Type definitions for CoinGecko API and application types

export interface SearchCoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
  data: {
    price?: number;
    price_change_percentage_24h: number;
  };
}

export interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    large: string;
    data: {
      price: number;
      price_change_percentage_24h: {
        usd: number;
      };
    };
  };
}

export type OHLCData = [number, number, number, number, number];

export interface CoinDetailsData {
  id: string;
  name: string;
  symbol: string;
  asset_platform_id?: string | null;
  detail_platforms?: Record<
    string,
    {
      geckoterminal_url: string;
      contract_address: string;
    }
  >;
  image: {
    large: string;
    small: string;
  };
  market_data: {
    current_price: {
      usd: number;
      [key: string]: number;
    };
    price_change_24h_in_currency: {
      usd: number;
    };
    price_change_percentage_24h_in_currency: {
      usd: number;
    };
    price_change_percentage_30d_in_currency: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
  };
  market_cap_rank: number;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    subreddit_url: string;
  };
  tickers: Ticker[];
}

export interface Ticker {
  market: {
    name: string;
  };
  base: string;
  target: string;
  converted_last: {
    usd: number;
  };
  timestamp: string;
  trade_url: string;
}

export interface Category {
  name: string;
  top_3_coins: string[];
  market_cap_change_24h: number;
  market_cap: number;
  volume_24h: number;
}

export interface Trade {
  price?: number;
  timestamp?: number;
  type?: string;
  amount?: number;
  value?: number;
}

export interface PoolData {
  id: string;
  address: string;
  name: string;
  network: string;
}

export interface DataTableColumn<T> {
  header: React.ReactNode;
  cell: (row: T, index: number) => React.ReactNode;
  headClassName?: string;
  cellClassName?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => React.Key;
  tableClassName?: string;
  headerClassName?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  bodyRowClassName?: string;
  bodyCellClassName?: string;
}
