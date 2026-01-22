import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 grow overflow-auto max-h-full min-h-0">
      <h3>Welcome Home!</h3>
    </div>
  );
}
