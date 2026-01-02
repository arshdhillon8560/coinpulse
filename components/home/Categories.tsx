import { fetcher } from '@/lib/coingecko.actions';
import DataTable from '@/components/DataTable';
import Image from 'next/image';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { CategoriesFallback } from './fallback';

const Categories = async () => {
  try {
    const categories = await fetcher<Category[]>('/coins/categories');

    const columns: DataTableColumn<Category>[] = [
      {
        header: 'Category',
        cellClassName: 'category-cell',
        cell: (category, index) => (
          <div className="flex items-center gap-2">
            <span className="font-bold">{category.name}</span>
            {index < 3 && (
              <span className="badge badge-up text-xs px-2 py-0.5 rounded-full">
                TOP
              </span>
            )}
          </div>
        )
      },
      {
        header: 'Top Gainers',
        cellClassName: 'top-gainers-cell',
        cell: (category) =>
          category.top_3_coins.slice(0, 3).map((coin, idx) => {
            // Extract coin name from URL path for accessibility
            const extractCoinName = (url: string): string => {
              try {
                const pathParts = url.split('/');
                const filename = pathParts[pathParts.length - 1];
                const coinName = filename.split('.')[0]; // Remove file extension
                // Convert to readable format (e.g., "bitcoin-cash" -> "Bitcoin Cash")
                return coinName
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
              } catch {
                return 'Cryptocurrency';
              }
            };

            const coinName = extractCoinName(coin);

            return (
              <div key={coin} className="relative">
                <Image
                  src={coin}
                  alt={`${coinName} cryptocurrency logo`}
                  width={28}
                  height={28}
                  className={cn(
                    "rounded-full border-2 transition-all hover:scale-110",
                    idx === 0 ? "border-yellow-500" :
                    idx === 1 ? "border-gray-400" :
                    "border-purple-600"
                  )}
                />
                {idx === 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-yellow-500 text-dark-900 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    1
                  </span>
                )}
              </div>
            );
          }),
      },
      {
        header: '24h Change',
        cellClassName: 'change-header-cell',
        cell: (category) => {
          const isTrendingUp = category.market_cap_change_24h > 0;
          const isHighChange = Math.abs(category.market_cap_change_24h) > 5;

          return (
            <div className={cn(
              'change-cell flex items-center gap-1',
              isTrendingUp ? 'text-green-500' : 'text-red-500',
              isHighChange && 'font-bold'
            )}>
              <span className="flex items-center">
                {formatPercentage(category.market_cap_change_24h)}
                {isTrendingUp ? (
                  <TrendingUp width={16} height={16} className={isHighChange ? "text-green-400" : ""} />
                ) : (
                  <TrendingDown width={16} height={16} className={isHighChange ? "text-red-500" : ""} />
                )}
              </span>
              {isHighChange && (
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-medium",
                  isTrendingUp ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                  HOT
                </span>
              )}
            </div>
          );
        },
      },
      {
        header: 'Market Cap',
        cellClassName: 'market-cap-cell',
        cell: (category) => {
          const isLargeCap = category.market_cap > 10000000000; // > 10B
          return (
            <span className={cn(isLargeCap && "text-green-400 font-semibold")}>
              {formatCurrency(category.market_cap)}
            </span>
          );
        },
      },
      {
        header: '24h Volume',
        cellClassName: 'volume-cell',
        cell: (category) => {
          const isHighVolume = category.volume_24h > category.market_cap * 0.1; // > 10% of market cap
          return (
            <span className={cn(isHighVolume && "text-yellow-500 font-semibold")}>
              {formatCurrency(category.volume_24h)}
            </span>
          );
        },
      },
    ];

    return (
      <div id="categories" className="custom-scrollbar">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xl md:text-2xl font-semibold">Top Categories</h4>
          <span className="text-sm text-purple-100 bg-dark-400 px-3 py-1 rounded-full">
            {categories?.length || 0} Categories
          </span>
        </div>

        <DataTable
          columns={columns}
          data={categories?.slice(0, 10)}
          rowKey={(_, index) => index}
          tableClassName="mt-3"
          bodyRowClassName="hover:bg-dark-400/50 transition-colors duration-200"
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return <CategoriesFallback />;
  }
};

export default Categories;