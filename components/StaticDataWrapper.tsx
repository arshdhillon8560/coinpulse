'use client';

import { Separator } from '@/components/ui/separator';
import CandlestickChart from '@/components/CandlestickChart';
import CoinHeader from '@/components/CoinHeader';
import DataTable from '@/components/DataTable';
import { formatCurrency, timeAgo } from '@/lib/utils';

interface StaticDataProps {
  coinId: string;
  coin: CoinDetailsData;
  coinOHLCData?: OHLCData[];
}

const StaticDataWrapper = ({ coinId, coin, coinOHLCData }: StaticDataProps) => {
  // Create mock trades data (same structure as LiveDataWrapper)
  // Use fixed values to prevent hydration mismatches between server and client
  const mockTrades: Trade[] = [
    {
      price: 45000.50,
      amount: 50.1234,
      value: 2257000.00,
      type: 'b',
      timestamp: Date.now() - 30000,
    },
  ];

  const tradeColumns: DataTableColumn<Trade>[] = [
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (trade) => (trade.price ? formatCurrency(trade.price) : '-'),
    },
    {
      header: 'Amount',
      cellClassName: 'amount-cell',
      cell: (trade) => trade.amount?.toFixed(4) ?? '-',
    },
    {
      header: 'Value',
      cellClassName: 'value-cell',
      cell: (trade) => (trade.value ? formatCurrency(trade.value) : '-'),
    },
    {
      header: 'Buy/Sell',
      cellClassName: 'type-cell',
      cell: (trade) => (
        <span className={trade.type === 'b' ? 'text-green-500' : 'text-red-500'}>
          {trade.type === 'b' ? 'Buy' : 'Sell'}
        </span>
      ),
    },
    {
      header: 'Time',
      cellClassName: 'time-cell',
      cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : '-'),
    },
  ];

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        currentPrice={coin.market_data.current_price.usd}
        priceChangePercentage24h={coin.market_data.price_change_percentage_24h_in_currency.usd}
        priceChangePercentage30d={coin.market_data.price_change_percentage_30d_in_currency.usd}
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart
          coinId={coinId}
          data={coinOHLCData}
          mode="historical"
          initialPeriod="daily"
        >
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>

      <Separator className="divider" />

      {tradeColumns && (
        <div className="trades">
          <h4>Recent Trades</h4>

          <DataTable
            columns={tradeColumns}
            data={mockTrades}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      )}
    </section>
  );
};

export default StaticDataWrapper;
