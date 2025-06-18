"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthStore } from "@/lib/stores/authStore"
import { enhancedStockService } from "@/services/stocks/enhanced-stock.service"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  FileText,
  TrendingUp,
  Building2,
  Users,
  Star,
  StarOff,
  Share2,
  Download,
  ExternalLink,
  Clock,
  Target,
  Activity,
  Bell,
  Shield,
  PieChart,
  Calculator,
  TrendingDown,
  Eye,
  CheckCircle,
  Calendar,
  Briefcase,
  LineChart,
  Zap,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronRight,
  BookOpen,
  Newspaper,
  Scale,
  CreditCard,
  DollarSign,
} from "lucide-react"

interface EnhancedStockExpandedViewProps {
  stock: {
    id: string
    symbol: string
    name: string
    sector: string
    price: number
    change: number
    changePercent: number
    volume: number
    marketCap: number
  }
}

export function EnhancedStockExpandedView({ stock }: EnhancedStockExpandedViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isPremium } = useAuthStore()

  // Data states
  const [secFilings, setSecFilings] = useState<any[]>([])
  const [technicalIndicators, setTechnicalIndicators] = useState<any[]>([])
  const [institutionalHolders, setInstitutionalHolders] = useState<any[]>([])
  const [insiderTransactions, setInsiderTransactions] = useState<any[]>([])
  const [analystReports, setAnalystReports] = useState<any[]>([])
  const [financialStatements, setFinancialStatements] = useState<any[]>([])
  const [peerComparison, setPeerComparison] = useState<any[]>([])
  const [optionsData, setOptionsData] = useState<any>(null)
  const [enhancedNews, setEnhancedNews] = useState<any[]>([])
  const [earningsData, setEarningsData] = useState<any[]>([])

  // Load data based on active tab
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        switch (activeTab) {
          case "sec-filings":
            if (secFilings.length === 0) {
              const data = await enhancedStockService.getSECFilings(stock.symbol)
              setSecFilings(data)
            }
            break
          case "analytics":
            if (technicalIndicators.length === 0) {
              const [indicators, options] = await Promise.all([
                enhancedStockService.getTechnicalIndicators(stock.symbol),
                enhancedStockService.getOptionsData(stock.symbol),
              ])
              setTechnicalIndicators(indicators)
              setOptionsData(options)
            }
            break
          case "research":
            if (analystReports.length === 0) {
              const [reports, peers, earnings] = await Promise.all([
                enhancedStockService.getAnalystReports(stock.symbol),
                enhancedStockService.getPeerComparison(stock.symbol),
                enhancedStockService.getEarningsData(stock.symbol),
              ])
              setAnalystReports(reports)
              setPeerComparison(peers)
              setEarningsData(earnings)
            }
            break
          case "institutional":
            if (institutionalHolders.length === 0) {
              const [holders, transactions] = await Promise.all([
                enhancedStockService.getInstitutionalHolders(stock.symbol),
                enhancedStockService.getInsiderTransactions(stock.symbol),
              ])
              setInstitutionalHolders(holders)
              setInsiderTransactions(transactions)
            }
            break
          case "financials":
            if (financialStatements.length === 0) {
              const statements = await enhancedStockService.getFinancialStatements(stock.symbol)
              setFinancialStatements(statements)
            }
            break
          case "news":
            if (enhancedNews.length === 0) {
              const news = await enhancedStockService.getEnhancedNews(stock.symbol)
              setEnhancedNews(news)
            }
            break
        }
      } catch (error) {
        toast.error("Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [activeTab, stock.symbol])

  const handleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted)
    toast.success(isWatchlisted ? "Removed from watchlist" : "Added to watchlist")
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${stock.name} (${stock.symbol}) Analysis`,
        text: `Comprehensive analysis of ${stock.name}`,
        url: window.location.href,
      })
    } catch (error) {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatShares = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
    return num.toString()
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "buy":
        return "text-green-600 bg-green-50"
      case "sell":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Strong Buy":
      case "Buy":
        return "bg-green-100 text-green-800"
      case "Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Sell":
      case "Strong Sell":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-muted/30 to-muted/10">
      {/* Enhanced Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              {stock.name} ({stock.symbol})
            </h3>
            <Badge variant="outline" className="text-sm">
              {stock.sector}
            </Badge>
            <Badge variant={stock.changePercent >= 0 ? "default" : "destructive"}>
              {stock.changePercent >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </Badge>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              {isPremium ? "Real-time" : "15min delay"}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Professional Analysis
            </span>
          </div>

          {/* Quick Price Info */}
          <div className="flex items-center gap-6">
            <div>
              <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Current Price</p>
            </div>
            <div className={cn("flex items-center gap-1", stock.change >= 0 ? "text-green-600" : "text-red-600")}>
              {stock.change >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
              <span className="text-lg font-semibold">
                {stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleWatchlist}
            className={cn(isWatchlisted && "bg-yellow-50 border-yellow-200")}
          >
            {isWatchlisted ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
            {isWatchlisted ? "Watching" : "Watch"}
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
            Alert
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 h-12">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="financials" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Financials</span>
          </TabsTrigger>
          <TabsTrigger value="sec-filings" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">SEC Filings</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Research</span>
          </TabsTrigger>
          <TabsTrigger value="institutional" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Institutional</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            <span className="hidden sm:inline">News</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Key Metrics & Ratios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "P/E Ratio", value: "24.5", change: "+2.1%", benchmark: "Sector: 22.1" },
                    { label: "PEG Ratio", value: "1.8", change: "-0.1", benchmark: "Fair Value" },
                    { label: "Price/Book", value: "8.2", change: "+5.2%", benchmark: "Premium" },
                    { label: "Price/Sales", value: "7.8", change: "+1.8%", benchmark: "High" },
                    { label: "EV/EBITDA", value: "18.5", change: "+3.1%", benchmark: "Sector: 15.2" },
                    { label: "ROE", value: "17.2%", change: "+0.8%", benchmark: "Excellent" },
                    { label: "ROA", value: "9.6%", change: "+0.3%", benchmark: "Strong" },
                    { label: "Debt/Equity", value: "1.85", change: "-0.05", benchmark: "Moderate" },
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-xl font-bold">{metric.value}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            metric.change.startsWith("+")
                              ? "text-green-600"
                              : metric.change.startsWith("-")
                                ? "text-red-600"
                                : "text-gray-600",
                          )}
                        >
                          {metric.change}
                        </span>
                        <span className="text-xs text-muted-foreground">{metric.benchmark}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "52W High", value: "$198.23", position: "94%" },
                  { label: "52W Low", value: "$124.17", position: "149%" },
                  { label: "Avg Volume", value: "58.2M", trend: "up" },
                  { label: "Market Cap", value: formatNumber(stock.marketCap), rank: "#2" },
                  { label: "Float", value: "15.3B", percentage: "98.2%" },
                  { label: "Short Interest", value: "1.2%", change: "-0.1%" },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <div className="text-right">
                      <p className="font-medium">{stat.value}</p>
                      {stat.position && <p className="text-xs text-muted-foreground">{stat.position}</p>}
                      {stat.rank && <p className="text-xs text-blue-600">{stat.rank}</p>}
                      {stat.change && <p className="text-xs text-green-600">{stat.change}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { period: "1 Day", return: "+1.31%", benchmark: "S&P: +0.8%" },
                    { period: "1 Week", return: "+3.2%", benchmark: "S&P: +1.2%" },
                    { period: "1 Month", return: "+8.7%", benchmark: "S&P: +2.1%" },
                    { period: "3 Months", return: "+15.4%", benchmark: "S&P: +5.8%" },
                    { period: "YTD", return: "+12.3%", benchmark: "S&P: +4.2%" },
                    { period: "1 Year", return: "+28.9%", benchmark: "S&P: +18.5%" },
                  ].map((perf, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{perf.period}</span>
                      <div className="text-right">
                        <span
                          className={cn("font-medium", perf.return.startsWith("+") ? "text-green-600" : "text-red-600")}
                        >
                          {perf.return}
                        </span>
                        <p className="text-xs text-muted-foreground">{perf.benchmark}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { factor: "Beta", value: "1.12", level: "Medium", description: "More volatile than market" },
                    { factor: "Volatility", value: "28.5%", level: "Medium", description: "30-day implied volatility" },
                    { factor: "Sharpe Ratio", value: "1.85", level: "High", description: "Risk-adjusted returns" },
                    { factor: "Max Drawdown", value: "-15.2%", level: "Low", description: "12-month maximum decline" },
                  ].map((risk, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{risk.factor}</p>
                        <p className="text-xs text-muted-foreground">{risk.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{risk.value}</p>
                        <Badge
                          className={cn(
                            "text-xs",
                            risk.level === "High"
                              ? "bg-green-100 text-green-800"
                              : risk.level === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800",
                          )}
                        >
                          {risk.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SEC Filings Tab */}
        <TabsContent value="sec-filings" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">SEC Filings & Regulatory Documents</h3>
              <p className="text-sm text-muted-foreground">Latest regulatory filings and corporate documents</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {secFilings.map((filing) => (
                <Card key={filing.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">
                            {filing.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Filed: {new Date(filing.filingDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Period: {new Date(filing.reportDate).toLocaleDateString()}
                          </span>
                          {filing.isAmended && (
                            <Badge variant="secondary" className="text-xs">
                              Amended
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{filing.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{filing.summary}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{filing.size}</span>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>

                    {filing.keyHighlights && filing.keyHighlights.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Key Highlights
                        </h5>
                        <ul className="space-y-1">
                          {filing.keyHighlights.map((highlight: string, index: number) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technical Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Technical Indicators
                </CardTitle>
                <CardDescription>Real-time technical analysis signals</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {technicalIndicators.map((indicator, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{indicator.name}</p>
                          <p className="text-xs text-muted-foreground">{indicator.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{indicator.value.toFixed(2)}</p>
                          <Badge className={getSignalColor(indicator.signal)}>{indicator.signal.toUpperCase()}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Options Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Options Analytics
                </CardTitle>
                <CardDescription>Options flow and volatility metrics</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading || !optionsData ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold">{optionsData.putCallRatio.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Put/Call Ratio</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold">{(optionsData.impliedVolatility * 100).toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">Implied Volatility</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Open Interest</span>
                        <span className="font-medium">{formatShares(optionsData.openInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Options Volume</span>
                        <span className="font-medium">{formatShares(optionsData.volume)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Max Pain</span>
                        <span className="font-medium">${optionsData.maxPain.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Gamma Exposure</span>
                        <span className="font-medium">{formatNumber(optionsData.gammaExposure)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Interactive Price Chart
              </CardTitle>
              <CardDescription>Advanced charting with technical overlays</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Interactive Chart</p>
                  <p className="text-sm text-muted-foreground">Advanced charting with technical indicators</p>
                  <Button className="mt-4" variant="outline">
                    Load Chart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analyst Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Analyst Reports
                </CardTitle>
                <CardDescription>Professional research and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analystReports.map((report, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{report.firm}</h4>
                            <p className="text-sm text-muted-foreground">{report.analyst}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getRatingColor(report.rating)}>{report.rating}</Badge>
                            <p className="text-sm font-medium mt-1">${report.priceTarget}</p>
                          </div>
                        </div>
                        <p className="text-sm mb-3">{report.summary}</p>
                        <div className="space-y-1">
                          {report.keyPoints.slice(0, 2).map((point, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                              <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              {point}
                            </p>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t">
                          <span className="text-xs text-muted-foreground">
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                          <Button variant="ghost" size="sm">
                            Read Full Report
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Earnings History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Earnings History
                </CardTitle>
                <CardDescription>Quarterly earnings performance</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {earningsData.map((earnings, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{earnings.quarter}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(earnings.reportDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={earnings.surprise > 0 ? "default" : "destructive"}>
                            {earnings.surprise > 0 ? "Beat" : "Miss"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">EPS</p>
                            <p className="font-medium">
                              ${earnings.actualEPS.toFixed(2)} vs ${earnings.estimatedEPS.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Surprise</p>
                            <p
                              className={cn(
                                "font-medium",
                                earnings.surprisePercent > 0 ? "text-green-600" : "text-red-600",
                              )}
                            >
                              {earnings.surprisePercent > 0 ? "+" : ""}
                              {earnings.surprisePercent.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        {earnings.guidance && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-muted-foreground mb-1">Guidance</p>
                            <p className="text-sm">
                              {earnings.guidance.metric}: {formatNumber(earnings.guidance.low)} -{" "}
                              {formatNumber(earnings.guidance.high)}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Peer Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Peer Comparison
              </CardTitle>
              <CardDescription>Valuation metrics vs industry peers</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Company</th>
                        <th className="text-right p-2">Market Cap</th>
                        <th className="text-right p-2">P/E</th>
                        <th className="text-right p-2">PEG</th>
                        <th className="text-right p-2">P/B</th>
                        <th className="text-right p-2">P/S</th>
                        <th className="text-right p-2">EV/EBITDA</th>
                        <th className="text-right p-2">Margin</th>
                        <th className="text-right p-2">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {peerComparison.map((peer, index) => (
                        <tr
                          key={index}
                          className={cn(
                            "border-b hover:bg-muted/50",
                            peer.symbol === stock.symbol && "bg-blue-50 font-medium",
                          )}
                        >
                          <td className="p-2">
                            <div>
                              <p className="font-medium">{peer.symbol}</p>
                              <p className="text-xs text-muted-foreground truncate">{peer.name}</p>
                            </div>
                          </td>
                          <td className="text-right p-2">{formatNumber(peer.marketCap)}</td>
                          <td className="text-right p-2">{peer.peRatio.toFixed(1)}</td>
                          <td className="text-right p-2">{peer.pegRatio.toFixed(1)}</td>
                          <td className="text-right p-2">{peer.priceToBook.toFixed(1)}</td>
                          <td className="text-right p-2">{peer.priceToSales.toFixed(1)}</td>
                          <td className="text-right p-2">{peer.evToEbitda.toFixed(1)}</td>
                          <td className="text-right p-2">{(peer.profitMargin * 100).toFixed(1)}%</td>
                          <td className="text-right p-2">{(peer.revenueGrowth * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Institutional Tab */}
        <TabsContent value="institutional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Institutional Holdings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Top Institutional Holders
                </CardTitle>
                <CardDescription>Latest 13F filings and position changes</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {institutionalHolders.map((holder, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{holder.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatShares(holder.shares)} shares ({holder.percentage.toFixed(1)}%)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatNumber(holder.value)}</p>
                          <div className="flex items-center gap-1">
                            {holder.changePercent > 0 ? (
                              <ArrowUpRight className="h-3 w-3 text-green-600" />
                            ) : holder.changePercent < 0 ? (
                              <ArrowDownRight className="h-3 w-3 text-red-600" />
                            ) : (
                              <Minus className="h-3 w-3 text-gray-600" />
                            )}
                            <span
                              className={cn(
                                "text-xs font-medium",
                                holder.changePercent > 0
                                  ? "text-green-600"
                                  : holder.changePercent < 0
                                    ? "text-red-600"
                                    : "text-gray-600",
                              )}
                            >
                              {holder.changePercent > 0 ? "+" : ""}
                              {holder.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Insider Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Insider Transactions
                </CardTitle>
                <CardDescription>Recent insider buying and selling activity</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-24 mb-2" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {insiderTransactions.map((transaction, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{transaction.name}</p>
                            <p className="text-xs text-muted-foreground">{transaction.title}</p>
                          </div>
                          <Badge variant={transaction.transactionType === "buy" ? "default" : "secondary"}>
                            {transaction.transactionType.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Shares</p>
                            <p className="font-medium">{formatShares(transaction.shares)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">${transaction.price.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Value</p>
                            <p className="font-medium">{formatNumber(transaction.value)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">{new Date(transaction.transactionDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Ownership Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Ownership Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Institutional", percentage: 62.5, color: "bg-blue-500" },
                  { label: "Insiders", percentage: 8.2, color: "bg-green-500" },
                  { label: "Retail", percentage: 24.8, color: "bg-purple-500" },
                  { label: "Other", percentage: 4.5, color: "bg-gray-500" },
                ].map((segment, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <div className="w-full h-full rounded-full bg-muted">
                        <div
                          className={cn("rounded-full", segment.color)}
                          style={{
                            width: "100%",
                            height: "100%",
                            background: `conic-gradient(${segment.color.replace("bg-", "var(--")} 0deg ${segment.percentage * 3.6}deg, #f1f5f9 ${segment.percentage * 3.6}deg 360deg)`,
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold">{segment.percentage}%</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{segment.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Income Statement
                </CardTitle>
                <CardDescription>Quarterly financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {financialStatements.slice(0, 3).map((statement, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-semibold text-sm border-b pb-2">{statement.period}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Revenue</span>
                            <span className="font-medium">{formatNumber(statement.revenue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gross Profit</span>
                            <span className="font-medium">{formatNumber(statement.grossProfit)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Operating Income</span>
                            <span className="font-medium">{formatNumber(statement.operatingIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Net Income</span>
                            <span className="font-medium">{formatNumber(statement.netIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>EPS</span>
                            <span className="font-medium">${statement.eps.toFixed(2)}</span>
                          </div>
                        </div>
                        {index < 2 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Balance Sheet */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Balance Sheet
                </CardTitle>
                <CardDescription>Financial position and ratios</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {financialStatements.slice(0, 1).map((statement, index) => (
                      <div key={index} className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Assets</span>
                            <span className="font-medium">{formatNumber(statement.totalAssets)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Debt</span>
                            <span className="font-medium">{formatNumber(statement.totalDebt)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Free Cash Flow</span>
                            <span className="font-medium">{formatNumber(statement.freeCashFlow)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span>ROE</span>
                            <span className="font-medium">{(statement.roe * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ROA</span>
                            <span className="font-medium">{(statement.roa * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Debt/Equity</span>
                            <span className="font-medium">{statement.debtToEquity.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Financial Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Financial Trends
              </CardTitle>
              <CardDescription>Revenue and profitability trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Financial Trends Chart</p>
                  <p className="text-sm text-muted-foreground">Revenue, earnings, and margin trends</p>
                  <Button className="mt-4" variant="outline">
                    Load Chart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">News & Market Intelligence</h3>
              <p className="text-sm text-muted-foreground">Latest news with sentiment analysis and impact assessment</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                All Sources
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {enhancedNews.map((news) => (
                <Card key={news.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">{getSentimentIcon(news.sentiment)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {news.category.toUpperCase()}
                            </Badge>
                            <Badge
                              variant={
                                news.impact === "high"
                                  ? "destructive"
                                  : news.impact === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {news.impact.toUpperCase()} IMPACT
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(news.publishedAt).toLocaleString()}
                          </span>
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{news.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">{news.source}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Sentiment:</span>
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  news.sentiment === "positive"
                                    ? "text-green-600"
                                    : news.sentiment === "negative"
                                      ? "text-red-600"
                                      : "text-gray-600",
                                )}
                              >
                                {news.sentiment} ({(news.sentimentScore * 100).toFixed(0)}%)
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
