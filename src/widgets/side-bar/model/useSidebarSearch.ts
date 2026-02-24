import { useMemo, useState } from "react";
import { useFavoritesStore } from "@/entities/favorites/model";
import { useQuizStore } from "@/entities/quiz/model";
import { INTERVIEW_DATA } from "@/shared/constants";
import type { InterviewItem } from "@/shared/types";

export function useSidebarSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favSearchQuery, setFavSearchQuery] = useState("");
  const { favoriteIds } = useFavoritesStore();
  const { historyIds } = useQuizStore();

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return INTERVIEW_DATA;
    const query = searchQuery.trim().toLowerCase();
    return INTERVIEW_DATA.filter((item) =>
      item.question.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const filteredFavoriteItems = useMemo(() => {
    const favorites = INTERVIEW_DATA.filter((item) =>
      favoriteIds.includes(item.id),
    );
    if (!favSearchQuery.trim()) return favorites;
    const query = favSearchQuery.trim().toLowerCase();
    return favorites.filter((item) =>
      item.question.toLowerCase().includes(query),
    );
  }, [favoriteIds, favSearchQuery]);

  const quizHistoryItems = useMemo(
    () =>
      historyIds
        .map((id) => INTERVIEW_DATA.find((item) => item.id === id))
        .filter((item): item is InterviewItem => item !== undefined),
    [historyIds],
  );

  return {
    searchQuery,
    setSearchQuery,
    favSearchQuery,
    setFavSearchQuery,
    filteredItems,
    filteredFavoriteItems,
    quizHistoryItems,
    hasFavorites: favoriteIds.length > 0,
  };
}
