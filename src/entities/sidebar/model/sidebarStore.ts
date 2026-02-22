import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarTab = "list" | "favorites";

interface SidebarState {
  isOpen: boolean;
  scrollTargetIndex: number | null;
  sidebarTab: SidebarTab;
  open: () => void;
  close: () => void;
  toggle: () => void;
  scrollTo: (index: number) => void;
  clearScrollTarget: () => void;
  setSidebarTab: (tab: SidebarTab) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      scrollTargetIndex: null,
      sidebarTab: "list",
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      scrollTo: (index) => set({ scrollTargetIndex: index }),
      clearScrollTarget: () => set({ scrollTargetIndex: null }),
      setSidebarTab: (tab) => set({ sidebarTab: tab }),
    }),
    {
      name: "sidebar-storage",
      partialize: (state) => ({ sidebarTab: state.sidebarTab }),
    },
  ),
);
