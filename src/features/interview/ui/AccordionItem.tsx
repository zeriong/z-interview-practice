import DOMPurify from "dompurify";
import { twMerge } from "tailwind-merge";
import { useFavoritesStore } from "@/entities/favorites/model";
import type { InterviewItem } from "@/shared/types";
import { ChevronIcon } from "@/shared/ui/icons";

interface AccordionItemProps extends Omit<InterviewItem, "id"> {
  id: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const { toggle, isFavorite } = useFavoritesStore();
  const favorited = isFavorite(id);

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="flex w-full cursor-pointer items-start justify-between gap-3 py-3 text-left"
      >
        <span className="flex items-start gap-2">
          <button
            type="button"
            aria-label={favorited ? "즐겨찾기 해제" : "즐겨찾기 등록"}
            onClick={(e) => {
              e.stopPropagation();
              toggle(id);
            }}
            className="shrink-0 text-lg leading-snug"
          >
            {favorited ? "⭐" : "☆"}
          </button>
          <span className="text-[16px] font-semibold leading-snug text-gray-800">
            {question}
          </span>
        </span>
        <span
          className={twMerge(
            "mt-1 shrink-0 text-gray-400 transition-transform duration-500",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        >
          <ChevronIcon />
        </span>
      </div>
      <div
        className={twMerge(
          "grid transition-all duration-500",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={twMerge(
              "p-3 text-[14px] leading-relaxed text-gray-700",
              "bg-gray-100/80 rounded-xl",
              "md:p-4 md:text-[15px] md:rounded-2xl",
            )}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(answer),
            }}
          />
        </div>
      </div>
    </div>
  );
}
