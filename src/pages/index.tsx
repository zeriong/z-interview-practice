import { createFileRoute } from "@tanstack/react-router";
import InterviewSection from "@/widgets/interview-section/InterviewSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <InterviewSection />;
}
