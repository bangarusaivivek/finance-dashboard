"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuthStore } from "@/lib/stores/authStore"
import { Crown, Zap, TrendingUp, BarChart3, Download, RefreshCw } from "lucide-react"
import { useState } from "react"

interface UpgradePromptProps {
  feature: string
  description: string
  trigger?: React.ReactNode
}

export function UpgradePrompt({ feature, description, trigger }: UpgradePromptProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, upgradeToPremium } = useAuthStore()

  const handleUpgrade = () => {
    if (isAuthenticated) {
      upgradeToPremium()
      setIsOpen(false)
    } else {
      // Redirect to signup with premium intent
      window.location.href = "/signup?plan=premium"
    }
  }

  const premiumFeatures = [
    { icon: RefreshCw, title: "Real-time Updates", description: "5-second refresh rate vs 30-second for free" },
    { icon: BarChart3, title: "Advanced Analytics", description: "Technical indicators, charts, and insights" },
    { icon: Download, title: "Unlimited Exports", description: "Export data anytime vs 3 per day limit" },
    { icon: TrendingUp, title: "Historical Data", description: "Access 10+ years of historical stock data" },
    { icon: Zap, title: "Priority Support", description: "Get help faster with premium support" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-amber-500" />
            <span>Upgrade to Premium</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 mb-2">
              {feature}
            </Badge>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <Card className="border-amber-200">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button onClick={handleUpgrade} className="w-full bg-amber-600 hover:bg-amber-700">
              <Crown className="h-4 w-4 mr-2" />
              {isAuthenticated ? "Upgrade Now" : "Sign Up for Premium"}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
              Continue with Free
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
