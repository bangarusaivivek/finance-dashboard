"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStockAnalytics, useHistoricalData } from "@/services/stocks/stocks.queries"
import { useAuthStore } from "@/lib/stores/authStore"
import { UpgradePrompt } from "@/components/freemium/UpgradePrompt"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BarChart3,
  FileText,
  TrendingUp,
  Building2,
  DollarSign,
  Users,
  BarChart,
  FileBarChart,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface StockExpandedViewProps {
  stock: {
    symbol: string
    name: string
    sector: string
  }
}

export function StockExpandedView({ stock }: StockExpandedViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { isPremium } = useAuthStore()

  const { data: analytics, isLoading: isLoadingAnalytics } = useStockAnalytics(stock.symbol)
  const { data: historicalData, isLoading: isLoadingHistorical } = useHistoricalData(stock.symbol)

  const quarterlyMetrics = [
    { label: "Revenue", value: "$12.4B", change: "+15.2%" },
    { label: "Net Income", value: "$2.8B", change: "+8.7%" },
    { label: "EPS", value: "$2.45", change: "+12.3%" },
    { label: "Operating Margin", value: "28.5%", change: "-2.1%" },
  ]

  const keyStats = [
    { label: "P/E Ratio", value: "24.5" },
    { label: "Market Cap", value: "$158.2B" },
    { label: "52W High", value: "$185.23" },
    { label: "52W Low", value: "$112.45" },
    { label: "Dividend Yield", value: "1.85%" },
    { label: "Beta", value: "1.12" },
  ]

  if (!isPremium && false) {
    return (
      <div className="p-6 space-y-4">
        <UpgradePrompt
          feature="Detailed Analytics"
          description="Get access to detailed company financials, SEC filings, and advanced analytics"
        />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-muted/30">
      {/* Company Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {stock.name} ({stock.symbol})
          </h3>
          <p className="text-sm text-muted-foreground">{stock.sector}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="financials">
            <DollarSign className="h-4 w-4 mr-2" />
            Financials
          </TabsTrigger>
          <TabsTrigger value="sec-filings">
            <FileText className="h-4 w-4 mr-2" />
            SEC Filings
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Key Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {keyStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest Quarter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Latest Quarter Performance</CardTitle>
                <CardDescription>Q4 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quarterlyMetrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-lg font-semibold">{metric.value}</p>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          metric.change.startsWith("+") ? "text-green-600" : "text-red-600"
                        )}
                      >
                        {metric.change} YoY
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Quarterly Results</CardTitle>
              <CardDescription>Last 4 Quarters</CardDescription>
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
                  {/* Financial metrics would go here */}
                  <p className="text-sm text-muted-foreground">Financial data visualization...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sec-filings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Recent SEC Filings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "10-K", date: "2024-02-15", description: "Annual Report" },
                  { type: "10-Q", date: "2023-11-10", description: "Quarterly Report" },
                  { type: "8-K", date: "2023-10-25", description: "Current Report" },
                ].map((filing) => (
                  <div key={filing.date} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileBarChart className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          Form {filing.type}
                          <span className="ml-2 text-sm text-muted-foreground">({filing.description})</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{filing.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Technical Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingAnalytics ? (
                  <Skeleton className="h-[200px] w-full" />
                ) : (
                  <div className="space-y-4">
                    {/* Technical analysis visualization would go here */}
                    <p className="text-sm text-muted-foreground">Technical analysis visualization...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Price Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Consensus</span>
                    <span className="font-semibold text-green-600">Buy</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">High</span>
                      <span className="font-medium">$195.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Average</span>
                      <span className="font-medium">$175.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Low</span>
                      <span className="font-medium">$145.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 