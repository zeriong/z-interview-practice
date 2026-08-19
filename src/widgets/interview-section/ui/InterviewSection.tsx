import {
  defaultRangeExtractor,
  type Range,
  useVirtualizer,
} from "@tanstack/react-virtual";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/entities/sidebar/model";
import { AccordionItem } from "@/features/interview";

import { useAccordionState, useInterviewSearch } from "../model";
import InterviewSearchBar from "./InterviewSearchBar";

export default function InterviewSection() {
  const { searchQuery, setSearchQuery, filteredItems } = useInterviewSearch();
  const { openFilteredIndices, toggleItem, isOpen } =
    useAccordionState(filteredItems);
  const { scrollTargetIndex, clearScrollTarget } = useSidebarStore();

  const rangeExtractor = useCallback(
    (range: Range) => {
      const next = new Set(defaultRangeExtractor(range));
      for (const index of openFilteredIndices) next.add(index);
      return [...next].sort((a, b) => a - b);
    },
    [openFilteredIndices],
  );

  const virtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => document.getElementById("main-scroll"),
    estimateSize: () => 80,
    overscan: 3,
    // 측정 캐시를 인덱스가 아닌 item.id에 묶어, 검색 필터로
    // 인덱스가 재배열되어도 열린 항목의 실측 높이가 유지되도록 함
    getItemKey: (index) => filteredItems[index].id,
    rangeExtractor,
  });

  useEffect(() => {
    if (scrollTargetIndex === null) return;
    setSearchQuery("");
  }, [scrollTargetIndex, setSearchQuery]);

  useEffect(() => {
    if (scrollTargetIndex === null) return;
    if (searchQuery.trim()) return;
    virtualizer.scrollToIndex(scrollTargetIndex, {
      align: "start",
      behavior: "smooth",
    });
    clearScrollTarget();
  }, [scrollTargetIndex, searchQuery, virtualizer, clearScrollTarget]);

  return (
    <div>
      <InterviewSearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="px-4 pb-4 md:px-8 md:pb-8">
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = filteredItems[virtualRow.index];
            return (
              <div
                key={item.id}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                id={`interview-q-${item.id}`}
                className="absolute left-0 top-0 w-full pb-4 md:pb-8"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className={twMerge(
                    "rounded-lg border border-gray-200",
                    "p-4 shadow-sm",
                    "md:rounded-xl md:p-6",
                  )}
                >
                  <AccordionItem
                    id={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={isOpen(item.id)}
                    onToggle={() => toggleItem(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
