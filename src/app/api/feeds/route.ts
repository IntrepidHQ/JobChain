import { NextResponse } from 'next/server';

export const revalidate = 900; // cache 15 min

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category: string;
  image?: string;
}

const FEEDS = [
  { name: 'Remotive',          category: 'jobs',     url: 'https://remotive.com/remote-jobs/rss-feed' },
  { name: 'We Work Remotely',  category: 'jobs',     url: 'https://weworkremotely.com/remote-job-rss-feed' },
  { name: 'YC Jobs',           category: 'jobs',     url: 'https://rss.app/feeds/63w7SzfSyKUxs0pA.xml' },
  { name: 'OpenAI',            category: 'ai',       url: 'https://rss.app/feeds/teG8Gwq5iXvnKgUX.xml' },
  { name: 'Hugging Face',      category: 'ai',       url: 'https://rss.app/feeds/sNDGziuHXqqKTrSM.xml' },
  { name: 'Import AI',         category: 'ai',       url: 'https://jack-clark.net/feed/' },
  { name: 'Smashing Magazine', category: 'design',   url: 'https://www.smashingmagazine.com/feed/' },
  { name: 'TechCrunch',        category: 'startups', url: 'https://techcrunch.com/feed/' },
  { name: 'Product Hunt',      category: 'startups', url: 'https://www.producthunt.com/feed' },
  { name: 'WSJ Markets',       category: 'markets',  url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },
];

function decode(str: string): string {
  const cdata = str.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  const raw = cdata ? cdata[1] : str;
  return raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#\d+;/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function getTag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}(?:[^>]*)>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return m ? decode(m[1]) : '';
}

function getAttr(xml: string, tagName: string, attrName: string): string {
  const m = xml.match(new RegExp(`<${tagName}[^>]*\\s${attrName}="([^"]*)"`, 'i'));
  return m ? m[1] : '';
}

function getLink(xml: string): string {
  const rss = xml.match(/<link>\s*([^\s<]+)\s*<\/link>/i);
  if (rss) return rss[1].trim();
  const atom = xml.match(/<link[^>]+href="([^"]+)"/i);
  if (atom) return atom[1];
  return '';
}

function getImage(xml: string): string | undefined {
  return (
    getAttr(xml, 'media:content', 'url') ||
    getAttr(xml, 'media:thumbnail', 'url') ||
    getAttr(xml, 'enclosure', 'url') ||
    undefined
  );
}

async function parseFeed(feed: typeof FEEDS[0]): Promise<FeedItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JobChainReader/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items: FeedItem[] = [];
    // Handle both RSS <item> and Atom <entry>
    for (const re of [/<item>([\s\S]*?)<\/item>/g, /<entry>([\s\S]*?)<\/entry>/g]) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(xml)) !== null && items.length < 10) {
        const x = m[1];
        const title = getTag(x, 'title');
        const link = getLink(x);
        if (!title || !link) continue;

        const description = (getTag(x, 'description') || getTag(x, 'summary') || getTag(x, 'content')).slice(0, 240);
        const pubDate = getTag(x, 'pubDate') || getTag(x, 'published') || getTag(x, 'updated');

        items.push({ id: link, title, link, description, pubDate, source: feed.name, category: feed.category, image: getImage(x) });
      }
      if (items.length >= 10) break;
    }

    return items;
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.allSettled(FEEDS.map(parseFeed));

  const out: Record<string, FeedItem[]> = { jobs: [], ai: [], design: [], startups: [], markets: [] };

  for (const r of results) {
    if (r.status !== 'fulfilled') continue;
    for (const item of r.value) {
      out[item.category]?.push(item);
    }
  }

  for (const cat of Object.keys(out)) {
    out[cat].sort((a, b) => (+new Date(b.pubDate || 0)) - (+new Date(a.pubDate || 0)));
  }

  return NextResponse.json(out, {
    headers: { 'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800' },
  });
}
