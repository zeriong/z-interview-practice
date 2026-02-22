import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  scrollTargetIndex: number | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  scrollTo: (index: number) => void;
  clearScrollTarget: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  scrollTargetIndex: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  scrollTo: (index) => set({ scrollTargetIndex: index }),
  clearScrollTarget: () => set({ scrollTargetIndex: null }),
}));
