"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/stores/authStore"
import { Crown, X } from "lucide-react"
import { useState } from "react"
import { UpgradePrompt } from "./UpgradePrompt"

export function FreemiumBanner() {
  const { isAuthenticated, isPremium } = useAuthStore()
  const [isDismissed, setIsDismissed] = useState(false)

  // Don't show banner if user is premium or has dismissed it
  if (isPremium || isDismissed) return null

  return (
    <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 mb-6">
      <Crown className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-1">
          <span className="font-medium">
            {isAuthenticated ? "You're using the free plan" : "You're viewing limited data"}
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            Upgrade to Premium for real-time updates, unlimited exports, and advanced analytics.
          </span>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <UpgradePrompt
            feature="Premium Access"
            description="Unlock all features with Premium"
            trigger={
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                <Crown className="h-3 w-3 mr-1" />
                Upgrade
              </Button>
            }
          />
          <Button variant="ghost" size="sm" onClick={() => setIsDismissed(true)} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
