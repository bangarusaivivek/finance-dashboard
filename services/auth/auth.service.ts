export interface User {
  id: string
  email: string
  name: string
  tier: "free" | "premium" | "enterprise"
  avatar?: string
  createdAt: string
  lastLogin: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Mock users database
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    tier: "free",
    avatar: "/placeholder-user.jpg",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    email: "premium@example.com",
    name: "Premium User",
    tier: "premium",
    avatar: "/placeholder-user.jpg",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock auth service - ENSURE THIS IS EXPORTED
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(1000)

    // Mock authentication logic
    const user = MOCK_USERS.find((u) => u.email === email)

    if (!user || password !== "password") {
      throw new Error("Invalid credentials")
    }

    // Update last login
    user.lastLogin = new Date().toISOString()

    return {
      user,
      token: `mock-token-${user.id}-${Date.now()}`,
    }
  },

  signup: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    await delay(1200)

    // Check if user already exists
    if (MOCK_USERS.find((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    // Create new user
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      email,
      name,
      tier: "free",
      avatar: "/placeholder-user.jpg",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    MOCK_USERS.push(newUser)

    return {
      user: newUser,
      token: `mock-token-${newUser.id}-${Date.now()}`,
    }
  },

  logout: async (): Promise<void> => {
    await delay(500)
    // In a real app, this would invalidate the token on the server
  },

  getCurrentUser: async (token: string): Promise<User> => {
    await delay(300)

    // Extract user ID from mock token
    const tokenParts = token.split("-")
    const userId = tokenParts[2]

    const user = MOCK_USERS.find((u) => u.id === userId)
    if (!user) {
      throw new Error("Invalid token")
    }

    return user
  },

  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay(800)

    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update user
    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates }
    return MOCK_USERS[userIndex]
  },

  upgradeToTier: async (userId: string, tier: "premium" | "enterprise"): Promise<User> => {
    await delay(1000)

    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Upgrade user tier
    MOCK_USERS[userIndex].tier = tier
    return MOCK_USERS[userIndex]
  },
}
