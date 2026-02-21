import { createFileRoute } from "@tanstack/react-router";
import { InterviewSection } from "@/widgets/interview-section";

export const Route = createFileRoute("/")({
  component: () => <InterviewSection />,
});
