import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz")({
  component: () => (
    <div className="flex h-full items-center justify-center">
      <p className="text-2xl font-bold text-gray-500">Quiz Page</p>
    </div>
  ),
});
