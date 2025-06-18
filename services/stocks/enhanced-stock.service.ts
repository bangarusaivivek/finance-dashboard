export interface SECFiling {
  id: string
  type: "10-K" | "10-Q" | "8-K" | "DEF 14A" | "Form 4" | "Form 3" | "Form 5" | "S-1" | "424B"
  title: string
  filingDate: string
  reportDate: string
  url: string
  summary: string
  keyHighlights: string[]
  size: string
  isAmended: boolean
}

export interface TechnicalIndicator {
  name: string
  value: number
  signal: "buy" | "sell" | "neutral"
  description: string
}

export interface InstitutionalHolder {
  name: string
  shares: number
  percentage: number
  value: number
  change: number
  changePercent: number
  reportDate: string
}

export interface InsiderTransaction {
  name: string
  title: string
  transactionDate: string
  transactionType: "buy" | "sell" | "option_exercise" | "gift"
  shares: number
  price: number
  value: number
  sharesOwned: number
}

export interface AnalystReport {
  firm: string
  analyst: string
  rating: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell"
  priceTarget: number
  date: string
  summary: string
  keyPoints: string[]
  previousRating?: string
}

export interface FinancialStatement {
  period: string
  revenue: number
  grossProfit: number
  operatingIncome: number
  netIncome: number
  eps: number
  totalAssets: number
  totalDebt: number
  freeCashFlow: number
  roe: number
  roa: number
  debtToEquity: number
}

export interface PeerComparison {
  symbol: string
  name: string
  marketCap: number
  peRatio: number
  pegRatio: number
  priceToBook: number
  priceToSales: number
  evToEbitda: number
  profitMargin: number
  revenueGrowth: number
}

export interface OptionsData {
  putCallRatio: number
  impliedVolatility: number
  openInterest: number
  volume: number
  maxPain: number
  gammaExposure: number
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  sentiment: "positive" | "negative" | "neutral"
  sentimentScore: number
  url: string
  category: "earnings" | "analyst" | "regulatory" | "product" | "general"
  impact: "high" | "medium" | "low"
}

export interface EarningsData {
  quarter: string
  reportDate: string
  estimatedEPS: number
  actualEPS: number
  surprise: number
  surprisePercent: number
  revenue: number
  revenueEstimate: number
  guidance?: {
    low: number
    high: number
    metric: string
  }
}

