export interface StockData {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  sector: string
  lastUpdated: string
}

export interface ApiResponse<T> {
  data: T[]
  total: number
  page: number
  hasMore: boolean
}

// Mock stock data
const MOCK_STOCKS: StockData[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.25,
    change: 2.45,
    changePercent: 1.31,
    volume: 45678900,
    marketCap: 2980000000000,
    sector: "Technology",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: -1.23,
    changePercent: -0.32,
    volume: 23456789,
    marketCap: 2810000000000,
    sector: "Technology",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "3",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.56,
    change: 3.78,
    changePercent: 2.72,
    volume: 34567890,
    marketCap: 1790000000000,
    sector: "Communication Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "4",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 151.94,
    change: -2.15,
    changePercent: -1.39,
    volume: 56789012,
    marketCap: 1580000000000,
    sector: "Consumer Cyclical",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "5",
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.42,
    change: 12.67,
    changePercent: 5.37,
    volume: 89012345,
    marketCap: 789000000000,
    sector: "Consumer Cyclical",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "6",
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 331.05,
    change: -4.23,
    changePercent: -1.26,
    volume: 12345678,
    marketCap: 840000000000,
    sector: "Communication Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "7",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 45.67,
    changePercent: 5.5,
    volume: 67890123,
    marketCap: 2160000000000,
    sector: "Technology",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "8",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 165.42,
    change: 1.89,
    changePercent: 1.16,
    volume: 9876543,
    marketCap: 485000000000,
    sector: "Financial Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "9",
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 156.78,
    change: -0.45,
    changePercent: -0.29,
    volume: 5432109,
    marketCap: 412000000000,
    sector: "Healthcare",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "10",
    symbol: "V",
    name: "Visa Inc.",
    price: 267.89,
    change: 3.21,
    changePercent: 1.21,
    volume: 7654321,
    marketCap: 565000000000,
    sector: "Financial Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "11",
    symbol: "PG",
    name: "Procter & Gamble Co.",
    price: 155.67,
    change: 0.78,
    changePercent: 0.5,
    volume: 4321098,
    marketCap: 372000000000,
    sector: "Consumer Defensive",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "12",
    symbol: "UNH",
    name: "UnitedHealth Group Inc.",
    price: 524.33,
    change: -8.45,
    changePercent: -1.59,
    volume: 2109876,
    marketCap: 495000000000,
    sector: "Healthcare",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "13",
    symbol: "HD",
    name: "Home Depot Inc.",
    price: 345.67,
    change: 5.43,
    changePercent: 1.6,
    volume: 3456789,
    marketCap: 358000000000,
    sector: "Consumer Cyclical",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "14",
    symbol: "MA",
    name: "Mastercard Inc.",
    price: 412.89,
    change: 2.34,
    changePercent: 0.57,
    volume: 1987654,
    marketCap: 395000000000,
    sector: "Financial Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "15",
    symbol: "BAC",
    name: "Bank of America Corp.",
    price: 32.45,
    change: -0.67,
    changePercent: -2.02,
    volume: 45678901,
    marketCap: 265000000000,
    sector: "Financial Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "16",
    symbol: "ABBV",
    name: "AbbVie Inc.",
    price: 165.23,
    change: 1.45,
    changePercent: 0.89,
    volume: 6789012,
    marketCap: 292000000000,
    sector: "Healthcare",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "17",
    symbol: "KO",
    name: "Coca-Cola Co.",
    price: 58.92,
    change: 0.23,
    changePercent: 0.39,
    volume: 12345678,
    marketCap: 255000000000,
    sector: "Consumer Defensive",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "18",
    symbol: "PFE",
    name: "Pfizer Inc.",
    price: 28.67,
    change: -0.89,
    changePercent: -3.01,
    volume: 34567890,
    marketCap: 161000000000,
    sector: "Healthcare",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "19",
    symbol: "XOM",
    name: "Exxon Mobil Corp.",
    price: 102.34,
    change: 2.78,
    changePercent: 2.79,
    volume: 23456789,
    marketCap: 425000000000,
    sector: "Energy",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "20",
    symbol: "DIS",
    name: "Walt Disney Co.",
    price: 91.23,
    change: -1.56,
    changePercent: -1.68,
    volume: 15678901,
    marketCap: 166000000000,
    sector: "Communication Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "21",
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 445.67,
    change: 8.9,
    changePercent: 2.04,
    volume: 8901234,
    marketCap: 198000000000,
    sector: "Communication Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "22",
    symbol: "CRM",
    name: "Salesforce Inc.",
    price: 267.89,
    change: -3.45,
    changePercent: -1.27,
    volume: 5678901,
    marketCap: 263000000000,
    sector: "Technology",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "23",
    symbol: "ADBE",
    name: "Adobe Inc.",
    price: 578.23,
    change: 12.34,
    changePercent: 2.18,
    volume: 3456789,
    marketCap: 267000000000,
    sector: "Technology",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "24",
    symbol: "PYPL",
    name: "PayPal Holdings Inc.",
    price: 62.45,
    change: -1.23,
    changePercent: -1.93,
    volume: 12345678,
    marketCap: 72000000000,
    sector: "Financial Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "25",
    symbol: "INTC",
    name: "Intel Corporation",
    price: 43.67,
    change: 0.89,
    changePercent: 2.08,
    volume: 45678901,
    marketCap: 187000000000,
    sector: "Technology",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "26",
    symbol: "CSCO",
    name: "Cisco Systems Inc.",
    price: 51.23,
    change: 0.45,
    changePercent: 0.89,
    volume: 23456789,
    marketCap: 215000000000,
    sector: "Technology",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "27",
    symbol: "VZ",
    name: "Verizon Communications Inc.",
    price: 38.92,
    change: -0.23,
    changePercent: -0.59,
    volume: 18901234,
    marketCap: 163000000000,
    sector: "Communication Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "28",
    symbol: "WMT",
    name: "Walmart Inc.",
    price: 165.78,
    change: 1.67,
    changePercent: 1.02,
    volume: 7890123,
    marketCap: 538000000000,
    sector: "Consumer Defensive",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "29",
    symbol: "T",
    name: "AT&T Inc.",
    price: 15.67,
    change: -0.12,
    changePercent: -0.76,
    volume: 34567890,
    marketCap: 112000000000,
    sector: "Communication Services",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "30",
    symbol: "MRK",
    name: "Merck & Co. Inc.",
    price: 108.45,
    change: 2.34,
    changePercent: 2.21,
    volume: 9876543,
    marketCap: 274000000000,
    sector: "Healthcare",
    lastUpdated: new Date().toISOString(),
  },
]

