"use client"

import { useEffect, useRef, useState } from "react"
import { useStocks } from "@/services/stocks/stocks.queries"
import { useDashboardStore } from "@/lib/stores/dashboardStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/stores/authStore"
import { UpgradePrompt } from "@/components/freemium/UpgradePrompt"
import { FREEMIUM_LIMITS } from "@/services/stocks/stocks.service"
import { EnhancedStockExpandedView } from "./EnhancedStockExpandedView"

const columns = [
  { key: "symbol", label: "Symbol", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "change", label: "Change", sortable: true },
  { key: "changePercent", label: "Change %", sortable: true },
  { key: "volume", label: "Volume", sortable: true },
  { key: "marketCap", label: "Market Cap", sortable: true },
  { key: "sector", label: "Sector", sortable: false },
]

export function StockTable() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useStocks()
  const { sortConfig, updateSort } = useDashboardStore()
  const { isPremium } = useAuthStore()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [expandedStockId, setExpandedStockId] = useState<string | null>(null)

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleSort = (key: string) => {
    const direction = sortConfig?.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    updateSort(key, direction)
  }

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatVolume = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toString()
  }

  const handleRowClick = (stockId: string) => {
    setExpandedStockId(expandedStockId === stockId ? null : stockId)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-8 gap-4 p-4 border-b font-medium">
          {columns.map((column) => (
            <Skeleton key={column.key} className="h-4" />
          ))}
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="grid grid-cols-8 gap-4 p-4 border-b">
            {columns.map((column) => (
              <Skeleton key={column.key} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-medium text-destructive">Error loading data</p>
          <p className="text-sm text-muted-foreground">Please try again later</p>
        </div>
      </div>
    )
  }

  const allStocks = data?.pages.flatMap((page) => page.data) || []
  const isLimitReached = !isPremium && allStocks.length >= FREEMIUM_LIMITS.MAX_ROWS

  return (
    <div className="bg-background rounded-lg border">
      {/* Table Header */}
      <div className="grid grid-cols-8 gap-4 p-4 border-b bg-muted/50 font-medium">
        {columns.map((column) => (
          <div key={column.key} className="flex items-center space-x-1">
            {column.sortable ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-medium"
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                {sortConfig?.key === column.key ? (
                  sortConfig.direction === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  )
                ) : (
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                )}
              </Button>
            ) : (
              <span>{column.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {allStocks.map((stock, index) => (
          <div key={`${stock.id}-${index}`}>
            <div
              onClick={() => handleRowClick(stock.id)}
              className={cn(
                "grid grid-cols-8 gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                expandedStockId === stock.id && "bg-muted/50",
              )}
            >
              <div className="font-medium flex items-center gap-2">
                {expandedStockId === stock.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
                {stock.symbol}
              </div>
              <div className="truncate" title={stock.name}>
                {stock.name}
              </div>
              <div className="font-medium">${stock.price.toFixed(2)}</div>
              <div className={cn("flex items-center space-x-1", stock.change >= 0 ? "text-green-600" : "text-red-600")}>
                {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>${Math.abs(stock.change).toFixed(2)}</span>
              </div>
              <div className={cn("font-medium", stock.changePercent >= 0 ? "text-green-600" : "text-red-600")}>
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </div>
              <div>{formatVolume(stock.volume)}</div>
              <div>{formatNumber(stock.marketCap)}</div>
              <div>
                <Badge variant="secondary" className="text-xs">
                  {stock.sector}
                </Badge>
              </div>
            </div>
            {expandedStockId === stock.id && (
              <div className="border-t">
                <EnhancedStockExpandedView stock={stock} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="p-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Add freemium limit reached message */}
        {isLimitReached && (
          <div className="text-center space-y-4">
            <div className="p-4 border border-amber-200 rounded-lg bg-amber-50 dark:bg-amber-950/20">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Free plan limit reached ({FREEMIUM_LIMITS.MAX_ROWS} stocks)
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                Upgrade to Premium to see all stocks and get real-time updates
              </p>
            </div>
            <UpgradePrompt
              feature="View All Stocks"
              description="See unlimited stocks with real-time updates and advanced filtering"
            />
          </div>
        )}
      </div>
    </div>
  )
}
