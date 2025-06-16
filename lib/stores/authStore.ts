import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  tier: "free" | "premium" | "enterprise" // Add subscription tier
  trialEndsAt?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isPremium: boolean // Add premium status helper
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  upgradeToPremium: () => void
}

// Update the store implementation
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isPremium: false,
      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          isPremium: user.tier === "premium" || user.tier === "enterprise",
        }),
      logout: () => set({ user: null, isAuthenticated: false, isPremium: false }),
      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData }
          set({
            user: updatedUser,
            isPremium: updatedUser.tier === "premium" || updatedUser.tier === "enterprise",
          })
        }
      },
      upgradeToPremium: () => {
        const currentUser = get().user
        if (currentUser) {
          const updatedUser = { ...currentUser, tier: "premium" as const }
          set({
            user: updatedUser,
            isPremium: true,
          })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