// Enhanced service with comprehensive data
export const enhancedStockService = {
  getSECFilings: async (symbol: string): Promise<SECFiling[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return [
      {
        id: "1",
        type: "10-K",
        title: "Annual Report for Fiscal Year Ended September 30, 2023",
        filingDate: "2023-11-02",
        reportDate: "2023-09-30",
        url: "#",
        summary:
          "Comprehensive annual report showing strong revenue growth of 15.2% and improved operational efficiency.",
        keyHighlights: [
          "Revenue increased 15.2% to $383.3 billion",
          "Net income grew 8.7% to $97.0 billion",
          "Services revenue reached record $85.2 billion",
          "Returned $99.9 billion to shareholders",
        ],
        size: "12.4 MB",
        isAmended: false,
      },
      {
        id: "2",
        type: "10-Q",
        title: "Quarterly Report for Quarter Ended December 31, 2023",
        filingDate: "2024-02-01",
        reportDate: "2023-12-31",
        url: "#",
        summary: "Strong Q1 performance with iPhone sales exceeding expectations despite market headwinds.",
        keyHighlights: [
          "Q1 revenue of $119.6 billion, up 2% YoY",
          "iPhone revenue of $69.7 billion",
          "Services set new quarterly record",
          "Gross margin improved to 45.9%",
        ],
        size: "8.7 MB",
        isAmended: false,
      },
      {
        id: "3",
        type: "8-K",
        title: "Current Report - CEO Succession Planning",
        filingDate: "2024-01-15",
        reportDate: "2024-01-15",
        url: "#",
        summary: "Announcement of leadership transition and succession planning initiatives.",
        keyHighlights: [
          "Board approves succession planning framework",
          "New COO appointment effective March 1",
          "Leadership development program expansion",
        ],
        size: "2.1 MB",
        isAmended: false,
      },
      {
        id: "4",
        type: "DEF 14A",
        title: "Proxy Statement for 2024 Annual Meeting",
        filingDate: "2024-01-08",
        reportDate: "2024-01-08",
        url: "#",
        summary: "Proxy statement for annual shareholder meeting including executive compensation details.",
        keyHighlights: [
          "CEO total compensation: $63.2 million",
          "Say-on-pay proposal included",
          "Board diversity initiatives outlined",
          "ESG performance metrics added to compensation",
        ],
        size: "15.3 MB",
        isAmended: false,
      },
      {
        id: "5",
        type: "Form 4",
        title: "Insider Trading - CFO Stock Sale",
        filingDate: "2024-01-12",
        reportDate: "2024-01-10",
        url: "#",
        summary: "CFO sold 50,000 shares as part of pre-arranged 10b5-1 trading plan.",
        keyHighlights: [
          "50,000 shares sold at avg price $185.50",
          "Part of pre-arranged trading plan",
          "Still owns 125,000 shares directly",
        ],
        size: "0.8 MB",
        isAmended: false,
      },
    ]
  },

  getTechnicalIndicators: async (symbol: string): Promise<TechnicalIndicator[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return [
      { name: "RSI (14)", value: 65.2, signal: "neutral", description: "Approaching overbought territory" },
      { name: "MACD", value: 2.45, signal: "buy", description: "Bullish crossover signal" },
      { name: "Bollinger Bands", value: 0.75, signal: "neutral", description: "Price near upper band" },
      { name: "Stochastic", value: 72.1, signal: "sell", description: "Overbought conditions" },
      { name: "Williams %R", value: -28.5, signal: "buy", description: "Oversold bounce potential" },
      { name: "ADX", value: 45.2, signal: "buy", description: "Strong trending market" },
      { name: "CCI", value: 125.8, signal: "sell", description: "Overbought momentum" },
      { name: "Momentum", value: 8.7, signal: "buy", description: "Positive price momentum" },
    ]
  },

  getInstitutionalHolders: async (symbol: string): Promise<InstitutionalHolder[]> => {
    await new Promise((resolve) => setTimeout(resolve, 700))

    return [
      {
        name: "Vanguard Group Inc",
        shares: 1234567890,
        percentage: 8.2,
        value: 234500000000,
        change: 12500000,
        changePercent: 1.02,
        reportDate: "2023-12-31",
      },
      {
        name: "BlackRock Inc",
        shares: 987654321,
        percentage: 6.5,
        value: 187600000000,
        change: -5200000,
        changePercent: -0.52,
        reportDate: "2023-12-31",
      },
      {
        name: "State Street Corp",
        shares: 654321098,
        percentage: 4.3,
        value: 124300000000,
        change: 8900000,
        changePercent: 1.38,
        reportDate: "2023-12-31",
      },
      {
        name: "Berkshire Hathaway",
        shares: 543210987,
        percentage: 3.6,
        value: 103200000000,
        change: 0,
        changePercent: 0,
        reportDate: "2023-12-31",
      },
      {
        name: "Fidelity Management",
        shares: 432109876,
        percentage: 2.9,
        value: 82100000000,
        change: 15600000,
        changePercent: 3.75,
        reportDate: "2023-12-31",
      },
    ]
  },

  getInsiderTransactions: async (symbol: string): Promise<InsiderTransaction[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        name: "Timothy D. Cook",
        title: "Chief Executive Officer",
        transactionDate: "2024-01-10",
        transactionType: "sell",
        shares: 50000,
        price: 185.5,
        value: 9275000,
        sharesOwned: 3200000,
      },
      {
        name: "Luca Maestri",
        title: "Chief Financial Officer",
        transactionDate: "2024-01-08",
        transactionType: "sell",
        shares: 25000,
        price: 184.2,
        value: 4605000,
        sharesOwned: 125000,
      },
      {
        name: "Katherine L. Adams",
        title: "General Counsel",
        transactionDate: "2024-01-05",
        transactionType: "option_exercise",
        shares: 15000,
        price: 95.0,
        value: 1425000,
        sharesOwned: 85000,
      },
      {
        name: "Deirdre O'Brien",
        title: "Senior VP, Retail + People",
        transactionDate: "2023-12-28",
        transactionType: "buy",
        shares: 5000,
        price: 182.75,
        value: 913750,
        sharesOwned: 45000,
      },
    ]
  },

  getAnalystReports: async (symbol: string): Promise<AnalystReport[]> => {
    await new Promise((resolve) => setTimeout(resolve, 900))

    return [
      {
        firm: "Goldman Sachs",
        analyst: "Rod Hall",
        rating: "Buy",
        priceTarget: 195,
        date: "2024-01-15",
        summary: "Strong iPhone cycle expected with AI integration driving upgrade demand.",
        keyPoints: [
          "AI features to drive iPhone upgrade cycle",
          "Services growth remains robust",
          "Margin expansion opportunities",
          "Strong balance sheet supports capital returns",
        ],
        previousRating: "Hold",
      },
      {
        firm: "Morgan Stanley",
        analyst: "Erik Woodring",
        rating: "Hold",
        priceTarget: 175,
        date: "2024-01-12",
        summary: "Cautious on near-term iPhone demand but positive on long-term AI strategy.",
        keyPoints: [
          "iPhone demand may face headwinds",
          "China market remains challenging",
          "AI strategy is promising but early",
          "Valuation appears fair at current levels",
        ],
      },
      {
        firm: "JP Morgan",
        analyst: "Samik Chatterjee",
        rating: "Buy",
        priceTarget: 190,
        date: "2024-01-10",
        summary: "Maintains positive outlook on Apple's ecosystem and services growth.",
        keyPoints: [
          "Ecosystem strength drives loyalty",
          "Services attach rate improving",
          "Wearables category showing growth",
          "Capital allocation strategy effective",
        ],
      },
    ]
  },

  getFinancialStatements: async (symbol: string): Promise<FinancialStatement[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return [
      {
        period: "Q1 2024",
        revenue: 119600000000,
        grossProfit: 54900000000,
        operatingIncome: 40300000000,
        netIncome: 33900000000,
        eps: 2.18,
        totalAssets: 352800000000,
        totalDebt: 123400000000,
        freeCashFlow: 28100000000,
        roe: 0.172,
        roa: 0.096,
        debtToEquity: 1.85,
      },
      {
        period: "Q4 2023",
        revenue: 89500000000,
        grossProfit: 41100000000,
        operatingIncome: 23100000000,
        netIncome: 20700000000,
        eps: 1.29,
        totalAssets: 352800000000,
        totalDebt: 123400000000,
        freeCashFlow: 20900000000,
        roe: 0.165,
        roa: 0.094,
        debtToEquity: 1.85,
      },
      {
        period: "Q3 2023",
        revenue: 81800000000,
        grossProfit: 36400000000,
        operatingIncome: 21400000000,
        netIncome: 18400000000,
        eps: 1.2,
        totalAssets: 352800000000,
        totalDebt: 123400000000,
        freeCashFlow: 18600000000,
        roe: 0.158,
        roa: 0.091,
        debtToEquity: 1.85,
      },
    ]
  },

  getPeerComparison: async (symbol: string): Promise<PeerComparison[]> => {
    await new Promise((resolve) => setTimeout(resolve, 700))

    return [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        marketCap: 2980000000000,
        peRatio: 24.5,
        pegRatio: 1.8,
        priceToBook: 8.2,
        priceToSales: 7.8,
        evToEbitda: 18.5,
        profitMargin: 0.253,
        revenueGrowth: 0.152,
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp",
        marketCap: 2810000000000,
        peRatio: 28.3,
        pegRatio: 2.1,
        priceToBook: 4.5,
        priceToSales: 12.8,
        evToEbitda: 22.1,
        profitMargin: 0.342,
        revenueGrowth: 0.187,
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc",
        marketCap: 1790000000000,
        peRatio: 22.1,
        pegRatio: 1.5,
        priceToBook: 3.8,
        priceToSales: 5.2,
        evToEbitda: 15.8,
        profitMargin: 0.218,
        revenueGrowth: 0.134,
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc",
        marketCap: 1580000000000,
        peRatio: 45.2,
        pegRatio: 2.8,
        priceToBook: 6.1,
        priceToSales: 2.8,
        evToEbitda: 28.5,
        profitMargin: 0.078,
        revenueGrowth: 0.098,
      },
      {
        symbol: "META",
        name: "Meta Platforms",
        marketCap: 840000000000,
        peRatio: 19.8,
        pegRatio: 1.2,
        priceToBook: 4.2,
        priceToSales: 7.1,
        evToEbitda: 12.5,
        profitMargin: 0.285,
        revenueGrowth: 0.165,
      },
    ]
  },

  getOptionsData: async (symbol: string): Promise<OptionsData> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return {
      putCallRatio: 0.85,
      impliedVolatility: 0.28,
      openInterest: 2450000,
      volume: 185000,
      maxPain: 182.5,
      gammaExposure: 1250000000,
    }
  },

  getEnhancedNews: async (symbol: string): Promise<NewsItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "1",
        title: "Apple Reports Record Q1 Results, Beats Revenue Expectations",
        summary:
          "Apple Inc. reported quarterly revenue of $119.6 billion, up 2% year over year, driven by strong iPhone and Services performance.",
        source: "Reuters",
        publishedAt: "2024-01-15T16:30:00Z",
        sentiment: "positive",
        sentimentScore: 0.85,
        url: "#",
        category: "earnings",
        impact: "high",
      },
      {
        id: "2",
        title: "Goldman Sachs Upgrades Apple to Buy, Cites AI Opportunity",
        summary:
          "Goldman Sachs upgraded Apple to Buy from Hold, raising price target to $195, citing potential for AI-driven iPhone upgrade cycle.",
        source: "Bloomberg",
        publishedAt: "2024-01-15T14:20:00Z",
        sentiment: "positive",
        sentimentScore: 0.78,
        url: "#",
        category: "analyst",
        impact: "medium",
      },
      {
        id: "3",
        title: "EU Regulators Investigate Apple's App Store Practices",
        summary:
          "European Union regulators opened formal investigation into Apple's App Store policies under the Digital Markets Act.",
        source: "Financial Times",
        publishedAt: "2024-01-14T11:45:00Z",
        sentiment: "negative",
        sentimentScore: -0.65,
        url: "#",
        category: "regulatory",
        impact: "medium",
      },
      {
        id: "4",
        title: "Apple Announces New AI Research Partnership with Stanford",
        summary:
          "Apple announced a multi-year research partnership with Stanford University focused on advancing machine learning and AI technologies.",
        source: "TechCrunch",
        publishedAt: "2024-01-13T09:15:00Z",
        sentiment: "positive",
        sentimentScore: 0.72,
        url: "#",
        category: "product",
        impact: "low",
      },
    ]
  },

  getEarningsData: async (symbol: string): Promise<EarningsData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return [
      {
        quarter: "Q1 2024",
        reportDate: "2024-02-01",
        estimatedEPS: 2.1,
        actualEPS: 2.18,
        surprise: 0.08,
        surprisePercent: 3.8,
        revenue: 119600000000,
        revenueEstimate: 117800000000,
        guidance: {
          low: 90000000000,
          high: 94000000000,
          metric: "Q2 2024 Revenue",
        },
      },
      {
        quarter: "Q4 2023",
        reportDate: "2023-11-02",
        estimatedEPS: 1.26,
        actualEPS: 1.29,
        surprise: 0.03,
        surprisePercent: 2.4,
        revenue: 89500000000,
        revenueEstimate: 89200000000,
      },
      {
        quarter: "Q3 2023",
        reportDate: "2023-08-03",
        estimatedEPS: 1.19,
        actualEPS: 1.26,
        surprise: 0.07,
        surprisePercent: 5.9,
        revenue: 81800000000,
        revenueEstimate: 81300000000,
      },
    ]
  },
}
