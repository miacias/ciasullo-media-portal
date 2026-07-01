import { ArrowUpRight } from "lucide-react"
import type { AppLink } from "@/lib/apps"

export function AppCard({ app }: { app: AppLink }) {
  const Icon = app.icon
  const glow = `oklch(0.72 0.15 ${app.accent})`

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Open ${app.name}`}
      style={{ "--glow": glow } as React.CSSProperties}
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
        style={{ background: "var(--glow)" }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex size-12 items-center justify-center rounded-xl border border-border transition-colors duration-300 group-hover:border-transparent"
          style={{ background: "color-mix(in oklab, var(--glow) 14%, transparent)" }}
        >
          <Icon
            className="size-6"
            style={{ color: "var(--glow)" }}
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
        <ArrowUpRight
          className="size-5 -translate-y-1 translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-card-foreground">
          {app.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {app.description}
        </p>
      </div>

      <span className="mt-auto text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
        {app.category}
      </span>
    </a>
  )
}
