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
  const { isFavorite, toggle: toggleFavorite } = useFavoritesStore();
  const { removeFromHistory } = useQuizStore();

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
      <ul className="flex-1 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-1">
            <div
              className={twMerge(
                "flex min-w-0 flex-1 items-start gap-2",
                "rounded-lg bg-gray-100 p-3",
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
            </div>
            <button
              type="button"
              aria-label="히스토리 삭제"
              onClick={() => removeFromHistory(item.id)}
              className={twMerge(
                "shrink-0 rounded-lg p-2 text-gray-400",
                "transition-colors hover:bg-red-50 hover:text-red-500",
              )}
            >
              <CloseIcon />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
