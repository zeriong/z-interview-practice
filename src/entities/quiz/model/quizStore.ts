import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INTERVIEW_DATA } from "@/shared/constants";

function fisherYatesShuffle(arr: number[]): number[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createShuffledIds(): number[] {
  const ids = INTERVIEW_DATA.map((item) => item.id);
  return fisherYatesShuffle(ids);
}

interface QuizState {
  shuffledIds: number[];
  historyIds: number[];
  currentId: number | null;
  voiceEnabled: boolean;
  initialize: () => void;
  next: () => void;
  removeFromHistory: (id: number) => void;
  clearHistory: () => void;
  setVoiceEnabled: (enabled: boolean) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      shuffledIds: [],
      historyIds: [],
      currentId: null,
      voiceEnabled: false,

      initialize: () => {
        const { shuffledIds, currentId } = get();
        if (shuffledIds.length === 0 && currentId === null) {
          const ids = createShuffledIds();
          const first = ids.pop()!;
          set({
            shuffledIds: ids,
            currentId: first,
            historyIds: [first, ...get().historyIds.filter((id) => id !== first)],
          });
        }
      },

      next: () => {
        let { shuffledIds } = get();
        if (shuffledIds.length === 0) {
          shuffledIds = createShuffledIds();
        }
        const nextId = shuffledIds.pop()!;
        set({
          shuffledIds,
          currentId: nextId,
          historyIds: [nextId, ...get().historyIds.filter((id) => id !== nextId)],
        });
      },

      removeFromHistory: (id) =>
        set((state) => ({
          historyIds: state.historyIds.filter((hid) => hid !== id),
        })),

      clearHistory: () => set({ historyIds: [] }),
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
    }),
    {
      name: "quiz-storage",
      partialize: (state) => ({
        historyIds: state.historyIds,
        voiceEnabled: state.voiceEnabled,
      }),
    },
  ),
);
