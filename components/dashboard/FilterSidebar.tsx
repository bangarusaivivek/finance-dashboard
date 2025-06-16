"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useDashboardStore } from "@/lib/stores/dashboardStore"
import { X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const sectors = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Consumer Cyclical",
  "Communication Services",
  "Industrials",
  "Consumer Defensive",
  "Energy",
  "Utilities",
  "Real Estate",
  "Basic Materials",
]

const marketCapRanges = [
  { label: "Mega Cap (>$200B)", value: "mega" },
  { label: "Large Cap ($10B-$200B)", value: "large" },
  { label: "Mid Cap ($2B-$10B)", value: "mid" },
  { label: "Small Cap ($300M-$2B)", value: "small" },
  { label: "Micro Cap (<$300M)", value: "micro" },
]

export function FilterSidebar() {
  const { isFilterOpen, closeFilter, selectedFilters, updateFilters } = useDashboardStore()
  const [localFilters, setLocalFilters] = useState(selectedFilters)

  const handleApplyFilters = () => {
    updateFilters(localFilters)
    closeFilter()
  }

  const handleResetFilters = () => {
    setLocalFilters({})
    updateFilters({})
  }

  const updateLocalFilter = (key: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-[40] w-80 bg-background border-r transform transition-transform duration-300 ease-in-out",
        isFilterOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={closeFilter}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label>Search Stocks</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by symbol or name..."
                className="pl-10"
                value={localFilters.search || ""}
                onChange={(e) => updateLocalFilter("search", e.target.value)}
              />
            </div>
          </div>

          {/* Sectors */}
          <div className="space-y-3">
            <Label>Sectors</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sectors.map((sector) => (
                <div key={sector} className="flex items-center space-x-2">
                  <Checkbox
                    id={sector}
                    checked={localFilters.sectors?.includes(sector) || false}
                    onCheckedChange={(checked) => {
                      const currentSectors = localFilters.sectors || []
                      if (checked) {
                        updateLocalFilter("sectors", [...currentSectors, sector])
                      } else {
                        updateLocalFilter(
                          "sectors",
                          currentSectors.filter((s: string) => s !== sector),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={sector} className="text-sm font-normal">
                    {sector}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Market Cap */}
          <div className="space-y-3">
            <Label>Market Cap</Label>
            <Select
              value={localFilters.marketCap || ""}
              onValueChange={(value) => updateLocalFilter("marketCap", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select market cap range" />
              </SelectTrigger>
              <SelectContent>
                {marketCapRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <Label>Price Range ($)</Label>
            <div className="px-2">
              <Slider
                value={localFilters.priceRange || [0, 1000]}
                onValueChange={(value) => updateLocalFilter("priceRange", value)}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>${localFilters.priceRange?.[0] || 0}</span>
                <span>${localFilters.priceRange?.[1] || 1000}</span>
              </div>
            </div>
          </div>

          {/* Volume Range */}
          <div className="space-y-3">
            <Label>Volume Range</Label>
            <div className="px-2">
              <Slider
                value={localFilters.volumeRange || [0, 100000000]}
                onValueChange={(value) => updateLocalFilter("volumeRange", value)}
                max={100000000}
                step={1000000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>{((localFilters.volumeRange?.[0] || 0) / 1000000).toFixed(1)}M</span>
                <span>{((localFilters.volumeRange?.[1] || 100000000) / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-3">
            <Label>Performance</Label>
            <Select
              value={localFilters.performance || ""}
              onValueChange={(value) => updateLocalFilter("performance", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select performance filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gainers">Top Gainers</SelectItem>
                <SelectItem value="losers">Top Losers</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 border-t space-y-2">
          <Button onClick={handleApplyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button onClick={handleResetFilters} variant="outline" className="w-full">
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
