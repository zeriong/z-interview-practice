import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useQuizStore } from "@/entities/quiz/model";
import { QuizCard, useQuizSpeech } from "@/features/quiz";
import { INTERVIEW_DATA } from "@/shared/constants";

function QuizPage() {
  const { currentId, voiceEnabled, initialize, next } = useQuizStore();
  const { handleToggleVoice } = useQuizSpeech();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const currentItem = INTERVIEW_DATA.find((item) => item.id === currentId);

  if (!currentItem) return null;

  return (
    <div className="flex h-full flex-col px-4 py-6 md:px-8">
      {/* 음성 질문 토글 */}
      <div className="mb-4 flex shrink-0 items-center justify-center gap-3">
        <span className="text-sm font-semibold text-gray-600">음성 질문</span>
        <button
          type="button"
          role="switch"
          aria-checked={voiceEnabled}
          onClick={handleToggleVoice}
          className={twMerge(
            "relative inline-flex h-6 w-11 shrink-0 items-center",
            "rounded-full transition-colors duration-200",
            voiceEnabled ? "bg-primary" : "bg-gray-300",
          )}
        >
          <span
            className={twMerge(
              "inline-block h-4 w-4 rounded-full bg-white",
              "transition-transform duration-200 shadow-sm",
              voiceEnabled ? "translate-x-6" : "translate-x-1",
            )}
          />
        </button>
      </div>

      {/* 카드 영역 */}
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <QuizCard item={currentItem} onNext={next} />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});
