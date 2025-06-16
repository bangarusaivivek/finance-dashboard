"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/stores/authStore"
import { TrendingUp, TrendingDown, Activity, Users, BarChart3, Zap } from "lucide-react"
import { UpgradePrompt } from "@/components/freemium/UpgradePrompt"

export function DashboardHero() {
  const { isAuthenticated, isPremium, user } = useAuthStore()

  // Mock market data
  const marketStats = [
    {
      label: "S&P 500",
      value: "4,567.89",
      change: "+23.45",
      changePercent: "+0.52%",
      isPositive: true,
    },
    {
      label: "NASDAQ",
      value: "14,234.56",
      change: "-45.67",
      changePercent: "-0.32%",
      isPositive: false,
    },
    {
      label: "DOW",
      value: "34,567.12",
      change: "+123.45",
      changePercent: "+0.36%",
      isPositive: true,
    },
    {
      label: "VIX",
      value: "18.45",
      change: "-1.23",
      changePercent: "-6.25%",
      isPositive: false,
    },
  ]

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Data",
      description: "Live stock prices and market updates",
      isPremium: false,
    },
    {
      icon: Activity,
      title: "Advanced Analytics",
      description: "Technical indicators and insights",
      isPremium: true,
    },
    {
      icon: TrendingUp,
      title: "Portfolio Tracking",
      description: "Monitor your investments",
      isPremium: true,
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "Price and volume notifications",
      isPremium: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isAuthenticated ? `Welcome back, ${user?.name?.split(" ")[0]}!` : "Welcome to FinanceHub"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isPremium
              ? "Access premium features including real-time data, advanced analytics, and unlimited exports."
              : "Get started with free stock market data. Upgrade to Premium for advanced features and real-time updates."}
          </p>
        </div>

        {!isPremium && (
          <div className="flex justify-center">
            <UpgradePrompt
              feature="Premium Features"
              description="Unlock real-time data, advanced analytics, and unlimited exports"
              trigger={
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              }
            />
          </div>
        )}
      </div>

      {/* Market Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Market Overview</h2>
          <Badge variant="secondary" className="text-xs">
            {isPremium ? "Live" : "Delayed 15 min"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.isPositive ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} ({stat.changePercent})
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`hover:shadow-md transition-shadow ${feature.isPremium && !isPremium ? "opacity-75" : ""}`}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <feature.icon
                      className={`h-6 w-6 ${feature.isPremium && !isPremium ? "text-muted-foreground" : "text-primary"}`}
                    />
                    {feature.isPremium && !isPremium && (
                      <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Users className="h-8 w-8 mx-auto text-blue-600" />
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-muted-foreground">Active Traders</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <BarChart3 className="h-8 w-8 mx-auto text-green-600" />
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-muted-foreground">Stocks Tracked</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Activity className="h-8 w-8 mx-auto text-purple-600" />
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
