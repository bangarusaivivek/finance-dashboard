import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authService, type User } from "./auth.service"
import { useAuthStore } from "@/lib/stores/authStore"
import { toast } from "sonner"

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  profile: (id: string) => [...authKeys.all, "profile", id] as const,
}

// Hooks - Make sure all exports are properly named
export const useLogin = () => {
  const { login } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => authService.login(email, password),
    onSuccess: (data) => {
      login(data.user)
      localStorage.setItem("auth-token", data.token)
      queryClient.setQueryData(authKeys.user(), data.user)
      toast.success("Login successful!")
    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed")
    },
  })
}

export const useSignup = () => {
  const { login } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      authService.signup(email, password, name),
    onSuccess: (data) => {
      login(data.user)
      localStorage.setItem("auth-token", data.token)
      queryClient.setQueryData(authKeys.user(), data.user)
      toast.success("Account created successfully!")
    },
    onError: (error: any) => {
      toast.error(error.message || "Signup failed")
    },
  })
}

export const useLogout = () => {
  const { logout } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout()
      localStorage.removeItem("auth-token")
      queryClient.clear()
      toast.success("Logged out successfully")
    },
    onError: () => {
      toast.error("Logout failed")
    },
  })
}

export const useCurrentUser = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth-token") : null

  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getCurrentUser(token!),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUpdateProfile = () => {
  const { updateUser } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<User> }) =>
      authService.updateProfile(userId, updates),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser)
      queryClient.setQueryData(authKeys.user(), updatedUser)
      queryClient.setQueryData(authKeys.profile(updatedUser.id), updatedUser)
      toast.success("Profile updated successfully!")
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile")
    },
  })
}
