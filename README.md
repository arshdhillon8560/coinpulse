# CoinPulse

A modern cryptocurrency tracking and analytics dashboard built with Next.js 16, featuring real-time market data, interactive charts, and comprehensive coin information powered by CoinGecko API.

## ✨ Introduction

CoinPulse is a high-performance cryptocurrency analytics dashboard that provides real-time market intelligence through CoinGecko's API. Built with Next.js 16, TailwindCSS v4, and Radix UI components, it delivers a clean, responsive interface for tracking cryptocurrency prices, market trends, and detailed coin information. The platform features interactive TradingView candlestick charts, a powerful search functionality, currency conversion tools, and comprehensive market data visualization.

## ⚙️ Tech Stack

- **[Next.js 16](https://nextjs.org)** - React framework with App Router, Server Components, and API Routes
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development with static typing
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, unstyled UI components (Dialog, Select, Separator)
- **[Lightweight Charts](https://www.tradingview.com/lightweight-charts/)** - High-performance financial charting library for OHLCV data visualization
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icon library
- **[CoinGecko API](https://www.coingecko.com/en/api)** - Comprehensive cryptocurrency market data API

## 🔋 Features

### 🏠 Home Dashboard
- **Market Overview**: Displays trending cryptocurrencies with real-time price updates
- **Top Categories**: Shows cryptocurrency categories with market cap, volume, and 24h changes
- **Trending Coins**: Dynamic list of trending assets with price and percentage changes
- **Coin Overview**: Interactive candlestick charts with multiple timeframe options

### 🔍 Search Functionality
- **Global Search**: Powerful search modal to find any cryptocurrency by name or symbol
- **Keyboard Shortcut**: Press `Cmd/Ctrl + Q` to quickly open search
- **Trending Assets**: Displays top trending coins when search is empty
- **Real-time Results**: Instant search results with price data and 24h changes
- **Quick Navigation**: Click any search result to navigate to coin detail page

### 📊 Coin Detail Pages
- **Comprehensive Coin Information**: Detailed view with market cap, volume, and rankings
- **Interactive Charts**: Multi-timeframe candlestick charts (daily, weekly, monthly, etc.)
- **Price Statistics**: Current price, 24h change, 30-day change, and price history
- **Currency Converter**: Convert any coin amount to multiple fiat and crypto currencies
- **Coin Details**: Links to website, blockchain explorer, and community resources
- **Recent Trades**: Sample trade data display (static data for demo plan)

### 📈 Market Data
- **All Coins Page**: Comprehensive table with pagination showing all cryptocurrencies
- **Sortable Columns**: Sort by rank, price, market cap, and 24h change
- **Pagination**: Efficient browsing with page navigation
- **Responsive Design**: Optimized for all screen sizes

### 🎨 UI Components
- **Accessible Components**: Built with Radix UI for full accessibility support
- **Dark Theme**: Modern dark color scheme optimized for extended viewing
- **Responsive Layout**: Mobile-first design that works on all devices
- **Custom Scrollbars**: Styled scrollbars for better visual experience

## 🤸 Quick Start

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd coinpluse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
   COINGECKO_API_KEY=your_api_key_here
   ```

   > **Note**: You can use CoinGecko's free/demo API plan. Get your API key from [CoinGecko API](https://www.coingecko.com/en/api)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
coinpluse/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── coins/         # Coin-related API endpoints
│   ├── coins/             # Coin pages
│   │   ├── [id]/          # Dynamic coin detail pages
│   │   └── page.tsx       # All coins listing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── home/              # Home page components
│   ├── ui/                # Reusable UI components
│   └── ...                # Other components
├── lib/                   # Utility functions
│   ├── coingecko.actions.ts  # CoinGecko API functions
│   └── utils.ts           # Helper utilities
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Configuration

### CoinGecko API

This project uses CoinGecko's API for cryptocurrency data. The free/demo plan is sufficient for most features:

- **Base URL**: `https://api.coingecko.com/api/v3`
- **API Key**: Get your free API key from [CoinGecko](https://www.coingecko.com/en/api)
- **Rate Limits**: Free plan has rate limits (typically 10-50 calls/minute)

### Environment Variables

Required environment variables:
- `COINGECKO_BASE_URL` - CoinGecko API base URL
- `COINGECKO_API_KEY` - Your CoinGecko API key

## 🎯 Key Features Implementation

### Search Modal
- Real-time search with debouncing
- Fetches price data for search results
- Keyboard shortcut support (Cmd/Ctrl + Q)
- Accessible dialog with proper ARIA labels

### Candlestick Charts
- Multiple timeframes (daily, weekly, monthly, etc.)
- Interactive TradingView Lightweight Charts
- Historical OHLCV data visualization
- Responsive design

### Currency Converter
- Convert between multiple currencies
- Real-time price updates
- Support for fiat and crypto currencies

## 📝 Notes

- **WebSocket Support**: This project uses static API calls. WebSocket functionality requires CoinGecko Pro plan.
- **Demo Plan**: Optimized to work with CoinGecko's free/demo API plan
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Accessibility**: Built with accessibility in mind using Radix UI components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing comprehensive cryptocurrency data
- [TradingView](https://www.tradingview.com/) for the Lightweight Charts library
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
