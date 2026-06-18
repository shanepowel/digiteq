"use client";

import Link from "next/link";
import { useState } from "react";

type SearchHit = {
  id: string;
  type: string;
  title: string;
  body: string;
  slug?: string | null;
  url?: string | null;
};

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = (await res.json()) as { hits: SearchHit[]; summary: string | null };
    setHits(data.hits);
    setSummary(data.summary);
    setLoading(false);
  }

  return (
    <div className="max-w-[720px]">
      <form onSubmit={onSearch} className="mb-8 flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search companies, deals, insights…"
          className="min-h-[44px] flex-1 rounded-lg border border-border bg-surface px-4 text-base text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-cyan/10 px-5 py-2 text-sm font-medium text-cyan hover:bg-cyan/20 disabled:opacity-50"
        >
          {loading ? "searching…" : "search"}
        </button>
      </form>

      {summary ? (
        <div className="mb-6 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          {summary}
        </div>
      ) : null}

      <ul className="space-y-3">
        {hits.map((hit) => (
          <li key={hit.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.1em] text-cyan">{hit.type}</span>
              {hit.url?.startsWith("http") ? (
                <Link href={hit.url} className="text-[14px] font-medium text-white hover:text-cyan">
                  {hit.title}
                </Link>
              ) : hit.url ? (
                <Link href={hit.url} className="text-[14px] font-medium text-white hover:text-cyan">
                  {hit.title}
                </Link>
              ) : (
                <span className="text-[14px] font-medium text-white">{hit.title}</span>
              )}
            </div>
            <p className="line-clamp-2 text-sm text-muted">{hit.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
