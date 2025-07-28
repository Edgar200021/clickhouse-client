import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/vk')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/vk"!</div>
}
