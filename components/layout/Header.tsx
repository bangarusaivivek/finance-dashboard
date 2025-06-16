"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/lib/stores/authStore"
import { User, Settings, LogOut, Bell, Crown, Menu } from "lucide-react"
import { AuthModal } from "@/components/auth/AuthModal"
import { Badge } from "@/components/ui/badge"
import { UpgradePrompt } from "@/components/freemium/UpgradePrompt"

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FH</span>
              </div>
              <span className="text-xl font-bold">FinanceHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/markets" className="text-sm font-medium hover:text-primary transition-colors">
              Markets
            </Link>
            <Link href="/filings" className="text-sm font-medium hover:text-primary transition-colors">
              Filings
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary transition-colors">
              News
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                </Button>

                {user.tier === "free" && (
                  <UpgradePrompt
                    feature="Premium Features"
                    description="Unlock all premium features"
                    trigger={
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Upgrade
                      </Button>
                    }
                  />
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {user.tier === "free" && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-amber-500 text-xs">F</Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{user.name}</p>
                          <Badge variant={user.tier === "premium" ? "default" : "secondary"} className="text-xs">
                            {user.tier}
                          </Badge>
                        </div>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {user.tier === "free" && (
                      <>
                        <DropdownMenuItem asChild>
                          <UpgradePrompt
                            feature="Premium Features"
                            description="Unlock all premium features"
                            trigger={
                              <div className="flex items-center w-full cursor-pointer">
                                <Crown className="mr-2 h-4 w-4 text-amber-500" />
                                Upgrade to Premium
                              </div>
                            }
                          />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                  Login
                </Button>
                <Button onClick={() => handleAuthClick("signup")}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Dashboard
                </Link>
                <Link href="/markets" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Markets
                </Link>
                <Link href="/filings" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Filings
                </Link>
                <Link href="/news" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  News
                </Link>
                <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Pricing
                </Link>
              </nav>

              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="ghost" onClick={() => handleAuthClick("login")} className="justify-start">
                    Login
                  </Button>
                  <Button onClick={() => handleAuthClick("signup")} className="justify-start">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
