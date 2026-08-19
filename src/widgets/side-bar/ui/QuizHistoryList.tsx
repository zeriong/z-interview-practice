import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useFavoritesStore } from "@/entities/favorites/model";
import { useQuizStore } from "@/entities/quiz/model";
import type { InterviewItem } from "@/shared/types";
import { CloseIcon } from "@/shared/ui/icons";

interface Props {
  items: InterviewItem[];
  onItemClick: (item: InterviewItem) => void;
  onClearHistory: () => void;
}

export default function QuizHistoryList({
  items,
  onItemClick,
  onClearHistory,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggle: toggleFavorite } = useFavoritesStore();
  const { removeFromHistory } = useQuizStore();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 60,
    overscan: 5,
    // 측정 캐시를 인덱스가 아닌 item.id에 묶어, 히스토리 삭제로
    // 인덱스가 재배열되어도 실측 높이가 항목을 따라가도록 함
    getItemKey: (index) => items[index].id,
  });

  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-gray-400">퀴즈 히스토리가 없습니다</p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={onClearHistory}
        className={twMerge(
          "mb-3 shrink-0 self-end rounded-lg px-3 py-1",
          "text-xs font-semibold text-red-500",
          "transition-colors bg-red-50 hover:bg-red-100",
        )}
      >
        전체 삭제
      </button>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        <ul
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = items[virtualRow.index];
            return (
              <li
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className="absolute left-0 top-0 w-full pb-2"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className={twMerge(
                    "flex items-start gap-2 rounded-lg bg-gray-100 p-3",
                    "transition-colors hover:bg-gray-200",
                  )}
                >
                  <button
                    type="button"
                    aria-label={
                      isFavorite(item.id) ? "즐겨찾기 해제" : "즐겨찾기 등록"
                    }
                    onClick={() => toggleFavorite(item.id)}
                    className="shrink-0 text-base leading-snug"
                  >
                    {isFavorite(item.id) ? "⭐" : "☆"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onItemClick(item)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="wrap-break-word text-[15px] leading-snug text-gray-700">
                      {item.question}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="히스토리 삭제"
                    onClick={() => removeFromHistory(item.id)}
                    className={twMerge(
                      "shrink-0 rounded p-1 text-gray-400/60",
                      "transition-colors hover:bg-red-100 hover:text-red-500",
                    )}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
