import DOMPurify from "dompurify";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useFavoritesStore } from "@/entities/favorites/model";
import { useSwipeFlip } from "@/features/quiz/model";
import type { InterviewItem } from "@/shared/types";

interface QuizCardProps {
  item: InterviewItem;
  onNext: () => void;
}

export default function QuizCard({ item, onNext }: QuizCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { cardRef, swipeHandlers } = useSwipeFlip(flipped, setFlipped);
  const { toggle, isFavorite } = useFavoritesStore();
  const favorited = isFavorite(item.id);

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-5">
      {/* 카드 컨테이너 */}
      <div
        {...swipeHandlers}
        className={twMerge(
          "w-full max-w-[700px] flex-1 cursor-grab",
          "[perspective:1000px] [touch-action:pan-y]",
        )}
      >
        <div ref={cardRef} className="relative h-full w-full transform-3d">
          {/* 앞면: Question */}
          <div
            className={twMerge(
              "absolute inset-0 flex flex-col",
              "rounded-2xl border-2 border-primary/30 bg-white",
              "p-6 shadow-lg [backface-visibility:hidden]",
              "md:rounded-3xl md:p-8",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/60">
                Quiz
              </span>
              <span className="text-xs font-bold text-gray-300">
                카드를 회전할 수 있어요
              </span>
              <button
                type="button"
                aria-label={favorited ? "즐겨찾기 해제" : "즐겨찾기 등록"}
                onClick={() => toggle(item.id)}
                className="text-xl"
              >
                {favorited ? "⭐" : "☆"}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <p
                className={twMerge(
                  "text-center text-lg font-bold leading-relaxed",
                  "text-gray-800 md:text-xl",
                )}
              >
                Q. {item.question}
              </p>
            </div>
          </div>

          {/* 뒷면: Answer */}
          <div
            className={twMerge(
              "absolute inset-0 flex flex-col",
              "rounded-2xl border-2 border-pr-orange/30 bg-white",
              "shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]",
              "md:rounded-3xl",
            )}
          >
            <div
              className={twMerge(
                "shrink-0 border-b border-gray-200",
                "px-6 py-3 md:px-8 md:py-4 flex justify-between",
              )}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-pr-orange/60">
                Answer
              </span>

              <span className="text-[12px] font-bold text-gray-300">
                이곳을 드래그하면, 카드 회전이 편해요!
              </span>
            </div>
            <div className="flex-1 overflow-auto px-6 py-4 md:px-8">
              <div
                className="text-sm leading-relaxed text-gray-700 md:text-[15px]"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.answer),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex shrink-0 gap-3">
        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          className={twMerge(
            "rounded-xl px-6 py-3 text-sm font-semibold",
            "transition-colors",
            flipped
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-pr-orange text-white hover:bg-pr-orange/90",
          )}
        >
          {flipped ? "질문 보기" : "답변 보기"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={twMerge(
            "rounded-xl px-6 py-3 text-sm font-semibold",
            "bg-gray-200 text-gray-700 transition-colors",
            "hover:bg-gray-300",
          )}
        >
          다음 퀴즈
        </button>
      </div>
    </div>
  );
}
