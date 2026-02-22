import {
  defaultRangeExtractor,
  type Range,
  useVirtualizer,
} from "@tanstack/react-virtual";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/entities/sidebar/model";
import { AccordionItem } from "@/features/interview";
import { INTERVIEW_DATA } from "@/shared/constants";

export default function InterviewSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const { scrollTargetIndex, clearScrollTarget } = useSidebarStore();

  const rangeExtractor = useCallback(
    (range: Range) => {
      const next = new Set(defaultRangeExtractor(range));
      for (const index of openItems) next.add(index);
      return [...next].sort((a, b) => a - b);
    },
    [openItems],
  );

  const virtualizer = useVirtualizer({
    count: INTERVIEW_DATA.length,
    getScrollElement: () => document.getElementById("main-scroll"),
    estimateSize: () => 80,
    overscan: 3,
    rangeExtractor,
  });

  useEffect(() => {
    if (scrollTargetIndex === null) return;
    virtualizer.scrollToIndex(scrollTargetIndex, {
      align: "start",
      behavior: "smooth",
    });
    clearScrollTarget();
  }, [scrollTargetIndex, virtualizer, clearScrollTarget]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = INTERVIEW_DATA[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              id={`interview-q-${virtualRow.index}`}
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
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems.has(virtualRow.index)}
                  onToggle={() => toggleItem(virtualRow.index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
