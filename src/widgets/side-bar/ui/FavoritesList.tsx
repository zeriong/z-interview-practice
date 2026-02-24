import { twMerge } from "tailwind-merge";
import { useFavoritesStore } from "@/entities/favorites/model";
import type { InterviewItem } from "@/shared/types";

interface Props {
  items: InterviewItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearAll: () => void;
  onItemClick: (item: InterviewItem) => void;
  hasFavorites: boolean;
}

export default function FavoritesList({
  items,
  searchQuery,
  onSearchChange,
  onClearAll,
  onItemClick,
  hasFavorites,
}: Props) {
  const { toggle: toggleFavorite } = useFavoritesStore();

  if (!hasFavorites) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-gray-400">즐겨찾기가 없습니다</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex shrink-0 items-center gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="즐겨찾기 검색..."
          className={twMerge(
            "min-w-0 flex-1 rounded-lg border border-gray-200",
            "bg-white px-3 py-2 text-sm text-gray-700",
            "placeholder:text-gray-400 focus:border-pr-orange focus:outline-none",
          )}
        />
        <button
          type="button"
          onClick={onClearAll}
          className={twMerge(
            "shrink-0 rounded-lg px-3 py-2",
            "text-xs font-semibold text-red-500",
            "transition-colors bg-red-50 hover:bg-red-100",
          )}
        >
          모두 비우기
        </button>
      </div>
      {items.length > 0 ? (
        <ul className="flex-1 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <li key={item.id}>
              <div
                className={twMerge(
                  "flex w-full items-start gap-2",
                  "rounded-lg bg-gray-100 p-3",
                  "transition-colors hover:bg-gray-200",
                )}
              >
                <button
                  type="button"
                  aria-label="즐겨찾기 해제"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="shrink-0 text-base leading-snug"
                >
                  ⭐
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
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-gray-400">검색 결과가 없습니다</p>
        </div>
      )}
    </>
  );
}
