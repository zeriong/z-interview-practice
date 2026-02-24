import { useMemo, useState } from "react";
import { INTERVIEW_DATA } from "@/shared/constants";

export function useInterviewSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return INTERVIEW_DATA;
    const query = searchQuery.trim().toLowerCase();
    return INTERVIEW_DATA.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, filteredItems };
}