// Add freemium limits
export const FREEMIUM_LIMITS = {
  MAX_ROWS: 25,
  MAX_EXPORTS_PER_DAY: 3,
  REFRESH_RATE: 30000,
  PREMIUM_REFRESH_RATE: 5000,
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API functions
export const stocksService = {
  getStocks: async (params: {
    page?: number
    limit?: number
    filters?: Record<string, any>
    sort?: string
    tier?: "free" | "premium" | "enterprise"
  }): Promise<ApiResponse<StockData>> => {
    await delay(500) // Simulate network delay

    let filteredStocks = [...MOCK_STOCKS]

    // Apply search filter
    if (params.filters?.search) {
      const search = params.filters.search.toLowerCase()
      filteredStocks = filteredStocks.filter(
        (stock) => stock.symbol.toLowerCase().includes(search) || stock.name.toLowerCase().includes(search),
      )
    }

    // Apply sector filter
    if (params.filters?.sectors?.length > 0) {
      filteredStocks = filteredStocks.filter((stock) => params.filters.sectors.includes(stock.sector))
    }

    // Apply price range filter
    if (params.filters?.priceRange) {
      const [min, max] = params.filters.priceRange
      filteredStocks = filteredStocks.filter((stock) => stock.price >= min && stock.price <= max)
    }

    // Apply volume range filter
    if (params.filters?.volumeRange) {
      const [min, max] = params.filters.volumeRange
      filteredStocks = filteredStocks.filter((stock) => stock.volume >= min && stock.volume <= max)
    }

    // Apply performance filter
    if (params.filters?.performance) {
      switch (params.filters.performance) {
        case "gainers":
          filteredStocks = filteredStocks.filter((stock) => stock.changePercent > 0)
          filteredStocks.sort((a, b) => b.changePercent - a.changePercent)
          break
        case "losers":
          filteredStocks = filteredStocks.filter((stock) => stock.changePercent < 0)
          filteredStocks.sort((a, b) => a.changePercent - b.changePercent)
          break
        case "active":
          filteredStocks.sort((a, b) => b.volume - a.volume)
          break
      }
    }

    // Apply sorting
    if (params.sort) {
      const [key, direction] = params.sort.split(":")
      filteredStocks.sort((a, b) => {
        const aVal = a[key as keyof StockData]
        const bVal = b[key as keyof StockData]

        if (typeof aVal === "string" && typeof bVal === "string") {
          return direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return direction === "asc" ? aVal - bVal : bVal - aVal
        }

        return 0
      })
    }

    // Apply pagination
    const page = params.page || 1
    const limit = Math.min(params.limit || 25, params.tier === "free" ? FREEMIUM_LIMITS.MAX_ROWS : 50)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedStocks = filteredStocks.slice(startIndex, endIndex)

    return {
      data: paginatedStocks,
      total: filteredStocks.length,
      page,
      hasMore: endIndex < filteredStocks.length,
    }
  },

  getStock: async (id: string): Promise<StockData> => {
    await delay(300)
    const stock = MOCK_STOCKS.find((s) => s.id === id)
    if (!stock) {
      throw new Error("Stock not found")
    }
    return stock
  },

  exportStocks: async (filters?: Record<string, any>) => {
    await delay(1000)

    // Create CSV content
    const headers = ["Symbol", "Name", "Price", "Change", "Change %", "Volume", "Market Cap", "Sector"]
    const csvContent = [
      headers.join(","),
      ...MOCK_STOCKS.map((stock) =>
        [
          stock.symbol,
          `"${stock.name}"`,
          stock.price,
          stock.change,
          stock.changePercent,
          stock.volume,
          stock.marketCap,
          stock.sector,
        ].join(","),
      ),
    ].join("\n")

    return new Blob([csvContent], { type: "text/csv" })
  },

  getAdvancedAnalytics: async (symbol: string) => {
    await delay(800)
    return {
      symbol,
      technicalIndicators: {
        rsi: Math.random() * 100,
        macd: Math.random() * 10 - 5,
        movingAverage: Math.random() * 200 + 100,
      },
      sentiment: Math.random() > 0.5 ? "bullish" : "bearish",
    }
  },

  getHistoricalData: async (symbol: string, period: string) => {
    await delay(600)
    const data = []
    const basePrice = MOCK_STOCKS.find((s) => s.symbol === symbol)?.price || 100

    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toISOString().split("T")[0],
        price: basePrice + (Math.random() - 0.5) * 20,
        volume: Math.floor(Math.random() * 50000000) + 10000000,
      })
    }

    return data
  },
}
