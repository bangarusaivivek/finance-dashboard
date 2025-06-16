"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/stores/authStore"
import { useLogin, useSignup } from "@/services/auth/auth.queries"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "signup"
  onModeChange: (mode: "login" | "signup") => void
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  const { login } = useAuthStore()

  const loginMutation = useLogin()
  const signupMutation = useSignup()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "login") {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      })
    } else {
      signupMutation.mutate({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })
    }

    // Close modal on success (handled in the mutation hooks)
    if (loginMutation.isSuccess || signupMutation.isSuccess) {
      onClose()
    }
  }

  const isLoading = loginMutation.isPending || signupMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Login to FinanceHub" : "Create Account"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : mode === "login" ? "Login" : "Create Account"}
          </Button>
        </form>

        <div className="text-center">
          <Button variant="link" onClick={() => onModeChange(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
