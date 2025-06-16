export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  tier: "free" | "premium" | "enterprise"
  trialEndsAt?: string
}

export interface LoginResponse {
  user: User
  token: string
}

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    tier: "free",
  },
  {
    id: "2",
    email: "premium@example.com",
    name: "Premium User",
    tier: "premium",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    await delay(1000)

    // Mock authentication - in real app, this would validate credentials
    const user = MOCK_USERS.find((u) => u.email === email)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Generate mock token
    const token = `mock-token-${Date.now()}`

    return {
      user,
      token,
    }
  },

  signup: async (email: string, password: string, name: string): Promise<LoginResponse> => {
    await delay(1200)

    // Check if user already exists
    if (MOCK_USERS.some((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      tier: "free", // New users start with free tier
    }

    // Add to mock users (in real app, this would be saved to database)
    MOCK_USERS.push(newUser)

    const token = `mock-token-${Date.now()}`

    return {
      user: newUser,
      token,
    }
  },

  logout: async (): Promise<void> => {
    await delay(300)
    // In real app, this would invalidate the token on the server
  },

  getCurrentUser: async (token: string): Promise<User> => {
    await delay(500)

    // In real app, this would validate the token and return user data
    // For demo, return first user
    return MOCK_USERS[0]
  },

  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay(800)

    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates }
    return MOCK_USERS[userIndex]
  },
}
