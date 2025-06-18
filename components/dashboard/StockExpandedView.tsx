"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStockAnalytics, useHistoricalData } from "@/services/stocks/stocks.queries"
import { useAuthStore } from "@/lib/stores/authStore"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  FileText,
  TrendingUp,
  Building2,
  DollarSign,
  Users,
  BarChart,
  Star,
  StarOff,
  Share2,
  Download,
  ExternalLink,
  Clock,
  Target,
  Activity,
  Bell,
  Globe,
  MapPin,
  Award,
  Shield,
  PieChart,
  Calculator,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

interface StockExpandedViewProps {
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

export function StockExpandedView({ stock }: StockExpandedViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [priceAlert, setPriceAlert] = useState<number | null>(null)
  const [sentiment, setSentiment] = useState<"bullish" | "bearish" | "neutral">("neutral")
  const { isPremium } = useAuthStore()

  const { data: analytics, isLoading: isLoadingAnalytics } = useStockAnalytics(stock.symbol)
  const { data: historicalData, isLoading: isLoadingHistorical } = useHistoricalData(stock.symbol)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small price movements
      const randomChange = (Math.random() - 0.5) * 0.1
      // This would update the price in a real app
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const quarterlyMetrics = [
    { label: "Revenue", value: "$12.4B", change: "+15.2%", trend: "up" },
    { label: "Net Income", value: "$2.8B", change: "+8.7%", trend: "up" },
    { label: "EPS", value: "$2.45", change: "+12.3%", trend: "up" },
    { label: "Operating Margin", value: "28.5%", change: "-2.1%", trend: "down" },
  ]

  const keyStats = [
    { label: "P/E Ratio", value: "24.5", benchmark: "Industry: 22.1" },
    { label: "Market Cap", value: "$158.2B", benchmark: "Large Cap" },
    { label: "52W High", value: "$185.23", benchmark: "Current: 89%" },
    { label: "52W Low", value: "$112.45", benchmark: "Current: 168%" },
    { label: "Dividend Yield", value: "1.85%", benchmark: "S&P 500: 1.6%" },
    { label: "Beta", value: "1.12", benchmark: "More volatile" },
  ]

  const analystRatings = [
    { firm: "Goldman Sachs", rating: "Buy", target: "$195", date: "2024-01-15" },
    { firm: "Morgan Stanley", rating: "Hold", target: "$175", date: "2024-01-10" },
    { firm: "JP Morgan", rating: "Buy", target: "$190", date: "2024-01-08" },
    { firm: "Bank of America", rating: "Buy", target: "$185", date: "2024-01-05" },
  ]

  const companyInfo = {
    description: "Leading technology company specializing in consumer electronics, software, and digital services.",
    employees: "164,000+",
    founded: "1976",
    headquarters: "Cupertino, California",
    website: "apple.com",
    ceo: "Tim Cook",
    industry: "Consumer Electronics",
  }

  const riskFactors = [
    { factor: "Market Competition", level: "Medium", description: "Intense competition in smartphone market" },
    { factor: "Supply Chain", level: "High", description: "Dependency on global supply chain" },
    { factor: "Regulatory", level: "Medium", description: "Increasing regulatory scrutiny" },
    { factor: "Currency", level: "Low", description: "Foreign exchange exposure" },
  ]

  const handleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted)
    toast.success(isWatchlisted ? "Removed from watchlist" : "Added to watchlist")
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${stock.name} (${stock.symbol})`,
        text: `Check out ${stock.name} stock analysis`,
        url: window.location.href,
      })
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const handleExport = () => {
    // Generate PDF or Excel export
    toast.success("Stock analysis exported")
  }

  const handleSetAlert = () => {
    setPriceAlert(stock.price * 1.05) // 5% above current price
    toast.success(`Price alert set for $${(stock.price * 1.05).toFixed(2)}`)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-600 bg-red-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "Low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-green-600"
      case "bearish":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-muted/30 to-muted/10">
      {/* Enhanced Header with Actions */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {stock.name} ({stock.symbol})
            </h3>
            <Badge variant="outline" className="text-xs">
              {stock.sector}
            </Badge>
            <Badge variant={stock.changePercent >= 0 ? "default" : "destructive"} className="text-xs">
              {stock.changePercent >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Live data
            </span>
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
          <Button variant="outline" size="sm" onClick={handleSetAlert}>
            <Bell className="h-4 w-4" />
            Alert
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-5 gap-4 p-4 bg-background rounded-lg border">
        <div className="text-center">
          <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Current Price</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">89%</p>
          <p className="text-xs text-muted-foreground">52W Position</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">24.5</p>
          <p className="text-xs text-muted-foreground">P/E Ratio</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">1.85%</p>
          <p className="text-xs text-muted-foreground">Dividend</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">Buy</p>
          <p className="text-xs text-muted-foreground">Consensus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="financials">
            <DollarSign className="h-4 w-4 mr-2" />
            Financials
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="news">
            <FileText className="h-4 w-4 mr-2" />
            News & Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Enhanced Key Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Key Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyStats.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-lg font-semibold">{stat.value}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{stat.benchmark}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Q4 2023 vs Q4 2022</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quarterlyMetrics.map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            metric.trend === "up" ? "text-green-600" : "text-red-600",
                          )}
                        >
                          {metric.change}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">{metric.value}</p>
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {riskFactors.map((risk) => (
                  <div key={risk.factor} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{risk.factor}</p>
                      <p className="text-xs text-muted-foreground">{risk.description}</p>
                    </div>
                    <Badge className={getRiskColor(risk.level)}>{risk.level}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>iPhone</span>
                      <span>52%</span>
                    </div>
                    <Progress value={52} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Services</span>
                      <span>22%</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mac</span>
                      <span>11%</span>
                    </div>
                    <Progress value={11} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>iPad</span>
                      <span>8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Other</span>
                      <span>7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Geographic Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { region: "Americas", percentage: 42, revenue: "$51.3B" },
                    { region: "Europe", percentage: 24, revenue: "$29.2B" },
                    { region: "Greater China", percentage: 19, revenue: "$23.1B" },
                    { region: "Japan", percentage: 7, revenue: "$8.5B" },
                    { region: "Rest of Asia Pacific", percentage: 8, revenue: "$9.7B" },
                  ].map((region) => (
                    <div key={region.region} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{region.region}</span>
                        <span>{region.revenue}</span>
                      </div>
                      <Progress value={region.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Analyst Ratings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analystRatings.map((rating) => (
                    <div key={rating.firm} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{rating.firm}</p>
                        <p className="text-xs text-muted-foreground">{rating.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={rating.rating === "Buy" ? "default" : "secondary"}>{rating.rating}</Badge>
                        <p className="text-sm font-medium">{rating.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Technical Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingAnalytics ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">RSI (14)</span>
                      <span className="font-medium">65.2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MACD</span>
                      <span className="font-medium text-green-600">+2.45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moving Avg (50)</span>
                      <span className="font-medium">$175.30</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Support Level</span>
                      <span className="font-medium">$165.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resistance Level</span>
                      <span className="font-medium">$195.00</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{companyInfo.description}</p>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Founded</p>
                      <p className="font-medium">{companyInfo.founded}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Employees</p>
                      <p className="font-medium">{companyInfo.employees}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CEO</p>
                      <p className="font-medium">{companyInfo.ceo}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Industry</p>
                      <p className="font-medium">{companyInfo.industry}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={`https://${companyInfo.website}`} className="text-sm text-blue-600 hover:underline">
                      {companyInfo.website}
                    </a>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{companyInfo.headquarters}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  ESG Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Environmental</span>
                      <span className="font-medium">85/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Social</span>
                      <span className="font-medium">78/100</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Governance</span>
                      <span className="font-medium">92/100</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall ESG Score</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      85/100
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Recent News & Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Q4 Earnings Beat Expectations",
                      source: "Reuters",
                      time: "2 hours ago",
                      sentiment: "positive",
                      summary: "Company reported strong quarterly results with revenue growth of 15.2%",
                    },
                    {
                      title: "New Product Launch Announced",
                      source: "TechCrunch",
                      time: "1 day ago",
                      sentiment: "positive",
                      summary: "Revolutionary new product expected to drive future growth",
                    },
                    {
                      title: "Regulatory Concerns Raised",
                      source: "Financial Times",
                      time: "2 days ago",
                      sentiment: "negative",
                      summary: "Government officials express concerns about market dominance",
                    },
                    {
                      title: "Analyst Upgrades Rating",
                      source: "Bloomberg",
                      time: "3 days ago",
                      sentiment: "positive",
                      summary: "Goldman Sachs raises price target to $195 on strong fundamentals",
                    },
                  ].map((news, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-2",
                          news.sentiment === "positive"
                            ? "bg-green-500"
                            : news.sentiment === "negative"
                              ? "bg-red-500"
                              : "bg-gray-500",
                        )}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{news.title}</h4>
                          <span className="text-xs text-muted-foreground">{news.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{news.summary}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {news.source}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Read more
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
