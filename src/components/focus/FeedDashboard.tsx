'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, RefreshCw } from 'lucide-react';
import type { FeedItem } from '@/app/api/feeds/route';

type FeedData = Record<string, FeedItem[]>;

const CATEGORIES = [
  { id: 'jobs',     label: 'Jobs',                  emoji: '💼', color: 'oklch(0.78 0.13 70)' },
  { id: 'ai',       label: 'AI & Automation',        emoji: '🧠', color: 'oklch(0.72 0.15 150)' },
  { id: 'design',   label: 'Design / Web',           emoji: '🎨', color: 'oklch(0.75 0.12 300)' },
  { id: 'startups', label: 'Startups & Inspiration', emoji: '🚀', color: 'oklch(0.78 0.10 40)' },
  { id: 'markets',  label: 'Markets',                emoji: '📊', color: 'oklch(0.75 0.08 200)' },
] as const;

function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const h = Math.floor(diff / 3_600_000);
    const d = Math.floor(h / 24);
    if (h < 1) return 'just now';
    if (h < 24) return `${h}h ago`;
    if (d < 7) return `${d}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch { return ''; }
}

function SkeletonCard() {
  return (
    <div
      className="flex-shrink-0 w-72 rounded-2xl border p-5 flex flex-col gap-3 animate-pulse"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 rounded-full" style={{ background: 'var(--surface-elevated)' }} />
        <div className="h-3 w-10 rounded-full" style={{ background: 'var(--surface-elevated)' }} />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded" style={{ background: 'var(--surface-elevated)' }} />
        <div className="h-4 w-4/5 rounded" style={{ background: 'var(--surface-elevated)' }} />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded" style={{ background: 'var(--surface-elevated)' }} />
        <div className="h-3 w-full rounded" style={{ background: 'var(--surface-elevated)' }} />
        <div className="h-3 w-2/3 rounded" style={{ background: 'var(--surface-elevated)' }} />
      </div>
    </div>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group flex-shrink-0 w-72 rounded-2xl border p-5 shadow-card flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-dim)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {item.image && (
        <div className="h-32 w-full rounded-xl overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      <div className="flex items-center justify-between gap-2 flex-shrink-0">
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full truncate"
          style={{ background: 'var(--surface-elevated)', color: 'var(--accent)', border: '1px solid var(--border)' }}
        >
          {item.source}
        </span>
        {item.pubDate && (
          <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>
            {timeAgo(item.pubDate)}
          </span>
        )}
      </div>

      <div className="flex-1 min-h-0">
        <h3
          className="font-display text-base leading-snug mb-1.5 overflow-hidden"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {item.title}
        </h3>
        {item.description && (
          <p
            className="text-xs leading-relaxed overflow-hidden"
            style={{
              color: 'var(--muted-foreground)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.description}
          </p>
        )}
      </div>

      <div
        className="flex items-center gap-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        style={{ color: 'var(--accent)' }}
      >
        Read more <ExternalLink className="h-2.5 w-2.5" />
      </div>
    </a>
  );
}

function FeedRow({
  cat,
  items,
  loading,
}: {
  cat: (typeof CATEGORIES)[number];
  items: FeedItem[];
  loading: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    rowRef.current?.scrollBy({ left: dir === 'right' ? 308 : -308, behavior: 'smooth' });
  };

  return (
    <div className="mb-12">
      <div
        className="flex items-center justify-between mb-4 px-6 sm:px-8"
        style={{ maxWidth: '80rem', margin: '0 auto 1rem' }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base leading-none">{cat.emoji}</span>
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)' }}>
            {cat.label}
          </span>
          {!loading && items.length > 0 && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full tabular-nums"
              style={{ background: 'var(--surface-elevated)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
            >
              {items.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {(['left', 'right'] as const).map(dir => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              className="h-7 w-7 rounded-full border flex items-center justify-center transition-colors hover:text-white"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--muted-foreground)' }}
              aria-label={`Scroll ${dir}`}
            >
              {dir === 'left'
                ? <ChevronLeft className="h-3.5 w-3.5" />
                : <ChevronRight className="h-3.5 w-3.5" />
              }
            </button>
          ))}
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-3 overflow-x-auto px-6 sm:px-8 pb-3"
        style={{ scrollbarWidth: 'none' }}
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : items.length === 0 ? (
          <div
            className="flex-shrink-0 w-72 rounded-2xl border p-5"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Feed unavailable — check back soon.
            </p>
          </div>
        ) : (
          items.map(item => <FeedCard key={item.id} item={item} />)
        )}
        {/* Trailing spacer so last card doesn't hug the edge */}
        <div className="flex-shrink-0 w-2" aria-hidden />
      </div>
    </div>
  );
}

export function FeedDashboard() {
  const [data, setData] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string>('');

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/feeds')
      .then(r => r.json())
      .then((d: FeedData) => {
        setData(d);
        setLastFetched(new Date().toISOString());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const totalItems = data ? Object.values(data).reduce((s, arr) => s + arr.length, 0) : 0;

  return (
    <section className="border-t pt-16 pb-8" style={{ borderColor: 'var(--border)' }}>
      {/* Header */}
      <div
        className="flex items-end justify-between mb-10 px-6 sm:px-8 flex-wrap gap-4"
        style={{ maxWidth: '80rem', margin: '0 auto 2.5rem' }}
      >
        <div>
          <div className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)' }}>
            Signal Stack — Live
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-balance leading-tight">
            10 feeds.{' '}
            <span style={{ color: 'var(--accent)' }}>Zero noise.</span>
          </h2>
          {!loading && totalItems > 0 && (
            <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
              {totalItems} items across 5 categories
              {lastFetched && ` · refreshed ${timeAgo(lastFetched)}`}
            </p>
          )}
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors hover:text-white disabled:opacity-40"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--muted-foreground)' }}
        >
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Rows */}
      {CATEGORIES.map(cat => (
        <FeedRow
          key={cat.id}
          cat={cat}
          items={data?.[cat.id] ?? []}
          loading={loading}
        />
      ))}

      {/* Bonus tip */}
      <div
        className="mx-auto max-w-4xl px-6 sm:px-8 mt-4"
      >
        <div
          className="rounded-2xl border p-5"
          style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
        >
          <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>Bonus swap — </span>
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Replace any feed with{' '}
            <a
              href="https://tldr.tech/ai/rss"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              TLDR AI
            </a>{' '}
            for a compressed daily digest — breadth over depth.
          </span>
        </div>
      </div>
    </section>
  );
}
