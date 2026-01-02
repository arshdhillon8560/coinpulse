'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<(SearchCoin & { price?: number; priceChange24h?: number })[]>([]);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Keyboard shortcut (Q key) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'q' || e.key === 'Q') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch trending coins on mount
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch('/api/coins/trending');
        if (response.ok) {
          const data = await response.json();
          setTrendingCoins(data.coins?.slice(0, 5) || []);
        }
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      }
    };

    if (open) {
      fetchTrending();
    }
  }, [open]);

  // Search coins when query changes
  useEffect(() => {
    const searchCoins = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`/api/coins/search?query=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const data = await response.json();
          const coins = data.coins?.slice(0, 10) || [];
          
          // Fetch price data for search results
          if (coins.length > 0) {
            const coinIds = coins.map((coin: SearchCoin) => coin.id).join(',');
            const priceResponse = await fetch(`/api/coins/prices?ids=${coinIds}`);
            if (priceResponse.ok) {
              const priceData = await priceResponse.json();
              
              // Merge price data with search results
              const coinsWithPrices = coins.map((coin: SearchCoin) => {
                const priceInfo = priceData[coin.id];
                return {
                  ...coin,
                  price: priceInfo?.usd || 0,
                  priceChange24h: priceInfo?.usd_24h_change || 0,
                };
              });
              
              setSearchResults(coinsWithPrices);
            } else {
              setSearchResults(coins);
            }
          } else {
            setSearchResults([]);
          }
        }
      } catch (error) {
        console.error('Error searching coins:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchCoins, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleCoinClick = (coinId: string) => {
    setOpen(false);
    setSearchQuery('');
    router.push(`/coins/${coinId}`);
  };

  const displayCoins = useMemo(() => {
    return searchQuery.trim() ? searchResults : trendingCoins;
  }, [searchQuery, searchResults, trendingCoins]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="trigger nav-link" type="button">
          Search
          <kbd className="kbd"><SearchIcon/></kbd>
        </button>
      </DialogTrigger>
      <DialogContent className="dialog bg-dark-400! max-w-2xl p-0">
        <VisuallyHidden>
          <DialogTitle>Search for cryptocurrencies</DialogTitle>
          <DialogDescription>Search and select a cryptocurrency to view its details</DialogDescription>
        </VisuallyHidden>
        <div className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="cmd-input bg-dark-500! rounded-lg p-4 flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search for a token by name or symbol"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-dark-500! border-none! placeholder:text-purple-100! text-white focus-visible:ring-0"
              autoFocus
            />
            <Button
              type="button"
              className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Q Search
            </Button>
          </div>

          {/* Trending Assets / Search Results */}
          <div className="list bg-dark-500 max-h-96 overflow-y-auto custom-scrollbar rounded-lg">
            <div className="p-4">
              <h3 className="heading text-purple-100 text-lg font-semibold mb-4">
                {searchQuery.trim() ? 'Search Results' : 'Trending assets'}
              </h3>

              {isSearching && searchQuery.trim() ? (
                <div className="empty py-6 text-center text-sm text-gray-400">
                  Searching...
                </div>
              ) : displayCoins.length === 0 && searchQuery.trim() ? (
                <div className="empty py-6 text-center text-sm text-gray-400">
                  No coins found
                </div>
              ) : (
                <div className="space-y-2">
                  {displayCoins.map((coin) => {
                    // Handle both TrendingCoin and SearchCoin types
                    const isTrendingCoin = 'item' in coin;
                    const coinData = isTrendingCoin ? coin.item : coin;
                    const coinId = coinData.id;
                    const coinName = coinData.name;
                    const coinSymbol = coinData.symbol.toUpperCase();
                    const coinImage = coinData.large || coinData.thumb;
                    
                    // Get price data - TrendingCoin has it in data, SearchCoin has it in price/priceChange24h
                    let price = 0;
                    let priceChange = 0;
                    
                    if (isTrendingCoin) {
                      price = coin.item.data?.price || 0;
                      priceChange = coin.item.data?.price_change_percentage_24h?.usd || 0;
                    } else {
                      // SearchCoin with merged price data
                      price = (coin as any).price || 0;
                      priceChange = (coin as any).priceChange24h || 0;
                    }

                    return (
                      <div
                        key={coinId}
                        onClick={() => handleCoinClick(coinId)}
                        className="search-item grid grid-cols-4 gap-4 items-center justify-between data-[selected=true]:bg-dark-400 transition-all !cursor-pointer hover:bg-dark-400 py-3 px-4 rounded-lg"
                      >
                        <div className="coin-info flex gap-4 items-center col-span-2">
                          <Image
                            src={coinImage}
                            alt={coinName}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <p className="font-semibold text-white">{coinName}</p>
                            <p className="coin-symbol text-sm text-purple-100 uppercase">{coinSymbol}</p>
                          </div>
                        </div>
                        <div className="coin-price font-semibold text-sm lg:text-base text-white">
                          {price > 0 ? formatCurrency(price) : '-'}
                        </div>
                        <div
                          className={cn(
                            'coin-change flex gap-1 text-sm lg:text-base items-center font-medium',
                            priceChange > 0 ? 'text-green-500' : priceChange < 0 ? 'text-red-500' : 'text-gray-400'
                          )}
                        >
                          {priceChange !== 0 && (
                            <>
                              {formatPercentage(priceChange)}
                              {priceChange > 0 ? (
                                <TrendingUp className="w-4 h-4" />
                              ) : (
                                <TrendingDown className="w-4 h-4" />
                              )}
                            </>
                          )}
                          {priceChange === 0 && '-'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;

