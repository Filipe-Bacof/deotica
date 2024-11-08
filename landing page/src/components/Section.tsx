import type { ReactNode } from "react"

type SectionProps = {
  id: string
  title: string
  children: ReactNode
}

export default function Section ({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="container mx-auto py-8 px-4 border-b border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
