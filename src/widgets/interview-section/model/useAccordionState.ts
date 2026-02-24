import { useCallback, useMemo, useState } from "react";
import type { InterviewItem } from "@/shared/types";

export function useAccordionState(filteredItems: InterviewItem[]) {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const openFilteredIndices = useMemo(() => {
    const indices = new Set<number>();
    for (const id of openIds) {
      const idx = filteredItems.findIndex((item) => item.id === id);
      if (idx !== -1) indices.add(idx);
    }
    return indices;
  }, [openIds, filteredItems]);

  const toggleItem = useCallback((id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isOpen = useCallback((id: number) => openIds.has(id), [openIds]);

  return { openIds, openFilteredIndices, toggleItem, isOpen };
}
