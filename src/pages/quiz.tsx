import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuizStore } from "@/entities/quiz/model";
import { QuizCard } from "@/features/quiz";
import { INTERVIEW_DATA } from "@/shared/constants";

function QuizPage() {
  const { currentId, initialize, next } = useQuizStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const currentItem = INTERVIEW_DATA.find((item) => item.id === currentId);

  if (!currentItem) return null;

  return (
    <div className="flex h-full items-center justify-center px-4 py-6 md:px-8">
      <QuizCard item={currentItem} onNext={next} />
    </div>
  );
}

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});
