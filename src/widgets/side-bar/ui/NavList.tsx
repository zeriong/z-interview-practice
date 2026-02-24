import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useFavoritesStore } from "@/entities/favorites/model";
import { INTERVIEW_DATA } from "@/shared/constants";
import type { InterviewItem } from "@/shared/types";

export default function NavList({
  items,
  onItemClick,
}: {
  items: InterviewItem[];
  onItemClick: (i: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toggle, isFavorite } = useFavoritesStore();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  return (
    <div ref={scrollRef} className="mt-4 min-h-0 flex-1 overflow-y-auto">
      <ul
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          const favorited = isFavorite(item.id);
          return (
            <li
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className="absolute left-0 top-0 w-full pb-3"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="flex w-full items-start gap-2 rounded-lg bg-gray-100 p-3">
                <button
                  type="button"
                  aria-label={favorited ? "즐겨찾기 해제" : "즐겨찾기 등록"}
                  onClick={() => toggle(item.id)}
                  className="shrink-0 text-base leading-snug"
                >
                  {favorited ? "⭐" : "☆"}
                </button>
                <button
                  type="button"
                  onClick={() => onItemClick(INTERVIEW_DATA.indexOf(item))}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className="wrap-break-word text-[15px] leading-snug text-gray-700">
                    {item.question}
                  </span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
