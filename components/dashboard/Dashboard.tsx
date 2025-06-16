"use client"

import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { useDashboardStore } from "@/lib/stores/dashboardStore"
import { useWebSocket } from "@/lib/hooks/useWebSocket"
import { stocksService } from "@/services/stocks/stocks.service"
import { FilterSidebar } from "./FilterSidebar"
import { StockTable } from "./StockTable"
import { DashboardHero } from "./DashboardHero"
import { Filter, Download, Wifi, WifiOff, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/stores/authStore"
import { FreemiumBanner } from "@/components/freemium/FreemiumBanner"
import { UpgradePrompt } from "@/components/freemium/UpgradePrompt"
import { FREEMIUM_LIMITS } from "@/services/stocks/stocks.service"

export function Dashboard() {
  const { isFilterOpen, toggleFilter, selectedFilters } = useDashboardStore()
  const { isPremium, isAuthenticated } = useAuthStore()

  // WebSocket connection for real-time updates (optional)
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL
  const { isConnected, connectionError, reconnect } = useWebSocket(wsUrl)

  const exportMutation = useMutation({
    mutationFn: () => stocksService.exportStocks(selectedFilters),
    onSuccess: (data) => {
      // Create download link
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `stocks-export-${new Date().toISOString().split("T")[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success("Export completed successfully!")
    },
    onError: () => {
      toast.error("Export failed. Please try again.")
    },
  })

  const handleExport = () => {
    if (!isPremium) {
      return
    }
    exportMutation.mutate()
  }

  const getConnectionStatus = () => {
    if (!wsUrl) {
      return {
        icon: WifiOff,
        text: "Static Data",
        color: "text-gray-500",
        description: "Using cached data",
      }
    }

    if (isConnected) {
      return {
        icon: Wifi,
        text: "Live",
        color: "text-green-500",
        description: isPremium ? "Real-time updates" : "30s delay",
      }
    }

    if (connectionError) {
      return {
        icon: AlertCircle,
        text: "Connection Error",
        color: "text-red-500",
        description: "Click to retry",
      }
    }

    return {
      icon: WifiOff,
      text: "Connecting...",
      color: "text-yellow-500",
      description: "Establishing connection",
    }
  }

  const connectionStatus = getConnectionStatus()

  return (
    <div className="flex min-h-screen bg-background">
      <FilterSidebar />

      {/* Overlay for mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => useDashboardStore.getState().closeFilter()}
        />
      )}

      <div className={cn("flex-1 flex flex-col transition-all duration-300", isFilterOpen ? "lg:ml-80" : "ml-0")}>
        {/* Hero Content */}
        <div className="p-6 border-b bg-background">
          <DashboardHero />
        </div>

        {/* Sticky Dashboard Header */}
        <div className="sticky top-16 z-[40] flex items-center justify-between p-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={toggleFilter} className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <connectionStatus.icon className={cn("h-4 w-4", connectionStatus.color)} />
              <span
                className={cn(connectionError ? "cursor-pointer hover:underline" : "")}
                onClick={connectionError ? reconnect : undefined}
                title={connectionStatus.description}
              >
                {connectionStatus.text}
              </span>
              {!isPremium && isConnected && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {FREEMIUM_LIMITS.REFRESH_RATE / 1000}s delay
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold">Live Stock Data</h2>
              <p className="text-sm text-muted-foreground">
                {isPremium ? "Real-time market data" : "Delayed market data"}
              </p>
            </div>

            {/* Export button */}
            {isPremium ? (
              <Button
                onClick={handleExport}
                disabled={exportMutation.isPending}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>{exportMutation.isPending ? "Exporting..." : "Export"}</span>
              </Button>
            ) : (
              <UpgradePrompt
                feature="Unlimited Exports"
                description="Export unlimited data anytime with Premium"
                trigger={
                  <Button variant="outline" className="flex items-center space-x-2 border-amber-200 text-amber-700">
                    <Download className="h-4 w-4" />
                    <span>Export (Premium)</span>
                  </Button>
                }
              />
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <FreemiumBanner />

            <div>
              <h1 className="text-2xl font-bold">Stock Market Dashboard</h1>
              <p className="text-muted-foreground">
                {isPremium
                  ? "Real-time stock market data and analytics"
                  : "Limited stock market data - upgrade for real-time updates"}
              </p>
            </div>

            <StockTable />
          </div>
        </div>
      </div>
    </div>
  )
}
