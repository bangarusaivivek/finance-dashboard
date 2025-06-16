import { create } from "zustand"

interface DashboardState {
  isFilterOpen: boolean
  selectedFilters: Record<string, any>
  sortConfig: { key: string; direction: "asc" | "desc" } | null
  toggleFilter: () => void
  closeFilter: () => void
  updateFilters: (filters: Record<string, any>) => void
  updateSort: (key: string, direction: "asc" | "desc") => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isFilterOpen: false,
  selectedFilters: {},
  sortConfig: null,
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  closeFilter: () => set({ isFilterOpen: false }),
  updateFilters: (filters) => set({ selectedFilters: filters }),
  updateSort: (key, direction) => set({ sortConfig: { key, direction } }),
}))
