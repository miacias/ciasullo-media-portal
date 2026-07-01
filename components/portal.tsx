"use client"

import { useMemo, useState } from "react"
import { Search, LayoutGrid, Sparkles } from "lucide-react"
import { apps, categories, type AppCategory } from "@/lib/apps"
import { AppCard } from "@/components/app-card"

type Filter = "All" | AppCategory

export function Portal() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("All")
  const year = new Date().getFullYear()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return apps.filter((app) => {
      const matchesFilter = filter === "All" || app.category === filter
      const matchesQuery =
        q === "" ||
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [query, filter])

  const featured = apps.filter((a) => a.featured)
  const filters: Filter[] = ["All", ...categories]

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      {/* Header */}
      <header className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LayoutGrid className="size-5" strokeWidth={2} aria-hidden />
            </div>
            <span className="text-lg font-semibold tracking-tight">Ciasullo Media Portal</span>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            {apps.length} apps connected
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Your entire community,{" "}
            <span className="text-primary">one click away.</span>
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Launch any of your favorite apps from a single command center.
            Search, filter and jump straight in.
          </p>
        </div>
      </header>

      {/* Featured */}
      <section aria-labelledby="featured-heading" className="flex flex-col gap-4">
        <h2
          id="featured-heading"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Featured
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featured.map((app) => {
            const Icon = app.icon
            return (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon
                  className="size-5 shrink-0 text-primary transition-transform group-hover:scale-110"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="truncate text-sm font-medium">{app.name}</span>
              </a>
            )
          })}
        </div>
      </section>

      {/* Search + filters */}
      <section aria-label="Browse apps" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps..."
              aria-label="Search apps"
              className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  filter === f
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium">No apps found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search or category.
            </p>
          </div>
        )}
      </section>

      <footer className="mt-auto border-t border-border pt-6 text-sm text-muted-foreground">
        <p>Ciasullo Media Portal © {year}. All rights reserved.</p>
        <p>A launchpad for the whole family. - Designed by Mia Ciasullo.</p>
      </footer>
    </main>
  )
}
