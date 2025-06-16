"use client"

import { Header } from "@/components/layout/Header"
import { Dashboard } from "@/components/dashboard/Dashboard"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Dashboard />
    </div>
  )
}
