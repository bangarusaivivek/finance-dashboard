import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { stocksService, FREEMIUM_LIMITS } from "./stocks.service"
import { useDashboardStore } from "@/lib/stores/dashboardStore"
import { useAuthStore } from "@/lib/stores/authStore"

// Query keys
export const stocksKeys = {
  all: ["stocks"] as const,
  lists: () => [...stocksKeys.all, "list"] as const,
  list: (filters: Record<string, any>, sort: any, tier: string) =>
    [...stocksKeys.lists(), { filters, sort, tier }] as const,
  details: () => [...stocksKeys.all, "detail"] as const,
  detail: (id: string) => [...stocksKeys.details(), id] as const,
  analytics: (symbol: string) => [...stocksKeys.all, "analytics", symbol] as const,
  historical: (symbol: string, period: string) => [...stocksKeys.all, "historical", symbol, period] as const,
}

// Hooks - ENSURE THIS IS EXPORTED
export const useStocks = () => {
  const { selectedFilters, sortConfig } = useDashboardStore()
  const { user, isPremium } = useAuthStore()

  // Only enable real-time refetching if WebSocket URL is configured
  const hasWebSocket = !!process.env.NEXT_PUBLIC_WS_URL && !process.env.NEXT_PUBLIC_WS_URL.includes("localhost:8080")

  return useInfiniteQuery({
    queryKey: stocksKeys.list(selectedFilters, sortConfig, user?.tier || "free"),
    queryFn: ({ pageParam = 1 }) =>
      stocksService.getStocks({
        page: pageParam,
        limit: isPremium ? 50 : FREEMIUM_LIMITS.MAX_ROWS,
        filters: selectedFilters,
        sort: sortConfig ? `${sortConfig.key}:${sortConfig.direction}` : undefined,
        tier: user?.tier || "free",
      }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    // Only enable auto-refetch if WebSocket is not available
    refetchInterval: hasWebSocket
      ? false
      : isPremium
        ? FREEMIUM_LIMITS.PREMIUM_REFRESH_RATE
        : FREEMIUM_LIMITS.REFRESH_RATE,
    staleTime: hasWebSocket ? Number.POSITIVE_INFINITY : isPremium ? 5000 : 30000,
  })
}

export const useStock = (id: string) => {
  return useQuery({
    queryKey: stocksKeys.detail(id),
    queryFn: () => stocksService.getStock(id),
    enabled: !!id,
  })
}

export const useStockAnalytics = (symbol: string) => {
  const { isPremium } = useAuthStore()

  return useQuery({
    queryKey: stocksKeys.analytics(symbol),
    queryFn: () => stocksService.getAdvancedAnalytics(symbol),
    enabled: !!symbol && isPremium, // Only for premium users
  })
}

export const useHistoricalData = (symbol: string, period = "30d") => {
  const { isPremium } = useAuthStore()

  return useQuery({
    queryKey: stocksKeys.historical(symbol, period),
    queryFn: () => stocksService.getHistoricalData(symbol, period),
    enabled: !!symbol && isPremium, // Only for premium users
  })
}
