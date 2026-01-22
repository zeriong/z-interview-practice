import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/experiences-interview/')({
  component: ExperiencesInterview,
})

function ExperiencesInterview() {
  return <div className="p-2">Hello from ExperiencesInterview!</div>
}